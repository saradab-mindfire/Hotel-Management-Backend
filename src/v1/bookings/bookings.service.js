const { getBookingByClause } = require('./bookings.dao');
const { getHotelById } = require('./../hotel/hotel.dao');
const { getRoomTypeById } = require('./../room-type/room-types.dao');
const { getRoomDetailsById } = require('./../room/room.dao');

const getAvailability = async( bookingData ) => {
    try {
        const { hotelId, roomId, bookingDate } = bookingData;
        
        const booking = await getBookingByClause( { hotelId, roomId, bookingDate } );
        if( !booking ) {
            return true;
        }

        return false;
    }
    catch( err ) {
        throw err;
    }
}

const getHotelRoomDetails = async( bookingData ) => {
    try {
        const { hotelId, roomId, roomTypeId } = bookingData;
        
        const response = await Promise.all( [
            getHotelById( hotelId ),
            getRoomTypeById( roomTypeId ),
            getRoomDetailsById( roomId )
        ] );

        return {
            hotelDetails: response[0],
            roomTypeDetails: response[1],
            roomDetails: response[2]
        };
        
    }
    catch( err ) {
        throw err;
    }
}

module.exports = {
    getAvailability,
    getHotelRoomDetails
}