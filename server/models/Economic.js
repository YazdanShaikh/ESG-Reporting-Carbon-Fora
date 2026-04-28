const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImpactSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Negative', 'Positive'], required: true },
  actualPotential: { type: String, enum: ['Actual', 'Potential'], required: true },
  stakeholders: [{ type: String }],
  stakeholderConcern: { type: Schema.Types.Mixed },
  scores: { type: Schema.Types.Mixed }
}, { _id: false });

const TopicSummarySchema = new Schema({
  topicCode: String,
  topic: String,
  isCompleted: { type: Boolean, default: false },
  selectedImpacts: [ImpactSchema]
}, { _id: false });

const SectionItemSchema = new Schema({
  topic: String,
  code: String,
  keywords: String,
  selected: { type: Boolean, default: false }
}, { _id: false });

const SectionSchema = new Schema({
  section: String,
  items: [SectionItemSchema]
}, { _id: false });

const EconomicSchema = new Schema({
  brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true, index: true },
  activeTopicCode: { type: String, required: true },
  sections: [SectionSchema],
  topics: [TopicSummarySchema],
  selectedImpacts: [ImpactSchema],
  thresholds: {
    impactScore: { type: Number, default: 15 },
    stakeholderConcern: { type: Number, default: 4.0 }
  },
  totalSelected: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Economic', EconomicSchema);
