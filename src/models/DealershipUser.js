const mongoose = require('mongoose');


const PhoneSchema = new mongoose.Schema({
    country: { type: String, },
    prefix: { type: String, },
    phoneNumber: { type: String, },
}, { _id: false });

const AddressSchema = new mongoose.Schema({
    streetAddress: { type: String },
    street2Address: { type: String },
    zipCode: { type: Number },
    city: { type: String },
    country: { type: String },
}, { _id: false });

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
            phone: [PhoneSchema],
            address: AddressSchema,
        },
        supportContact: {
            contactName: { type: String },
            formOfAddress: { type: String },
            firstName: { type: String },
            lastName: { type: String },
            phone: [PhoneSchema],
            address: AddressSchema,
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
