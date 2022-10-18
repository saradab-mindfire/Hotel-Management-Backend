const { createBooking, getAllBookingCount } = require('./bookings.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { notifyOnBooking } = require('./../notifications/notifications.service');
const { getAvailability, getHotelRoomDetails } = require('./bookings.service');
const { BookingSchemaValidation } = require('./bookings.schema');

const bookNow = async( req, res ) => {
    try {
        let bookingDetails = req.body;
        bookingDetails['user'] = req['customerObj']._id.toString();
        bookingDetails['bookingId'] = "HM_ORDER_" + await getAllBookingCount() + 1;

        const { error } = BookingSchemaValidation.validate( bookingDetails );
        if( error ) {
            return errorResponse( res, error.message );
        }

        const booked = await createBooking( bookingDetails );
        if( !booked ) {
            return errorResponse( res, "Failed to book room !" );
        }

        await notifyOnBooking( booked.toObject() );

        return successResponse( res, "Booking Successful", { ...booked.toObject() } );
        
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const checkAvailability = async( req, res ) => {
    try {
        const bookingData = req.body;
        
        const isRoomAvailable = await getAvailability( bookingData );
        if( !isRoomAvailable ) {
            return errorResponse( res, "Room Not Available !", 200 );
        }
        
        const hotelRoomDetails = await getHotelRoomDetails( bookingData );

        return successResponse( res, "Room Available !", { ...hotelRoomDetails } )
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    bookNow,
    checkAvailability
}