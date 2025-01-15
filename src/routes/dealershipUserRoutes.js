const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, editUser, getUserWithId, forgotPassword, resetPassword, updatePassword, createDealershipUser, verifyOTP, getLoggedInUser } = require('../controllers/dealershipUserController');
const { protected } = require('../middleware/authenticate');
const { createUserValidation, requestValidation, loginValidation, registerDealershipValidation, createDealerShipValidation, forgetPasswordValidation, resetPasswordValidation, changePasswordValidation, verifyOTPValidation } = require('../validations');

const router = express.Router();

router.post('/register', registerDealershipValidation, requestValidation,  registerUser);
router.post('/create-dealership', createDealerShipValidation, requestValidation, createDealershipUser);
router.post('/login', loginValidation, requestValidation, loginUser);
router.get('/get-dealership', protected,  getAllUsers);
router.get('/loggedUser', protected,  getLoggedInUser);
router.get('/:id', protected,  getUserWithId);
router.put('/:id', protected,  editUser);
router.delete('/:id', protected,  deleteUser);
router.post("/forgot-password", forgetPasswordValidation, requestValidation, forgotPassword);
router.post("/verify-otp", verifyOTPValidation, requestValidation, verifyOTP);
router.post("/reset-password",  resetPasswordValidation, requestValidation, resetPassword);
router.post("/change-password", protected, changePasswordValidation, requestValidation, updatePassword);

module.exports = router;
