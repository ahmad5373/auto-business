const mongoose = require('mongoose');

const DealershipUserSchema = new mongoose.Schema({
    dealerName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    street2Address: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    otp: {
        type: String,
    },
    resetPasswordExpire: {
        type: String,
    },
    description: {
        type: String,
    },

}, { timestamps: true });

const DealershipUser = mongoose.model('DealershipUser', DealershipUserSchema);

module.exports = DealershipUser;
