const express = require('express');
const { protected } = require('../middleware/authenticate');
const { FollowSeller,  UnfollowSeller,   getFollowerCount, getFollowingList, SellerDetails, checkFollowStatus } = require('../controllers/FollowController');

const router = express.Router();

router.post('/dealership', protected, FollowSeller);
router.delete('/dealership/:dealership', protected, UnfollowSeller);
router.get('/following/:userId', protected, getFollowingList);
router.get('/details/:id', protected, SellerDetails);
router.get('/count/:dealershipId', protected, getFollowerCount);
router.get('/status', protected, checkFollowStatus);


module.exports = router;