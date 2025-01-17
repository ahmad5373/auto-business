const { body, validationResult } = require('express-validator');
const { sendResponse } = require('../utility/api');

const requestValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedResults = [];
  errors.array().forEach(err => extractedResults.push({ [err.path]: err.msg }));

  return sendResponse(res, 422, 'Invalid request data', extractedResults, []);
}

// SAMPLE_CODE
// body('email')
// .not().isEmpty().withMessage('Email is required').bail()
// .isEmail().withMessage('Provide a valid email')
// .toLowerCase()
// .trim(),
// body('password')
//     .not().isEmpty().withMessage('Password is required').bail()
//     .isString().withMessage('Password must be of type String').bail()
//     .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters')
//     .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain atleast one lowercase, uppercase, number and special characters'),

const createUserValidation = [
  body('name').not().isEmpty().withMessage("name is required"),
  body('email').not().isEmpty().isEmail().withMessage("Valid Email is required"),
  body('password')
    .not().isEmpty().withMessage('Password is required').bail()
    .isString().withMessage('Password must be of type String').bail(),
  body('gender').not().isEmpty().withMessage("gender is required"),
  body('address').not().isEmpty().withMessage("address is required"),
  body('phone').not().isEmpty().withMessage("phone Number is required"),
  body('profileImage').not().isEmpty().withMessage("profileImage is required"),
]
const registerDealershipValidation = [
  body('email').not().isEmpty().isEmail().withMessage("Valid Email is required"),
  body('password')
    .not().isEmpty().withMessage('Password is required').bail()
    .isString().withMessage('Password must be of type String').bail(),
]

const createDealerShipValidation = [
  body('dealershipInformation.dealerName').not().isEmpty().withMessage("name is required"),
  body('dealershipInformation.email').not().isEmpty().isEmail().withMessage("Valid Email is required"),
  body('dealershipInformation.password')
    .not().isEmpty().withMessage('Password is required').bail()
    .isString().withMessage('Password must be of type String').bail(),
  body('dealershipInformation.profileImage').not().isEmpty().withMessage("profileImage is required"),
  body('dealershipInformation.streetAddress').not().isEmpty().withMessage("address is required"),
  body('dealershipInformation.country').not().isEmpty().withMessage("country is required"),
  // body('phone').not().isEmpty().withMessage("phone Number is required"),
  body('description').not().isEmpty().withMessage("description is required"),
  body('contactInformation.phoneNumber').isArray().withMessage("phone Number must be an array")
  .not().isEmpty().withMessage("At least one phone Number is required")
]


const loginValidation = [
  body('email').not().isEmpty().isEmail().withMessage("Valid Email is required"),
  body('password').not().isEmpty().withMessage("password is required"),
]

const createMessageValidation = [
  body('name').not().isEmpty().withMessage("name is required"),
  body('email').not().isEmpty().isEmail().withMessage("Valid Email is required"),
  body('message').not().isEmpty().withMessage("Message is required"),

]

const subscribeNewsletterValidation = [
  body('email').not().isEmpty().isEmail().withMessage("Valid Email is required"),
]

const createBlogValidation = [
  body('title').not().isEmpty().withMessage("title is required"),
  body('description').not().isEmpty().withMessage("description is required"),
  body('imageUrl').not().isEmpty().withMessage("Post Image is required"),
]


const createCarValidation = [
  body('basicData.make').not().isEmpty().withMessage("Make is required"),
  body('basicData.model').not().isEmpty().withMessage("Model is required"),
  body('basicData.mileage').not().isEmpty().withMessage("Valid mileage is required"),
  body('basicData.firstRegistration').not().isEmpty().withMessage("firstRegistration is required"),
  body('basicData.fuelType').not().isEmpty().withMessage("fuelType is required"),
  body('basicData.power').not().isEmpty().withMessage("power is required"),
  body('basicData.transmission').not().isEmpty().withMessage("transmission is required"),
  body('basicData.paymentType').not().isEmpty().withMessage("paymentType is required"),
  body('basicData.availability').not().isEmpty().withMessage("availability is required"),
  body('basicData.country').not().isEmpty().withMessage("country is required"),
  body('basicData.city').not().isEmpty().withMessage("city is required"),
  body('paymentDetails.price').not().isEmpty().withMessage("price is required"),
  body('paymentDetails.monthlyPayment').not().isEmpty().withMessage("monthlyPayment is required"),
  body('technicalData.category').not().isEmpty().withMessage("category is required"),
  body('technicalData.fuelConsumption').not().isEmpty().withMessage("fuelConsumption is required"),
  body('technicalData.condition').not().isEmpty().withMessage("condition is required"),
  body('technicalData.seats').not().isEmpty().withMessage("total seats is required"),
  body('technicalData.doors').not().isEmpty().withMessage("total doors is required"),
  body('exterior.exteriorColor').not().isEmpty().withMessage("exteriorColor is required"),
  body('exterior.otherFeatures').isArray().withMessage("otherFeatures must be an array"),
  body('interior.interiorColor').not().isEmpty().withMessage("interiorColor is required"),
  body('interior.otherFeatures').isArray().withMessage("otherFeatures must be an array"),
  
  body('sellerDetails.name').not().isEmpty().withMessage("Seller name is required"),
  body('sellerDetails.email').not().isEmpty().isEmail().withMessage("Seller Valid email is required"),
  // body('sellerDetails.phone.countryCode').not().isEmpty().withMessage("Seller phone number country Code is required"),
  // body('sellerDetails.phone').not().isEmpty().withMessage("Seller phone number is required"),
  body('imagesAndDescription.description').not().isEmpty().withMessage("description is required"),
  body('imagesAndDescription.images').isArray().withMessage("Images must be an array")
  .not().isEmpty().withMessage("At least one image is required")
]


