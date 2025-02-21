const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

// ✅ Simple compliance rules
const complianceRules = [
    { policy: "Privacy Act Compliance", keywords: ["privacy", "data", "protection"] },
    { policy: "Security Regulation", keywords: ["security", "breach", "hack"] },
    { policy: "Healthcare Compliance", keywords: ["health", "medical", "patient"] },
    { policy: "Financial Compliance", keywords: ["money", "fraud", "finance"] },
];

// ✅ Function to analyze compliance query
function analyzeQuery(query) {
    const tokens = tokenizer.tokenize(query.toLowerCase());
    let matchedPolicies = [];

    complianceRules.forEach(rule => {
        if (tokens.some(token => rule.keywords.includes(token))) {
            matchedPolicies.push(rule.policy);
        }
    });

    return { matchedPolicies: matchedPolicies.length ? matchedPolicies : ["General Compliance Guidelines"] };
}

module.exports = { analyzeQuery };
