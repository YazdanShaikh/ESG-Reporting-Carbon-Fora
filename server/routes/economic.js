const express = require('express');
const router = express.Router();
const Economic = require('../models/Economic');
const Joi = require('joi');

// Validation schemas
const sectionItemSchema = Joi.object({
  topic: Joi.string().required(),
  code: Joi.string().required(),
  keywords: Joi.string().allow(''),
  selected: Joi.boolean().required()
});

const sectionSchema = Joi.object({
  section: Joi.string().required(),
  items: Joi.array().items(sectionItemSchema).required()
});

const impactSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('Negative', 'Positive').required(),
  actualPotential: Joi.string().valid('Actual', 'Potential').required(),
  stakeholders: Joi.array().items(Joi.string()).min(1).required(),
  stakeholderConcern: Joi.alternatives().try(Joi.number().min(1).max(5), Joi.object()).required(),
  scores: Joi.object().required()
});

const postSchema = Joi.object({
  activeTopicCode: Joi.string().required(),
  sections: Joi.array().items(sectionSchema).optional(),
  totalSelected: Joi.number().integer().min(0).optional(),
  selectedImpacts: Joi.array().items(impactSchema).optional(),
  thresholds: Joi.object({
    impactScore: Joi.number().min(1).max(25).optional(),
    stakeholderConcern: Joi.number().min(1).max(5).optional()
  }).optional(),
  isCompleted: Joi.boolean().optional(),
  topic: Joi.string().optional()
});

// Middleware: simple brand auth stub (replace with real auth in production)
async function brandAuth(req, res, next) {
  // Assume req.user.brandId is set by auth middleware upstream
  if (!req.user || !req.user.brandId) return res.status(401).json({ success: false, message: 'Unauthorized' });
  req.brandId = req.user.brandId;
  next();
}

// GET - fetch or create default
router.get('/', brandAuth, async (req, res) => {
  try {
    let doc = await Economic.findOne({ brandId: req.brandId });
    if (!doc) {
      // create empty default
      doc = await Economic.create({ brandId: req.brandId, activeTopicCode: 'GRI_SETUP', sections: [], thresholds: { impactScore: 15, stakeholderConcern: 4.0 } });
    }
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST - create or update
router.post('/', brandAuth, async (req, res) => {
  try {
    const { error, value } = postSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    // Upsert by brand
    const update = {};

    if (value.sections) update.sections = value.sections;
    if (typeof value.totalSelected !== 'undefined') update.totalSelected = value.totalSelected;
    if (value.selectedImpacts) update.selectedImpacts = value.selectedImpacts;
    if (value.thresholds) update.thresholds = { ...value.thresholds };
    if (typeof value.isCompleted !== 'undefined') update.isCompleted = value.isCompleted;
    if (value.activeTopicCode) update.activeTopicCode = value.activeTopicCode;
    if (value.topic) {
      // Append/update topic summary
      update.$set = update.$set || {};
      update.$set['topics'] = (await Economic.findOne({ brandId: req.brandId }))?.topics || [];
      const existingIndex = update.$set['topics'].findIndex(t => t.topicCode === value.activeTopicCode);
      if (existingIndex >= 0) {
        update.$set['topics'][existingIndex] = { topicCode: value.activeTopicCode, topic: value.topic, isCompleted: !!value.isCompleted, selectedImpacts: value.selectedImpacts || [] };
      } else {
        update.$set['topics'].push({ topicCode: value.activeTopicCode, topic: value.topic, isCompleted: !!value.isCompleted, selectedImpacts: value.selectedImpacts || [] });
      }
    }

    // If selectedImpacts provided and activeTopicCode specified, also mirror into topics[]
    if (value.selectedImpacts && value.activeTopicCode) {
      const existing = (await Economic.findOne({ brandId: req.brandId })) || null;
      const topicsArr = existing?.topics || [];
      const idx = topicsArr.findIndex(t => t.topicCode === value.activeTopicCode);
      if (idx >= 0) {
        topicsArr[idx].selectedImpacts = value.selectedImpacts;
        topicsArr[idx].isCompleted = !!value.isCompleted;
      } else {
        topicsArr.push({ topicCode: value.activeTopicCode, topic: value.topic || value.activeTopicCode, isCompleted: !!value.isCompleted, selectedImpacts: value.selectedImpacts });
      }
      update.topics = topicsArr;
    }

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const doc = await Economic.findOneAndUpdate({ brandId: req.brandId }, update, options);

    res.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
