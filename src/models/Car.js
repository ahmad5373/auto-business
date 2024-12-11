const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  basicData: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String },
    vehicleType: { type: String },
    mileage: { type: Number, required: true },
    huAtLeast: { type: Boolean },
    roadworthy: { type: Boolean },
    firstRegistration: { type: String },
    previousOwners: { type: Number },
    condition: { type: String},
    type: { type: String },
    availabilty: { type: String }
  },
  paymentDetails: {
    price: { type: Number },
    paymentType: { type: String},
    monthlyPayment: { type: String },
  },
  technicalData: {
    fuelType: { type: String,},
    power: { type: Number },
    cubicCapacity: { type: Number },
    transmission: { type: String },
    fuelConsumption: { type: Number },
    emissionSticker: { type: String, },
    emissionClass: { type: String,},
    category: { type: String },
    vehicleNumber: { type: String },
    seats: { type: Number },
    doors: { type: Number },
  },
  exterior: {
    exteriorColor: { type: String },
    trailerCoupling: { type: String },
    parkingSenser: [String],
    cruiseControl: { type: String},
    otherFeatures: [String]
  },
  interior: {
    interiorColor: { type: String },
    internalMaterial: { type: String },
    airbags: [String],
    airConditioning: { type: String, },
    otherFeatures: [String]
  },

  sellerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String},
    phone: {
      countryCode: { type: String },
      number: { type: String},
    },
    address: {
      street: { type: String },
      city: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    isPrivateSeller: { type: Boolean, },
  },
  imagesAndDescription: {
    description: { type: String, required: true },
    images: [{ type: String }],
  },
  additionalInfo: {
    registrationDate: { type: String },
    distanceWarningSystem: { type: Boolean },
    headUpDisplay: { type: Boolean },
    hillStartAssist: { type: Boolean },
    leaseDetails: {
      duration: { type: String },
      totalAmount: { type: Number },
    },
  },
});

module.exports = mongoose.model('Car', carSchema);
