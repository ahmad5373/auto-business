const DealershipUser = require('../DealershipUser');
const User = require('../User');

const getUserById = async (id) => {
   return await User.findById({_id: id});
}

const getDealerShipUserById = async (id) =>{
    return await DealershipUser.findById({_id: id})
}
module.exports = {
    getUserById,
    getDealerShipUserById
}