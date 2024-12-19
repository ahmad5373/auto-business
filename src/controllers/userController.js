const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');
const sendMail = require('../middleware/SendMail');
dotenv.config();

const hashPassword = async (password) => bcrypt.hash(password, 10);
const findUserByEmail = async (email) => User.findOne({ email });

const registerUser = async (req, res) => {
    const { email, password, repeatedPassword } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return sendResponse(res, 400, "User already exists");
        }
        if (password !== repeatedPassword) {
            return sendResponse(res, 400, 'Password and repeated password do not match.');
        }
        const hashedPassword = await hashPassword(password);
        await User.create({ email, password: hashedPassword });
        return sendResponse(res, 201, "User Registered with Us Successfully",);
    } catch (error) {
        return sendResponse(res, 500, `Error creating user: ${error.message}`);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return sendResponse(res, 401, "Invalid credentials");
        }
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '30d' });
        const response = {
            user: user,
            access_token: token
        }
        return sendResponse(res, 200, "Login Successful", [], response);
    } catch (error) {
        return sendResponse(res, 500, `Error during login: ${error?.message}`);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ email: { $ne: req.user.email } })
        return sendResponse(res, 200, "Users fetched successfully", [], users);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching users: ${error.message}`);
    }
};

const getUserWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
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
    const { name, email, phone, profileImage, gender, address, city, fcm } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, phone, profileImage, gender, address, city, fcm }, { new: true, runValidators: true });
        if (!updatedUser) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User updated successfully", [], updatedUser);
    } catch (error) {
        return sendResponse(res, 500, `Error updating user: ${error.message}`);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        await User.deleteOne({ _id: id });
        return sendResponse(res, 200, "User deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting user: ${error.message}`);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const userData = await findUserByEmail(req.body.email);
        if (!userData) {
            return sendResponse(res, 404, 'User Not Found');
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

        await sendMail(userData.email, subject, html);
        return sendResponse(res, 200, "Password Reset Request sent successfully");
    } catch (error) {
        console.error("Error while processing forgot password request:", error.message);
        return sendResponse(res, 500, `${error.message}`);
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        const userData = await User.findOne({ otp: token, });
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
        userData.password = hashedPassword;
        userData.otp = null;
        userData.resetPasswordExpire = null;

        await userData.save();
        return sendResponse(res, 400, 'Password reset successfully.');
    } catch (error) {
        console.error("Error while resetting password:", error.message);
        return sendResponse(res, 500, error.message);

    }
};

const updatePassword = async (req, res) => {
    try {
        const { id, currentPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(id);
        if (!user || !await bcrypt.compare(currentPassword, user.password)) {
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

const sendContactForm = async (req, res) => {
    const { contactEmail, carDetails, firstName, lastName, userEmail, message } = req.body;
    const subject = `Inquiry About the ${carDetails.make || 'N/A'} ${carDetails.model || 'N/A'} Listing`;
    const html = `
    <!DOCTYPE html>
   <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        h2 {
            color: #0000FF;
        }
        h3 {
            color: #0000FF;
        }
        .details {
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .carPrice {
            width: 100%;
        }
        .carPrice td {
            padding: 5px;
            text-align: left;
        }
        .carPrice .makeModel {
            font-weight: bold;
        }
        p {
            margin: 5px 0;
        }
        </style>
    </head>
    <body>
        <p><strong>Name:</strong> ${`${firstName} ${lastName}`}</p>
        <p><strong>Email:</strong> ${userEmail}</p>

        <h3>Car Details:</h3>
        <div class="details">
            <table class="carPrice" cellspacing="0" cellpadding="5">
                <tr>
                    <td class="makeModel">${carDetails.make || 'N/A'} ${carDetails.model || 'N/A'}</td>
                    <td><strong>Price:</strong> ${carDetails.price || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>First Registration:</strong> ${carDetails.firstRegistration || 'N/A'}</td>
                    <td><strong>Condition:</strong> ${carDetails.condition || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Mileage:</strong> ${carDetails.mileage || 'N/A'}</td>
                    <td><strong>Transmission:</strong> ${carDetails.transmission || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Fuel Type:</strong> ${carDetails.fuelType || 'N/A'}</td>
                    <td><strong>Fuel Consumption:</strong> ${carDetails.fuelConsumption || 'N/A'}</td>
                </tr>
            </table>
        </div>

        <h3>Message:</h3>
        <p>${message}</p>
        </body>
        </html>
            `;

    try {
        await sendMail(contactEmail, subject, html, userEmail);
        res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error while sending contact form email:", error.message);
        res.status(500).json({ error: "Failed to send contact form" });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserWithId,
    editUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    updatePassword,
    sendContactForm
};
