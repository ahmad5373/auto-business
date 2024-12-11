const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  // Ensure only one Privacy Policy document exists
  privacyPolicySchema.index({}, { unique: true });
  
  module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
  