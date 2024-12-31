const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  sold: { type: Boolean, default: false },
  saveAds: {
    save: { type: Boolean, default: false },
    user_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    }]
  },
  basicData: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String },
    firstRegistration: { type: Date },
    mileage: { type: Number, required: true },
    previousOwners: { type: Number },
    fuelType: { type: String, },
    power: { type: String },
    transmission: { type: String },
    paymentType: { type: String }, 
    roadworthy: { type: Boolean },
    availabilty: { type: String },
    country: {type:String},
    city: {type: String}

  },
  paymentDetails: {
    price: { type: Number },
    monthlyPayment: { type: String },
  },
  technicalData: {
    type: { type: String },
    vehicleNumber: { type: String },
    category: { type: String },
    cubicCapacity: { type: String },
    fuelConsumption: { type: String },
    emissionSticker: { type: String, },
    emissionClass: { type: String, },
    huAtLeast: { type: Boolean },
    condition: { type: String },
    seats: { type: Number },
    doors: { type: Number },
    airConditioning: { type: String, },
    parkingSensors: [String]
    
  },
  exterior: {
    exteriorColor: { type: String },
    trailerCoupling: { type: String },
    parkingSensors: [String],
    cruiseControl: { type: String },
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
    gender: { type: String },
    phone: {
      countryCode: { type: String },
      number: { type: String },
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
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
