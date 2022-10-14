const { updateHotelUserById } = require('./hotel-user.dao');

const updateHotelAssociatedWith = ( hotelUserId, hotelId ) => {
    return updateHotelUserById( hotelUserId, { associatedWith: hotelId } );
}

module.exports = {
    updateHotelAssociatedWith
}