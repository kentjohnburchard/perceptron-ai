const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
    policy: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model("Compliance", ComplianceSchema);
