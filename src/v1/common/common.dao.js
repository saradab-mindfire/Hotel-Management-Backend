const Hotel = require('./../hotel/hotel.model');
const RoomType = require('./../room-type/room-types.model');
const Room = require('./../room/room.model');

const getHotels = async( clause ) => {
    return Hotel.find( clause );
}

const getRoomTypes = async( clause ) => {
    return RoomType.find( clause );
}

const getRooms = async( clause ) => {
    return Room.find( clause );
}

module.exports = {
    getHotels,
    getRoomTypes,
    getRooms
}