const PrivacyPolicy = require('../models/PrivacyPolicy');
const TermsConditions = require('../models/Terms&Conditions');

const updateTermsAndConditions = async (req, res) => {
  const { content } = req.body; 
  try {
    const terms = await TermsConditions.findOneAndUpdate(
      {}, 
      { content, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePrivacyPolicy = async (req, res) => {
  const { content } = req.body; 
  try {
    const policy = await PrivacyPolicy.findOneAndUpdate(
      {},
      { content, updatedAt: Date.now() }, 
      { upsert: true, new: true }
    );
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    updateTermsAndConditions,
    updatePrivacyPolicy,
};
