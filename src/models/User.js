const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
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
    },
    profileImage: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
    fcm: {
        type: String,
    },
    otp: {
        type: String,
    },
    resetPasswordExpire: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
