const express = require('express');
const { protected } = require('../middleware/authenticate');
const { requestValidation, createCarValidation } = require('../validations');
const { createCar, getAllCars, deleteCar, getCarWithId, getCarListingWithUserId, updateCarStatus, getSavedAdsWithUserId, getSearchedCars, getUserSoldCars, getMyListing, getUserTotalListing, getMySoldCars, getMyActiveListing, getUserMoreListing } = require('../controllers/carsController');

const router = express.Router();

router.post('/create-car', protected, createCarValidation, requestValidation, createCar);
router.get('/get-cars',   getAllCars);
router.get('/my-listing', protected, getMyListing);
router.get('/sold-cars', protected, getMySoldCars);
router.get('/active-listing', protected, getMyActiveListing);
router.get('/user/total-listing/:userId', protected, getUserTotalListing);
router.get('/user/more-listing', protected, getUserMoreListing);
router.get('/:id', protected,  getCarWithId);
router.get('/saved-ads/:userId', protected,  getSavedAdsWithUserId);
router.get('/sold-cars/:userId', protected,  getUserSoldCars);
router.get('/',   getSearchedCars);
router.put('/:id', protected, updateCarStatus);
router.delete('/:id', protected,  deleteCar);

module.exports = router;
