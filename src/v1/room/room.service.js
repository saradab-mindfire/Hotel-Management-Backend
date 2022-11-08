const { createRoom, disableRoom, getAllRooms, getRoomDetailsByClause, getRoomDetailsById, updateRoom, updateRoomById } = require('./room.dao');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createInventory, updateInventory } = require('./../room-inventory/room-inventory.dao');
const { RoomSchemaValidation } = require('./room.schema');
const moment = require('moment');

const addNewRoomService = async( roomObj, hotelUserId ) => {
    try {
        const { error } = RoomSchemaValidation.validate( roomObj );
        if( error ) {
            throw new Error( error.message );
        }

        roomObj['createdBy'] = hotelUserId;
        const roomAdded = await createRoom( roomObj );
        if( !roomAdded ) {
            throw new Error( "Failed to add rooms !" );
        }

        const inventoryObj = {
            roomId: roomAdded._id,
            currentPrice: roomObj.defaultPrice,
            date: moment().format('YYYY-MM-DD')
        };
        const inventoryAdded = await createInventory( inventoryObj );
        
        const roomDetails = await getRoomDetailsService( roomAdded._id );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const updateRoomDetailsService = async( roomObj, roomId ) => {
    try {
        const roomUpdated = await updateRoomById( roomId, roomObj );
        if( !roomUpdated ) {
            throw new Error( "Failed to update rooms !" );
        }

        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const updateRoomStatusService = async( roomId, isActive ) => {
    try {
        const roomUpdated = await updateRoomById( roomId, { isActive } );
        if( !roomUpdated ) {
            throw new Error( "Failed to update rooms !" );
        }

        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const getRoomDetailsService = async( roomId ) => {
    try {
        const roomDetails = await getRoomDetailsById( roomId );
        if( !roomDetails ) {
            throw new Error( "Failed to get rooms details !" );
        }

        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const updateRoomPriceService = async( roomId, args ) => {
    try {
        const { currentPrice, date } = args;

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
            throw new Error( "Failed to update room price !" );
        }

        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const parseRoomDetails = ( roomDetails ) => {
    try {
        const { hotelId, roomType, createdBy, ...roomData } = roomDetails;
        roomData['hotelDetails'] = hotelId;
        roomData['roomTypeDetails'] = roomType;
        roomData['createdByDetails'] = createdBy;
        roomData['hotelId'] = hotelId._id;
        roomData['roomType'] = roomType._id;
        roomData['createdBy'] = createdBy._id;
        return roomData;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

module.exports = {
    addNewRoomService,
    updateRoomDetailsService,
    updateRoomStatusService,
    getRoomDetailsService,
    updateRoomPriceService,
    parseRoomDetails
}