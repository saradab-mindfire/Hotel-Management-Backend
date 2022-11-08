const { addNewHotel, getHotelByClause, getHotelById, getHotelsByClause, updateHotelByClause, updateHotelById } = require('./hotel.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { HotelSchemaValidation } = require('./hotel.schema');
const { updateHotelAssociatedWithService } = require('./../hotel-user/hotel-user.service')

const createHotelService = async( hotelObj, createdBy ) => {
    try {
        const { error } = HotelSchemaValidation.validate( hotelObj );
        if( error ) {
            throw new Error( error.message );
        }

        hotelObj['createdBy'] = createdBy;
        const hotelData = await addNewHotel( hotelObj );
        if( !hotelData ) {
            throw new Error( "Failed To Create Hotel !" );
        }
        
        const updatedUser = updateHotelAssociatedWithService( createdBy, hotelData._id );
        if( !updatedUser ) {
            throw new Error( "Failed To Assign Hotel !" );
        }

        const hotelDetails = await getHotelById( hotelData._id );

        return parseHotelDetails( hotelDetails )
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateHotelService = async( hotelId, hotelObj ) => {
    try {
        const hotelData = await updateHotelById( hotelId, hotelObj );
        if( !hotelData ) {
            throw new Error( "Failed To Update Hotel !" );
        }

        const hotelDetails = await getHotelById( hotelId );

        return parseHotelDetails( hotelDetails )
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateHotelStatusService = async( hotelId, status ) => {
    try {
        const updated = await updateHotelById( hotelId, { isActive: status } );
        if( !updated ) {
            throw new Error( "Failed To Update Hotel Status !" );
        }

        const hotelDetails = await getHotelById( hotelId );
        return parseHotelDetails( hotelDetails )
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const getHotelDetailsService = async( hotelId ) => {
    try {
        const hotelDetails = await getHotelById( hotelId );
        if( !hotelDetails ) {
            throw new Error( "Failed To Get Hotel Details !" );
        }

        return hotelDetails;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const parseHotelDetails = ( hotelDetails ) => {
    try {
        const { createdBy, ...details } = hotelDetails.toObject();
        details['createdBy'] = createdBy['_id'];
        details['createdByDetails'] = createdBy;
        return details;
    }
    catch( err ) {
        throw new Error( err.message );        
    }  
}

module.exports = {
    createHotelService,
    updateHotelService,
    updateHotelStatusService,
    getHotelDetailsService,
    parseHotelDetails
}