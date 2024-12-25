const Car = require('../models/Car');
const { sendResponse } = require('../utility/api');


const createCar = async (req, res) => {
    console.log("req =>", req.user);
    try {
        if (req.user._id.toString() !== req.body.user_id) {
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
    console.log("req =>", req);

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

const getUserSoldCars = async (req, res) => {
    const { userId } = req.params;
    try {
        const SoldCars = await Car.find({ 'user_id': userId, 'sold': true })
        if (!SoldCars) {
            return sendResponse(res, 404, "sold car not found for this user");
        }
        return sendResponse(res, 200, "User sold cars fetched successfully", [], SoldCars);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching Sold Cars: ${error.message}`);
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
        country,
        city,
        paymentType,
        make,
        model,
        variant,
        priceMin,
        priceMax,
        mileageMin,
        mileageMax,
        powerMin,
        powerMax,
        fuelType,
        transmission,
        vehicleType,
        type,
        registrationMin,
        registrationMax,
        prevOwners,
        noOfSeats,
        noOfDoors,
        fuelConsumption,
        emissionSticker,
        emissionClass,
        exteriorColor,
        interiorColor,
        features,
        internalMaterial,
        airbags,
        airConditioning,
        trailerCoupling,
        parkingSensors,
        cruiseControl,
        page = 1,
        limit = 10,
    } = req.query;

    try {
        const query = {};

        // Dynamic query conditions
        if (make) query['basicData.make'] = { $regex: make, $options: 'i' }; // Case-insensitive search
        if (model) query['basicData.model'] = { $regex: model, $options: 'i' };
        if (variant) query['basicData.variant'] = { $regex: variant, $options: 'i' };
        if (condition) query['technicalData.condition'] = condition;
        if (country) query['basicData.country'] = { $regex: country, $options: 'i' };
        if (city) query['basicData.city'] = { $regex: city, $options: 'i' };
        if (paymentType) query['basicData.paymentType'] = paymentType;
        if (priceMin && priceMax) query['paymentDetails.price'] = { $gte: priceMin, $lte: priceMax };
        if (registrationMin && registrationMax) query['basicData.firstRegistration'] = { $gte: registrationMin, $lte: registrationMax };
        if (mileageMin && mileageMax) query['basicData.mileage'] = { $gte: mileageMin, $lte: mileageMax };
        if (powerMin && powerMax) query['basicData.power'] = { $gte: powerMin, $lte: powerMax };
        if (fuelType) query['basicData.fuelType'] = fuelType;
        if (transmission) query['basicData.transmission'] = transmission;
        if (vehicleType) query['technicalData.category'] = vehicleType;
        if (type) query['technicalData.type'] = type;
        if (prevOwners) query['basicData.previousOwners'] = prevOwners;
        if (noOfSeats) query['technicalData.seats'] = noOfSeats;
        if (noOfDoors) query['technicalData.doors'] = noOfDoors;
        if (fuelConsumption) query['technicalData.fuelConsumption'] = fuelConsumption;
        if (emissionSticker) query['technicalData.emissionSticker'] = emissionSticker;
        if (emissionClass) query['technicalData.emissionClass'] = emissionClass;
        if (exteriorColor) query['exterior.exteriorColor'] = exteriorColor;
        if (interiorColor) query['interior.interiorColor'] = interiorColor;
        if (features) query['interior.otherFeatures'] = features;
        // if (features) query['exterior.otherFeatures'] = features;
        if (internalMaterial) query['interior.internalMaterial'] = internalMaterial;
        if (airbags) query['interior.airbags'] = { $in: airbags.split(',') };
        if (airConditioning) query['interior.airConditioning'] = airConditioning;
        if (trailerCoupling) query['exterior.trailerCoupling'] = trailerCoupling;
        if (parkingSensors) query['exterior.parkingSensors'] = { $in: parkingSensors.split(',') };
        if (cruiseControl) query['exterior.cruiseControl'] = cruiseControl;

        const options = {
            skip: (page - 1) * limit,
            limit: +limit,
        };

        const searchResults = await Car.find(query, null, options);

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
    getUserSoldCars,
    updateCarStatus,
    getSearchedCars,
    deleteCar,
};
