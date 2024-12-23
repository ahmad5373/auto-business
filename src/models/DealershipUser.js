const mongoose = require('mongoose');

const DealershipUserSchema = new mongoose.Schema(
    {
        dealershipInformation: {
            dealerName: { type: String },
            email: {
                type: String,
                unique: true,
                lowercase: true,
                trim: true,
            },
            profileImage: { type: String },
            password: { type: String },
            streetAddress: { type: String },
            street2Address: { type: String },
            zipCode: { type: Number },
            city: { type: String },
            country: { type: String },
        },
        contactInformation: {
         phoneNumber: [String],
        },
        billingAddress: {
            billingAddress: { type: String, },
            VATID: { type: String },
            modeOfPayment: { type: String },
            accountHolder: { type: String },
            IBAN: { type: String },
            BIC: { type: String },
        },
        imprintData: { type: String },
        description: { type: String, },
        otp: { type: String, },
        resetPasswordExpire: { type: String, },
        role: { type: String, default: 'dealershipUser', },
    },
    { timestamps: true }
);

const DealershipUser = mongoose.model('DealershipUser', DealershipUserSchema);

module.exports = DealershipUser;
