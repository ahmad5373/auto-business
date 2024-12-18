const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, editUser, getUserWithId, forgotPassword, resetPassword, updatePassword } = require('../controllers/dealershipUserController');
const { protected } = require('../middleware/authenticate');
const { createUserValidation, requestValidation, loginValidation } = require('../validations');

const router = express.Router();

router.post('/register',  registerUser);
router.post('/login', loginValidation, requestValidation, loginUser);
router.get('/get-dealership', protected,  getAllUsers);
router.get('/:id', protected,  getUserWithId);
router.put('/:id', protected,  editUser);
router.delete('/:id', protected,  deleteUser);
router.post("/forgot-password" ,  forgotPassword);
router.post("/reset-password" , resetPassword);
router.post("/change-password" , updatePassword);

module.exports = router;
