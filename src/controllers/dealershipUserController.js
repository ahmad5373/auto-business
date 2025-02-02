const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');
const sendMail = require('../middleware/SendMail');
const DealershipUser = require('../models/DealershipUser');
const { createJwtToken } = require('./userController');
dotenv.config();

const hashPassword = async (password) => bcrypt.hash(password, 10);
const findUserByEmail = async (email) => { return await DealershipUser.findOne({ 'dealershipInformation.email': email }); };

const createDealershipUser = async (req, res) => {
    const { password, email } = req.body.dealershipInformation;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return sendResponse(res, 400, "Dealership already exists with this email try other");
        }
        const hashedPassword = await hashPassword(password);
        const dealershipUser = new DealershipUser({
            ...req.body,
            dealershipInformation: {
                ...req.body.dealershipInformation,
                profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5CbO3X-jDiHZFELGr4fUPbvNnf4UYY_NbA&s',
                password: hashedPassword
            }
        });
        await dealershipUser.save();
        return sendResponse(res, 201, "Dealership Registered Successfully", [], dealershipUser);
    } catch (error) {
        return sendResponse(res, 500, `Error creating Dealership: ${error.message}`);
    }
};

const registerUser = async (req, res) => {
    const { email, password, repeatedPassword } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return sendResponse(res, 400, "Dealership already exists with this email try other");
        }
        if (password !== repeatedPassword) {
            return sendResponse(res, 400, 'Password and repeated password do not match.');
        }
        return sendResponse(res, 200, "Dealership is okay to proceed next");
    } catch (error) {
        return sendResponse(res, 500, `Error creating Dealership: ${error.message}`);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return sendResponse(res, 401, `Dealership not found with ${email} please create new account first`);
        }
        if (!await bcrypt.compare(password, user?.dealershipInformation.password)) {
            return sendResponse(res, 401, "Invalid credentials");
        }
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
        const response = {
            ...user.toObject(),
            access_token: createJwtToken(user?._id, user?.role)
        }
        return sendResponse(res, 200, "Login Successful", [], {user: response});
    } catch (error) {
        return sendResponse(res, 500, `Error during login: ${error?.message}`);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await DealershipUser.find()
        return sendResponse(res, 200, "Users fetched successfully", [], users);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching users: ${error.message}`);
    }
};

const getUserWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await DealershipUser.findById(id)
        if (!user) {
            return sendResponse(res, 404, "Dealership not found");
        }
        return sendResponse(res, 200, "Dealership details fetched successfully", [], user);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching DealershipUser: ${error.message}`);
    }
};

const getLoggedInUser = async (req, res) => {
    console.log("res.user =>", res.user);
    const userId = res.user?._id
    console.log("userId =>", userId);
    try {
        const user = await DealershipUser.findById(userId)
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User details fetched successfully", [], user);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching user: ${error.message}`);
    }
};

const editUser = async (req, res) => {
    const { id } = req.params;
    const { dealerName, email, phone, profileImage, streetAddress, street2Address, zipCode, city, country, description } = req.body;
    try {
        const updatedUser = await DealershipUser.findByIdAndUpdate(id, { dealerName, email, phone, streetAddress, street2Address, zipCode, profileImage, city, country, description }, { new: true, runValidators: true });
        if (!updatedUser) {
            return sendResponse(res, 404, "Dealership not found");
        }
        return sendResponse(res, 200, "Dealership updated successfully", [], updatedUser);
    } catch (error) {
        return sendResponse(res, 500, `Error updating dealer user: ${error.message}`);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await DealershipUser.findById(id);
        if (!user) {
            return sendResponse(res, 404, "Dealership not found");
        }
        await DealershipUser.deleteOne({ _id: id });
        return sendResponse(res, 200, "Dealership deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting user: ${error.message}`);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const userData = await findUserByEmail(req.body.email);
        if (!userData) {
            return sendResponse(res, 404, 'Dealership Not Found');
        }

        const resetToken = Math.floor(1000 + Math.random() * 9000);
        userData.otp = resetToken;
        userData.resetPasswordExpire = Date.now() + 3600000 // Token Expire in One hour 
        await userData.save();

        const html = `<!DOCTYPE html>
    <html>
    <body>
    <center><img src="http://3.16.10.119/assets/admin/img/logo.png" height="100"></center>
    <center><h1 style="color:#0000FF">Forget Password Otp Code</h1></center>
    <br>
    <center><h2>${userData.otp}</h2></center>
    </body>
    </html>`;

        //Compose email 
        const subject = "Password Reset Request otp";

        await sendMail(userData?.dealershipInformation?.email, subject, html);
        return sendResponse(res, 200, "Password Reset Request sent successfully");
    } catch (error) {
        console.error("Error while processing forgot password request:", error.message);
        return sendResponse(res, 500, `${error.message}`);
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { token } = req.body;
        const userData = await DealershipUser.findOne({ otp: token, });
        if (!userData) {
            return sendResponse(res, 400, 'Incorrect OTP.');
        }
        const resetPasswordExpire = userData.resetPasswordExpire;
        const currentTime = new Date();
        const expireTime = new Date(parseInt(resetPasswordExpire));
        if (expireTime < currentTime) {
            return sendResponse(res, 400, 'Expired token.');

        }
        return sendResponse(res, 200, 'OTP Is Correct.');
    } catch (error) {
        console.error("Error while Checking OTP:", error.message);
        return sendResponse(res, 500, error.message);

    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        const userData = await DealershipUser.findOne({ otp: token, });
        if (!userData) {
            return sendResponse(res, 400, 'Invalid token.');
        }
        const resetPasswordExpire = userData.resetPasswordExpire;
        const currentTime = new Date();
        const expireTime = new Date(parseInt(resetPasswordExpire));
        if (expireTime < currentTime) {
            return sendResponse(res, 400, 'Expired token.');

        }
        if (newPassword !== confirmPassword) {
            return sendResponse(res, 400, 'New password and confirm password do not match.');
        }
        const hashedPassword = await hashPassword(newPassword);
        userData.dealershipInformation.password = hashedPassword;
        userData.otp = null;
        userData.resetPasswordExpire = null;

        await userData.save();
        return sendResponse(res, 200, 'Password reset successfully.');
    } catch (error) {
        console.error("Error while resetting password:", error.message);
        return sendResponse(res, 500, error.message);

    }
};

const updatePassword = async (req, res) => {
    try {
        const userId = res.user?._id
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const user = await DealershipUser.findById(userId);
        if (!user || !await bcrypt.compare(currentPassword, user.dealershipInformation.password)) {
            return sendResponse(res, 401, "Current password is not correct");
        }

        if (newPassword !== confirmPassword) {
            return sendResponse(res, 400, 'New password and confirm password do not match.');
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        return sendResponse(res, 400, 'Password Change successfully.');
    } catch (error) {
        console.error("Error while Changing password:", error.message);
        return sendResponse(res, 500, error.message);

    }
};


module.exports = {
    registerUser,
    createDealershipUser,
    loginUser,
    getAllUsers,
    getUserWithId,
    getLoggedInUser,
    editUser,
    deleteUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
    updatePassword
};
