const { createBooking, getAllBookingCount, getBookingById, updateBookingById, getBookingsByClause, getBookingByClause } = require('./bookings.dao');
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

const cancelBooking = async( req, res ) => {
    try {
        const { bookingId } = req.params;
        
        const bookingDetails = await getBookingByClause( { _id: bookingId } );
        if( !bookingDetails ) {
            return errorResponse( res, "Failed to cancel booking !" );
        }
        
        let cancelledBy;   
        if( req.customerObj ) {
            cancelledBy = req.customerObj._id;
        }
        else if( req.adminObj ) {
            cancelledBy = req.adminObj._id;
        }
        else if( req.hotelUserObj ) {
            cancelledBy = req.hotelUserObj._id;
        }
        
        const cancelled = await updateBookingById( bookingId, { status: "cancelled", cancelledBy } );
        if( !cancelled ) {
            return errorResponse( res, "Failed to cancel booking !" );
        }

        return successResponse( res, "Booking Cancelled !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const getBookings = async( req, res ) => {
    try {
        let bookings;
        if( req.adminObj ) {
            bookings = await getBookingsByClause({});
        }
        else if( req.customerObj ) {
            const userId = req.customerObj._id;
            bookings = await getBookingsByClause({ user: userId });
        }
        else if( req.hotelUserObj ) {
            const associatedWith = req.hotelUserObj.associatedWith;
            bookings = await getBookingsByClause({ hotelId: associatedWith });
        }

        if( !bookings ) {
            return errorResponse( res, "Failed To Get Bookings !" );
        }

        return successResponse( res, "Bookings Fetched Successfully !", { ...bookings.toObject() } )

    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const getBookingDetails = async( req, res ) => {
    try {
        const { bookingId } = req.params;
        const bookingDetails = await getBookingByClause( { _id: bookingId } )
        if( !bookingDetails ) {
            return errorResponse( res, "Failed to get booking details !" );
        }

        return successResponse( res, "Bookings Fetched Successfully !", { ...bookingDetails.toObject() } )

    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    bookNow,
    checkAvailability,
    cancelBooking,
    getBookings,
    getBookingDetails
}