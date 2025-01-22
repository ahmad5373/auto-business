const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, editUser, getUserWithId, forgotPassword, resetPassword, updatePassword, sendContactForm, checkOTP, getLoggedInUser, checkForRegisterUser, googleAuth } = require('../controllers/userController');
const { protected } = require('../middleware/authenticate');
const { createUserValidation, requestValidation, loginValidation, forgetPasswordValidation, verifyOTPValidation, resetPasswordValidation, changePasswordValidation, ContactEmailValidation } = require('../validations');

const router = express.Router();

router.post('/check-user',checkForRegisterUser);
router.post('/register', createUserValidation, requestValidation, registerUser);
router.post('/login', loginValidation, requestValidation, loginUser);
router.post('/social/login',  googleAuth);
router.get('/get-users', protected,  getAllUsers);
router.get('/loggedInUser', protected,  getLoggedInUser);
router.get('/:id', protected,  getUserWithId);
router.put('/:id', protected,  editUser);
router.delete('/:id', protected,  deleteUser);
router.post("/forgot-password", forgetPasswordValidation, requestValidation,  forgotPassword);
router.post("/verify-otp", verifyOTPValidation, requestValidation, checkOTP);
router.post("/reset-password", resetPasswordValidation, requestValidation,  resetPassword);
router.post("/change-password",  protected,  changePasswordValidation, requestValidation, updatePassword);
router.post("/contact-email", ContactEmailValidation, requestValidation,  sendContactForm);


module.exports = router;
