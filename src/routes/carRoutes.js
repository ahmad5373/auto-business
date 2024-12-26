const express = require('express');
const { protected } = require('../middleware/authenticate');
const { requestValidation, createCarValidation } = require('../validations');
const { createCar, getAllCars, deleteCar, getCarWithId, getCarListingWithUserId, updateCarStatus, getSavedAdsWithUserId, getSearchedCars, getUserSoldCars, getMyListing, getUserTotalListing, getMySoldCars, getMyActiveListing } = require('../controllers/carsController');

const router = express.Router();

router.post('/create-car', protected, createCarValidation, requestValidation, createCar);
router.get('/get-cars', protected,  getAllCars);
router.get('/my-listing', protected, getMyListing);
router.get('/sold-cars', protected, getMySoldCars);
router.get('/active-listing', protected, getMyActiveListing);
router.get('/user/total-listing/:userId', protected, getUserTotalListing);
router.get('/:id', protected,  getCarWithId);
router.get('/saved-ads/:userId', protected,  getSavedAdsWithUserId);
router.get('/sold-cars/:userId', protected,  getUserSoldCars);
router.get('/', protected,  getSearchedCars);444
router.put('/:id', protected, updateCarStatus);
router.delete('/:id', protected,  deleteCar);

module.exports = router;
