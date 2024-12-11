const express = require('express');
const { protected } = require('../middleware/authenticate');
const { requestValidation, createCarValidation } = require('../validations');
const { createCar, getAllCars, deleteCar, getCarWithId } = require('../controllers/carsController');

const router = express.Router();

router.post('/create-car', createCarValidation, requestValidation, createCar);
router.get('/get-cars', protected,  getAllCars);
router.get('/:id', protected,  getCarWithId);
router.delete('/:id', protected,  deleteCar);

module.exports = router;
