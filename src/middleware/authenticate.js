const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const { sendResponse } = require('../utility/api');

dotenv.config();

const protected = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized Please Login" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded?.user;
        next();
    } catch (error) {
        return sendResponse(res, 401, 'Unauthorized user');
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return sendResponse(res, 403, "Access denied you don't have permission");
        }
        next();
    };
};

module.exports = { protected, authorizeRoles };
