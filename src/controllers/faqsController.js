const Faqs = require("../models/Faqs");
const { sendResponse } = require("../utility/api");

const createFaqs = async (req, res) => {
    const { question, answer } = req.body;
    try {
        await Faqs.create({ question, answer });
        return sendResponse(res, 201, "Question Created Successfully!");
    } catch (error) {
        return sendResponse(res, 500, `Error creating user: ${error.message}`);
    }
};


const getAllFaqs = async (req, res) => {
    try {
        const faqs = await Faqs.find()        
        return sendResponse(res, 200, "All Faqs fetched successfully", [], faqs);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching messages: ${error.message}`);
    }
};

const getFaqsWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const faqs = await Faqs.findById(id)
        if (!faqs) {
            return sendResponse(res, 404, "faqs not found");
        }
        return sendResponse(res, 200, "Faqs details fetched successfully", [], faqs);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Faqs: ${error.message}`);
    }
};

const editFaqs = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const updateFaqs = await Faqs.findByIdAndUpdate(id, { question , answer}, { new: true, runValidators: true });
        if (!updateFaqs) {
            return sendResponse(res, 404, "Faqs not found");
        }
        return sendResponse(res, 200, "Faqs updated successfully", [], updateFaqs);
    } catch (error) {
        return sendResponse(res, 500, `Error updating Faqs: ${error.message}`);
    }
};

const deleteFaqs = async (req, res) => {
    const { id } = req.params;
    try {
        const faqs = await Faqs.findById(id);
        if (!faqs) {
            return sendResponse(res, 404, "Faqs not found");
        }
        await Faqs.deleteOne({ _id: id });
        return sendResponse(res, 200, "Faqs deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting Faqs: ${error.message}`);
    }
};

module.exports = {
    createFaqs,
    getAllFaqs,
    getFaqsWithId,
    editFaqs,
    deleteFaqs,
};