const forgetPasswordValidation = [
  body('email').not().isEmpty().withMessage("email is required")
  .isEmail().withMessage("you must have to provide a valid email address"),
]

const verifyOTPValidation = [
  body('token').not().isEmpty().withMessage("Please provide a valid token")
]

const resetPasswordValidation = [
  body('token').not().isEmpty().withMessage("token is required"),
  body('newPassword').not().isEmpty().withMessage("newPassword is required"),
  body('confirmPassword').not().isEmpty().withMessage("confirmPassword is required")
]

const changePasswordValidation = [
  body('currentPassword').not().isEmpty().withMessage("currentPassword is required"),
  body('newPassword').not().isEmpty().withMessage("newPassword is required"),
  body('confirmPassword').not().isEmpty().withMessage("confirmPassword is required")
]


const ContactEmailValidation = [
  body('contactEmail').not().isEmpty().withMessage("contactEmail is required")
  .isEmail().withMessage("please provide a valid email address"),
  body('userEmail').not().isEmpty().withMessage("userEmail is required")
  .isEmail().withMessage("please provide a valid email address"),
  body('firstName').not().isEmpty().withMessage("firstName is required"),
  body('lastName').not().isEmpty().withMessage("lastName is required"),
  body('message').not().isEmpty().withMessage("message is required"),
  body('carDetails.make').not().isEmpty().withMessage("Make is required"),
  body('carDetails.model').not().isEmpty().withMessage("Model is required"),
  body('carDetails.price').not().isEmpty().withMessage("price is required"),
  body('carDetails.firstRegistration').not().isEmpty().withMessage("firstRegistration is required"),
  body('carDetails.condition').not().isEmpty().withMessage("condition is required"),
  body('carDetails.mileage').not().isEmpty().withMessage("Valid mileage is required"),
  body('carDetails.transmission').not().isEmpty().withMessage("transmission is required"),
  body('carDetails.fuelType').not().isEmpty().withMessage("fuelType is required"),
  body('carDetails.fuelConsumption').not().isEmpty().withMessage("fuelConsumption is required"),
  // body('carDetails.power').not().isEmpty().withMessage("power is required"),
  // body('carDetails.paymentType').not().isEmpty().withMessage("paymentType is required"),
  // body('carDetails.availability').not().isEmpty().withMessage("availability is required"),
  // body('carDetails.country').not().isEmpty().withMessage("country is required"),
  // body('carDetails.city').not().isEmpty().withMessage("city is required"),
  // body('carDetails.monthlyPayment').not().isEmpty().withMessage("monthlyPayment is required"),
  // body('technicalData.category').not().isEmpty().withMessage("category is required"),
  // body('technicalData.seats').not().isEmpty().withMessage("total seats is required"),
  // body('technicalData.doors').not().isEmpty().withMessage("total doors is required"),
  // body('exterior.exteriorColor').not().isEmpty().withMessage("exteriorColor is required"),
  // body('exterior.otherFeatures').isArray().withMessage("otherFeatures must be an array"),
  // body('interior.interiorColor').not().isEmpty().withMessage("interiorColor is required"),
  // body('interior.otherFeatures').isArray().withMessage("otherFeatures must be an array"),
  
  // body('sellerDetails.name').not().isEmpty().withMessage("Seller name is required"),
  // body('sellerDetails.email').not().isEmpty().isEmail().withMessage("Seller Valid email is required"),
  // body('sellerDetails.phone.countryCode').not().isEmpty().withMessage("Seller phone number country Code is required"),
  // body('sellerDetails.phone.number').not().isEmpty().withMessage("Seller phone umber is required"),
  // body('imagesAndDescription.description').not().isEmpty().withMessage("description is required"),
  // body('imagesAndDescription.images').isArray().withMessage("Images must be an array")
  // .not().isEmpty().withMessage("At least one image is required")
]
module.exports = {
  requestValidation,
  createUserValidation,
  loginValidation,
  createMessageValidation,
  subscribeNewsletterValidation,
  createBlogValidation,
  createCarValidation,
  registerDealershipValidation,
  createDealerShipValidation,
  forgetPasswordValidation,
  verifyOTPValidation,
  resetPasswordValidation,
  changePasswordValidation,
  ContactEmailValidation
};
