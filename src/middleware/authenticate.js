const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sendResponse } = require('../utility/api');
const { getUserById, getDealerShipUserById } = require('../models/helpers');

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
            if (decodedToken.user_id === undefined){
                return sendResponse(res, 401, 'Invalid Token');
            }
        } catch (error) {
            console.log('Ye ha error ' + error)
            return sendResponse(res, 401, 'Invalid Token');
        }

        const user = decodedToken?.role === 'user' ? await getUserById(decodedToken.user_id) : await getDealerShipUserById(decodedToken?.user_id);
        // console.log('auth user ' + user);
        if (!user) {
            return sendResponse(res, 403, 'Please Login First');
        }
        res.user = user;
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
