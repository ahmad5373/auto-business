const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    dealership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealershipUser',
        required: true,
        index: true
    }
}, { timestamps: true });

const Follow = mongoose.model('Follow', FollowSchema);
module.exports = Follow;
