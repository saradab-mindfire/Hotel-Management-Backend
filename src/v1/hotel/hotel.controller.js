const { addNewHotel, getHotelByClause, getHotelById, getHotelsByClause, updateHotelByClause, updateHotelById } = require('./hotel.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { HotelSchemaValidation } = require('./hotel.schema');
const { updateHotelAssociatedWith } = require('./../hotel-user/hotel-user.service')

const createHotel = async( req, res ) => {
    try {
        let hotelObj = req.body;
        const { error } = HotelSchemaValidation.validate( hotelObj );
        if( error ) {
            return errorResponse( res, error.message, 422 );
        }

        hotelObj['createdBy'] = req.hotelUserObj._id;
        const hotelData = await addNewHotel( hotelObj );
        if( !hotelData ) {
            return errorResponse( res, "Failed To Create Hotel !" );
        }
        
        const updatedUser = updateHotelAssociatedWith( req.hotelUserObj._id, hotelData._id );
        if( !updatedUser ) {
            return errorResponse( res, "Failed To Assign Hotel !" );
        }

        return successResponse( res, "Hotel Created Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const updateHotel = async( req, res ) => {
    try {
        let hotelId = req.params.hotelId;
        let hotelObj = req.body;
        const { error } = HotelSchemaValidation.validate( hotelObj );
        if( error ) {
            return errorResponse( res, "Unprocessable Entities !", 422 );
        }

        const hotelData = await updateHotelById( hotelId, hotelObj );
        if( !hotelData ) {
            return errorResponse( res, "Failed To Update Hotel !" );
        }

        return successResponse( res, "Hotel Updated Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const updateHotelStatus = async( req, res ) => {
    try {
        const hotelId = req.params.hotelId;
        const status = req.body.status;
        const updated = await updateHotelById( hotelId, { isActive: status } );
        if( !updated ) {
            return errorResponse( res, "Failed To Update Hotel Status !" );
        }

        return successResponse( res, "Hotel Status Updated Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const getHotelDetails = async( req, res ) => {
    try {
        const hotelId = req.params.hotelId;
        const hotelDetails = await getHotelById( hotelId );
        if( !hotelDetails ) {
            return errorResponse( res, "Failed To Get Hotel Details !" );
        }

        return successResponse( res, "Fetched Successfully !", { ...hotelDetails.toObject() } );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    createHotel,
    updateHotel,
    updateHotelStatus,
    getHotelDetails
}