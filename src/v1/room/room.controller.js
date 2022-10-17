const { createRoom, disableRoom, getAllRooms, getRoomDetailsByClause, getRoomDetailsById, updateRoom, updateRoomById } = require('./room.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createInventory, updateInventory } = require('./../room-inventory/room-inventory.dao');
const { RoomSchemaValidation } = require('./room.schema');
const moment = require('moment');

const addNewRoom = async( req, res ) => {
    try {
        const roomObj = req.body;
        const { error } =RoomSchemaValidation.validate( roomObj );
        if( error ) {
            return errorResponse( res, error.message );
        }

        roomObj['createdBy'] = req.hotelUserObj._id;
        const roomAdded = await createRoom( roomObj );
        if( !roomAdded ) {
            return errorResponse( res, "Failed to add rooms !" );
        }

        const inventoryObj = {
            roomId: roomAdded._id,
            currentPrice: roomObj.defaultPrice,
            date: moment().format('YYYY-MM-DD')
        };
        const inventoryAdded = await createInventory( inventoryObj );
        
        return successResponse( res, "Room Added Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const updateRoomDetails = async( req, res ) => {
    try {
        const roomObj = req.body;
        const roomId = req.params.id;
        const { error } =RoomSchemaValidation.validate( roomObj );
        if( error ) {
            return errorResponse( res, error.message );
        }

        const roomUpdated = await updateRoomById( roomId, roomObj );
        if( !roomUpdated ) {
            return errorResponse( res, "Failed to update rooms !" );
        }

        return successResponse( res, "Room Updated Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const updateRoomStatus = async( req, res ) => {
    try {
        const { isActive } = req.body;
        const roomId = req.params.id;

        const roomUpdated = await updateRoomById( roomId, { isActive } );
        if( !roomUpdated ) {
            return errorResponse( res, "Failed to update rooms !" );
        }

        return successResponse( res, "Room Update Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const getRoomDetails = async( req, res ) => {
    try {
        const roomId = req.params.id;

        const roomDetails = await getRoomDetailsById( roomId );
        if( !roomDetails ) {
            return errorResponse( res, "Failed to get rooms details !" );
        }

        return successResponse( res, "Room Details Fetched Successfully !", { ...roomDetails.toObject() } );
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

const updateRoomPrice = async( req, res ) => {
    try {
        const roomId = req.params.id;
        const { currentPrice, date } = req.body;

        const inventoryObj = {
            roomId: roomId,
            currentPrice: currentPrice,
            date: date
        };
        const inventoryClauses = {
            roomId: roomId,
            date: date
        }
        const inventoryAdded = await updateInventory( inventoryClauses, inventoryObj );
        if( !inventoryAdded ) {
            return errorResponse( res, "Failed to update room price !" );
        }

        return successResponse( res, "Room Price Updated Successfully !" );
    }
    catch( err ) {
        return errorResponse( res, err.message )
    }
}

module.exports = {
    addNewRoom,
    updateRoomDetails,
    updateRoomStatus,
    getRoomDetails,
    updateRoomPrice
}