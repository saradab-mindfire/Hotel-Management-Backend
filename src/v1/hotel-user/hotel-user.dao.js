const HotelUser = require('./hotel-user.model');

const createHotelUser = async ( hotelUserObj ) => {
    return HotelUser.create( hotelUserObj );
}

const updateHotelUser = async ( hotelUserObj, hotelUserClauses ) => {
    return HotelUser.updateOne( hotelUserClauses, hotelUserObj );
}

const updateHotelUserById = async ( hotelUserId, hotelUserObj ) => {
    return HotelUser.findByIdAndUpdate( hotelUserId, hotelUserObj );
}

const disableHotelUser = async ( hotelUserClauses ) => {
    return HotelUser.updateOne( hotelUserClauses );
}

const getHotelUserDetailsById = async ( hotelUserId ) => {
    return HotelUser.findById( hotelUserId ).populate('userId');
}

const getHotelUserDetails = async ( hotelUserClauses ) => {
    return HotelUser.findOne( hotelUserClauses ).populate('userId');
}

const getHotelUsers = async ( hotelUserClauses ) => {
    return HotelUser.find( hotelUserClauses );
}

module.exports = {
    createHotelUser,
    updateHotelUser,
    disableHotelUser,
    getHotelUserDetailsById,
    getHotelUserDetails,
    getHotelUsers,
    updateHotelUserById
}