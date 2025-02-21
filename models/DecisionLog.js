const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
    query: { type: String, required: true }, // The user question/query
    decision: { type: String, required: true }, // Decision made by Clara AI
    riskLevel: { type: String, enum: ['low', 'moderate', 'high', 'critical'], required: true }, // Risk classification
    justification: { type: String, required: true }, // Justification for the decision
    overridden: { type: Boolean, default: false }, // Whether the decision was overridden
    overrideRequestedBy: { type: String, default: null }, // Who requested the override
    overrideApprovedBy: { type: String, default: null }, // Who approved the override
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected', 'Escalated'], // ✅ Now includes 'Pending'
        default: 'Pending' 
    },
    timestamp: { type: Date, default: Date.now } // Log timestamp
});

// ✅ Create and Export the Model
const DecisionLog = mongoose.model('DecisionLog', decisionSchema);
module.exports = DecisionLog;
