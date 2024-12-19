const express = require('express');
const { protected } = require('../middleware/authenticate');
const { requestValidation, createCarValidation } = require('../validations');
const { createCar, getAllCars, deleteCar, getCarWithId, getCarListingWithUserId, updateCarStatus, getSavedAdsWithUserId, getSearchedCars, getUserSoldCars } = require('../controllers/carsController');

const router = express.Router();

router.post('/create-car', protected, createCarValidation, requestValidation, createCar);
router.get('/get-cars', protected,  getAllCars);
router.get('/:id', protected,  getCarWithId);
router.get('/user-listing/:userId', protected,  getCarListingWithUserId);
router.get('/saved-ads/:userId', protected,  getSavedAdsWithUserId);
router.get('/sold-cars/:userId', protected,  getUserSoldCars);
router.get('/', protected,  getSearchedCars);
router.put('/:id', protected, updateCarStatus);
router.delete('/:id', protected,  deleteCar);

module.exports = router;
