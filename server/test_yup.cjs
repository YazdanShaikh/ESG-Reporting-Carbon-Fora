const yup = require('yup');

// Re-defining schemas for testing (normally you'd export/import if structured)
const sectionItemSchema = yup.object({
    topic: yup.string().required(),
    code: yup.string().required(),
    keywords: yup.string().ensure(),
    selected: yup.boolean().required()
});

const sectionSchema = yup.object({
    section: yup.string().required(),
    items: yup.array().of(sectionItemSchema).required()
        .test('unique-code', 'Codes must be unique within a section', (items) => {
            if (!items) return true;
            const codes = items.map(i => i.code);
            return new Set(codes).size === codes.length;
        })
});

const impactSchema = yup.object({
    name: yup.string().required(),
    type: yup.string().oneOf(['Negative', 'Positive']).required(),
    actualPotential: yup.string().oneOf(['Actual', 'Potential']).required(),
    stakeholders: yup.array().of(yup.string()).min(1).required(),
    stakeholderConcern: yup.lazy(value => {
        if (typeof value === 'object' && value !== null) {
            return yup.object().test('values-1-5', 'Stakeholder concern values must be between 1 and 5', (obj) => {
                return Object.values(obj).every(v => typeof v === 'number' && v >= 1 && v <= 5);
            });
        }
        return yup.number().min(1).max(5);
    }).required(),
    scores: yup.object({
        scale: yup.number().integer().min(1).max(5).required(),
        scope: yup.number().integer().min(1).max(5).required(),
        irremediability: yup.number().integer().min(1).max(5).required(),
        severity: yup.number().integer().min(1).max(5).required(),
        finalImpactScore: yup.number().integer().min(1).max(25).required(),
        stakeholderConcern: yup.number().min(1).max(5).required()
    }).required()
});

const postSchema = yup.object({
    activeTopicCode: yup.string().required(),
    sections: yup.array().of(sectionSchema).optional(),
    totalSelected: yup.number().integer().min(0).optional(),
    selectedImpacts: yup.array().of(impactSchema).optional(),
    thresholds: yup.object({
        impactScore: yup.number().integer().min(1).max(25),
        stakeholderConcern: yup.number().min(1.0).max(5.0)
    }).optional(),
    isCompleted: yup.boolean().optional(),
    topic: yup.string().optional()
});

async function runTests() {
    console.log('--- Running Economic API Schema Tests ---');

    // Test 1: Valid GRI Setup Payload
    const setupPayload = {
        activeTopicCode: "GRI_SETUP",
        sections: [{
            section: "GRI 200 — Economic Topics",
            items: [{ topic: "Economic Performance", code: "GRI 201", keywords: "Financials", selected: true }]
        }],
        totalSelected: 1
    };
    try {
        await postSchema.validate(setupPayload);
        console.log('✅ Test 1: Valid GRI Setup passed');
    } catch (err) {
        console.error('❌ Test 1: Valid GRI Setup failed:', err.errors);
    }

    // Test 2: Duplicate codes in section
    const duplicatePayload = {
        activeTopicCode: "GRI_SETUP",
        sections: [{
            section: "GRI 200",
            items: [
                { topic: "A", code: "GRI 201", selected: true },
                { topic: "B", code: "GRI 201", selected: false }
            ]
        }]
    };
    try {
        await postSchema.validate(duplicatePayload);
        console.log('❌ Test 2: Duplicate codes should have failed');
    } catch (err) {
        console.log('✅ Test 2: Duplicate codes correctly failed:', err.errors);
    }

    // Test 3: Valid Topic Assessment Payload
    const assessmentPayload = {
        activeTopicCode: "GRI 305",
        topic: "Emissions",
        selectedImpacts: [{
            name: "Direct GHG emissions",
            type: "Negative",
            actualPotential: "Actual",
            stakeholders: ["Employees"],
            stakeholderConcern: { "Employees": 4 },
            scores: { scale: 5, scope: 4, irremediability: 4, severity: 5, finalImpactScore: 25, stakeholderConcern: 5 }
        }],
        thresholds: { impactScore: 15, stakeholderConcern: 4.0 },
        isCompleted: true
    };
    try {
        await postSchema.validate(assessmentPayload);
        console.log('✅ Test 3: Valid Topic Assessment passed');
    } catch (err) {
        console.error('❌ Test 3: Valid Topic Assessment failed:', err.errors);
    }

    // Test 4: Invalid scale score (> 5)
    const invalidScorePayload = {
        activeTopicCode: "GRI 305",
        selectedImpacts: [{
            name: "Test",
            type: "Negative",
            actualPotential: "Actual",
            stakeholders: ["A"],
            stakeholderConcern: 3,
            scores: { scale: 6, scope: 4, irremediability: 4, severity: 5, finalImpactScore: 25, stakeholderConcern: 5 }
        }]
    };
    try {
        await postSchema.validate(invalidScorePayload);
        console.log('❌ Test 4: Invalid score should have failed');
    } catch (err) {
        console.log('✅ Test 4: Invalid score correctly failed:', err.errors);
    }

    console.log('--- Tests Completed ---');
}

runTests();
