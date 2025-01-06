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
  body('sellerDetails.name').not().isEmpty().withMessage("Seller name is required"),
  body('sellerDetails.email').not().isEmpty().isEmail().withMessage("Seller Valid email is required"),
  body('imagesAndDescription.description').not().isEmpty().withMessage("description is required"),
]

module.exports = {
  requestValidation,
  createUserValidation,
  loginValidation,
  createMessageValidation,
  subscribeNewsletterValidation,
  createBlogValidation,
  createCarValidation
};
