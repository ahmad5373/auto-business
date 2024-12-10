const User = require('../User');

const getUserById = async (id) => {
   return await User.findById({_id: id});
}


module.exports = {
    getUserById,
}