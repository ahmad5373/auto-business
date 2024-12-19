const express = require('express');
const { createFaqs, getAllFaqs, getFaqsWithId, editFaqs, deleteFaqs } = require('../controllers/faqsController');
const { protected } = require('../middleware/authenticate');

const router = express.Router();

router.post('/create-faqs',protected,  createFaqs);
router.get('/get-faqs',  getAllFaqs);
router.get('/:id', protected,   getFaqsWithId);
router.put('/:id', protected, editFaqs);
router.delete('/:id',protected, deleteFaqs);

module.exports = router;