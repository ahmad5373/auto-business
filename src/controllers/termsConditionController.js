const PrivacyPolicy = require('../models/PrivacyPolicy');
const TermsConditions = require('../models/Terms&Conditions');
const { sendResponse } = require('../utility/api');

const updateTermsAndConditions = async (req, res) => {
  const { content } = req.body; 
  try {
    const terms = await TermsConditions.findOneAndUpdate(
      {}, 
      { content, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    // res.status(200).json(terms);
    return sendResponse(res, 200, "updated Terms&Condition", [], terms);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    return sendResponse(res, 500, `Error fetching Terms&Conditions: ${error.message}`);
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
    // res.status(200).json(policy);
    return sendResponse(res, 200, "updated policy", [], policy);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    return sendResponse(res, 500, `Error fetching policy: ${error.message}`);

  }
};


module.exports = {
    updateTermsAndConditions,
    updatePrivacyPolicy,
};
