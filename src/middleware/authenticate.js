const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');
const { getUserById } = require('../models/helpers');

dotenv.config();


const protected = async (req, res, next) => {
    try {
        const bearerToken = req.headers?.authorization;
        if (!bearerToken) {
            return sendResponse(res, 401, 'Missing Authorization Details');
        }

        const token = bearerToken?.split(' ')[1];

        try {
            var decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
            console.log(decodedToken.user_id)
        } catch (error) {
            console.log('Ye ha error ' + error)
            return sendResponse(res, 401, 'Invalid Token');
        }

        const user = await getUserById(decodedToken?.user);
        console.log('auth user ' + user);
        if (!user || user === null) {
            return sendResponse(res, 403, 'Invalid User');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error ' + error);
        return sendResponse(res, 500, 'Somthing went wrong');
    }

}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return sendResponse(res, 403, "Access denied you don't have permission");
        }
        next();
    };
};

module.exports = { protected, authorizeRoles };
