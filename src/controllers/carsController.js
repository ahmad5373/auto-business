const Car = require('../models/Car');
const { sendResponse } = require('../utility/api');


const createCar = async (req, res) => {
    try {
        if (req.user._id !== req.body.user_id) {
            return sendResponse(res, 403, "Please login your account you can't create another user car listing");
        }
        const car = new Car(req.body);
        const savedCar = await car.save();
        return sendResponse(res, 201, "Car Created Successfully", [], savedCar);
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

const getCarListingWithUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const userCars = await Car.find({ user_id: userId })
        if (!userCars) {
            return sendResponse(res, 404, "Car not found");
        }
        return sendResponse(res, 200, "Car details fetched successfully", [], userCars);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Car: ${error.message}`);
    }
};


const getSavedAdsWithUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const savedCarAds = await Car.find({ 'saveAds.user_id': userId, 'saveAds.save': true })
        if (!savedCarAds) {
            return sendResponse(res, 404, "Car Ads not found for this user");
        }
        return sendResponse(res, 200, "Car ads fetched successfully", [], savedCarAds);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Car ads: ${error.message}`);
    }
};

const updateCarStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedCar) {
            return sendResponse(res, 404, "Car not found");
        }
        return sendResponse(res, 200, "Car Status updated successfully", [], updatedCar);
    } catch (error) {
        return sendResponse(res, 500, `Error updating Car: ${error.message}`);
    }
};

const getSearchedCars = async (req, res) => {
    const {
        condition,
        location,
        paymentType,
        make,
        model,
        priceMin,
        priceMax,
        mileageMin,
        mileageMax,
        powerMin,
        powerMax,
        fuelType,
        registrationMin,
        registrationMax,
    } = req.query; 

    try {
        const query = {};

        // Dynamic query conditions
        if (make) query['basicData.make'] = { $regex: make, $options: 'i' }; // Case-insensitive search
        if (model) query['basicData.model'] = { $regex: model, $options: 'i' };
        if (condition) query['technicalData.condition'] = condition;
        if (location) query['basicData.country'] = location;
        if (paymentType) query['basicData.paymentType'] = paymentType;
        if (priceMin && priceMax) query['paymentDetails.price'] = { $gte: priceMin, $lte: priceMax };
        if (registrationMin && registrationMax) query['basicData.firstRegistration'] = { $gte: registrationMin, $lte: registrationMax };
        if (mileageMin && mileageMax) query['basicData.mileage'] = { $gte: mileageMin, $lte: mileageMax };
        if (powerMin && powerMax) query['basicData.power'] = { $gte: powerMin, $lte: powerMax };
        if (fuelType) query['basicData.fuelType'] = fuelType;

        console.log("Query =>", query);
        const searchResults = await Car.find(query);
        console.log("searchResults =>", searchResults);

        if (!searchResults.length) {
            return sendResponse(res, 404, "No cars found for this query");
        }
        return sendResponse(res, 200, "Cars fetched successfully", [], searchResults);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching cars: ${error.message}`);
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
    getCarListingWithUserId,
    getSavedAdsWithUserId,
    updateCarStatus,
    getSearchedCars,
    deleteCar,
};
