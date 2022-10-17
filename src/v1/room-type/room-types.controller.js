const { addNewRoomType, getRoomTypeByClause, getRoomTypeById, getRoomTypesByClause, updateRoomTypeByClause, updateRoomTypeById } = require('./room-types.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { RoomTypeSchemaValidation } = require('./room-types.schema');

const addRoomType = async( req, res ) => {
    try {
        const roomTypeObj = req.body;
        const { error } = RoomTypeSchemaValidation.validate( roomTypeObj );
        if( error ) {
            return errorResponse( res, error.message )
        }

        roomTypeObj['createdBy'] = req.hotelUserObj._id;
        const roomTypeAdded = await addNewRoomType( roomTypeObj );
        if( !roomTypeAdded ) {
            return errorResponse( res, "Failed to add Room Type !" )
        }

        return successResponse( res, "Room Type Added Successfully !" )
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const updateRoomType = async( req, res ) => {
    try {
        const roomTypeObj = req.body;
        const roomTypeId = req.params.id;

        if( !roomTypeId ) {
            return errorResponse( res, "Room Type Id is required !" )
        }

        const { error } = RoomTypeSchemaValidation.validate( roomTypeObj )
        if( error ) {
            return errorResponse( res, error.message );
        }

        const roomTypeUpdated = await updateRoomTypeById( roomTypeId, roomTypeObj );
        if( !roomTypeUpdated ) {
            return errorResponse( res, "Failed to add Room Type !" )
        }

        return successResponse( res, "Room Type Updated Successfully !" )
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const updateRoomTypeStatus = async( req, res ) => {
    try {
        const { isActive } = req.body;
        const roomTypeId = req.params.id;
    
        if( !roomTypeId ) {
            return errorResponse( res, "Room Type Id is required !" )
        }
        
        const roomTypeUpdated = await updateRoomTypeById( roomTypeId, { isActive } );
        if( !roomTypeUpdated ) {
            return errorResponse( res, "Failed to update room type status !" )
        }
    
        return successResponse( res, "Room Type Status Updated Successfully !" )
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const getRoomTypeDetailsById = async( req, res ) => {
    try {
        const roomTypeId = req.params.id;
        if( !roomTypeId ) {
            return errorResponse( res, "Room Type Id is required !" );
        }

        const roomTypeDetails = await getRoomTypeById( roomTypeId );
        if( !roomTypeDetails ) {
            return errorResponse( res, "Failed to get room type details !" );
        }
    
        return successResponse( res, "Fetched Successfully !", { ...roomTypeDetails.toObject() } )
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

module.exports = {
    addRoomType,
    updateRoomType,
    updateRoomTypeStatus,
    getRoomTypeDetailsById
}