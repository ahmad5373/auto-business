const express = require('express');
const { updateTermsAndConditions, updatePrivacyPolicy } = require('../controllers/termsConditionController');
const router = express.Router();

router.post('/terms-and-conditions', updateTermsAndConditions);
router.post('/privacy-policy', updatePrivacyPolicy);

module.exports = router;
