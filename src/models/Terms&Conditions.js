const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensure only one Terms & Conditions document exists
termsAndConditionsSchema.index({}, { unique: true });

module.exports = mongoose.model('TermsAndCondition', termsAndConditionsSchema);
