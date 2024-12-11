const Car = require('../models/Car');
const User = require('../models/User')
const { sendResponse } = require('../utility/api');


const createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        const savedCar = await car.save();
        return sendResponse(res, 201, "Car Created Successfully",[], savedCar);
    } catch (error) {
        return sendResponse(res, 500, `Error creating Car: ${error.message}`);
    }
};


const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find()
        return sendResponse(res, 200, "Cars fetched successfully", [], cars);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Cars: ${error.message}`);
    }
};

const getCarWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id)
        if (!car) {
            return sendResponse(res, 404, "Car not found");
        }
        return sendResponse(res, 200, "Car details fetched successfully", [], car);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Car: ${error.message}`);
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);
        if (!car) {
            return sendResponse(res, 404, "Car not found");
        }
        await Car.deleteOne({ _id: id });
        return sendResponse(res, 200, "Car deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, `Error deleting Car: ${error.message}`);
    }
};



module.exports = {
    createCar,
    getAllCars,
    getCarWithId,
    deleteCar,
};
