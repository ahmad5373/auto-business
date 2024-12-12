const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, editUser, getUserWithId, forgotPassword, resetPassword, updatePassword, sendContactForm } = require('../controllers/userController');
const { protected } = require('../middleware/authenticate');
const { createUserValidation, requestValidation, loginValidation } = require('../validations');

const router = express.Router();

router.post('/register', createUserValidation, requestValidation, registerUser);
router.post('/login', loginValidation, requestValidation, loginUser);
router.get('/get-users', protected,  getAllUsers);
router.get('/:id', protected,  getUserWithId);
router.put('/:id', protected,  editUser);
router.delete('/:id', protected,  deleteUser);
router.post("/forgot-password" ,  forgotPassword);
router.post("/reset-password" , resetPassword);
router.post("/change-password" , updatePassword);
router.post("/contact-email" , sendContactForm);


module.exports = router;
