const Car = require('../models/Car');
const DealershipUser = require('../models/DealershipUser');
const Follow = require('../models/Follow');
const { sendResponse } = require('../utility/api');

const FollowSeller = async (req, res) => {
    try {
        const { userId: user, dealershipId: dealership } = req.body;
        const dealerships = await DealershipUser.findById(dealership);
        if (!dealerships) return sendResponse(res, 404, "Seller not found",)
        const follow = await Follow.findOneAndUpdate(
            { user, dealership },
            {},
            { upsert: true, new: true }
        );
        return sendResponse(res, 200, "Followed dealership successfully", [], follow);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching following: ${error.message}`);
    }
};

const UnfollowSeller = async (req, res) => {
    try {
        const user = res.user?._id;
        const { dealership } = req.params;
        if (!user || !dealership) {
            return sendResponse(res, 400, "User ID and dealership ID are required");
        }
        const followRecord = await Follow.findOne({ user, dealership });
        if (!followRecord) {
            return sendResponse(res, 404, "Follow relationship not found");
        }
        await Follow.findOneAndDelete({ user, dealership });
        return sendResponse(res, 200, "Unfollowed dealership successfully");
    } catch (error) {
        console.error("Error in UnfollowSeller:", error);
        return sendResponse(res, 500, `Internal server error: ${error.message}`);
    }
};

const getFollowingList = async (req, res) => {
    try {
        const { userId } = req.params;
        const following = await Follow.find({ user: userId })
            .populate('dealership', 'dealershipInformation');

        return sendResponse(res, 200, "Fetch followed dealership successfully", [], following);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching following: ${error.message}`);
    }
};

const SellerDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const follow = await Follow.findById(id)
        if (!follow) {
            return sendResponse(res, 404, "can't find follow details",)
        }
        const dealershipId = follow.dealership
        const dealership = await DealershipUser.findById(dealershipId)
        if (!dealership) {
            return sendResponse(res, 404, "Dealership not found",)
        }
        const listings = await Car.find({ user_id: dealershipId });
        const dealerShipDetails = {
            dealership: dealership,
            listingDetails: listings
        }
        return sendResponse(res, 200, "Fetch following dealership successfully", [], dealerShipDetails);
    } catch (error) {
        return sendResponse(res, 500, `Error fetching dealership details: ${error.message}`);
    }
};

const getFollowerCount = async (req, res) => {
    try {
        const { dealershipId } = req.params;
        const followerCount = await Follow.countDocuments({ dealership: dealershipId })
        if (!followerCount) {
            return res.status(404).json({ message: 'No Follow by any one' });
        }
        return sendResponse(res, 200, "Total Follower count is", [], { followerCount: followerCount });
    } catch (error) {
        return sendResponse(res, 500, `Error fetching dealership details: ${error.message}`);
    }
};

const checkFollowStatus = async (req, res) => {
    try {
        const { userId, dealershipId } = req.query;
        const isFollowing = await Follow.findOne({ user: userId, dealership: dealershipId })
        return sendResponse(res, 200, "Follow Status", [], {isFollowing: isFollowing ? true : false});
    } catch (error) {
        console.log("error =>", error);
        return sendResponse(res, 500, `Error Checking follow: ${error.message}`)
    }
}

module.exports = {
    FollowSeller,
    UnfollowSeller,
    getFollowingList,
    SellerDetails,
    getFollowerCount,
    checkFollowStatus,
};
