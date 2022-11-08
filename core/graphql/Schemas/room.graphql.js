const { GraphQLObjectType } = require("graphql");
const { verifyHotelAuth } = require("../../helpers/jwtHelperGraphQL");
const Room = require("../Types/room-type.types");
const { addNewRoomService, getRoomDetailsService, parseRoomDetails, updateRoomDetailsService, updateRoomPriceService, updateRoomStatusService } = require('./../../../src/v1/room/room.service');

const RoomType = new GraphQLObjectType( Room );

const createRoom = async( args, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const { hotelId, displayName, description, roomType, defaultPrice, createdBy } = args;
        const roomData = { hotelId, displayName, description, roomType, defaultPrice, createdBy };
        const roomAdded = await addNewRoomService( roomData, hotelUserObj._id );
        const roomDetails = await getRoomDetailsService( roomAdded._id );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateRoom = async( args, roomId, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const { hotelId, displayName, description, roomType, defaultPrice, createdBy } = args;
        const roomData = { hotelId, displayName, description, roomType, defaultPrice, createdBy };
        const roomUpdated = await updateRoomDetailsService( roomData, roomId );
        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateRoomStatus = async( roomId, status, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const roomUpdated = await updateRoomStatusService( roomId, status );
        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateRoomPrice = async( roomId, args ) => {
    try {
        const { currentPrice, date } = args;
        const inventoryObj = { currentPrice, date };
        const roomPriceUpdated = await updateRoomPriceService( roomId, inventoryObj );
        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const roomDetails = async( roomId, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const roomDetails = await getRoomDetailsService( roomId );
        return parseRoomDetails( roomDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

module.exports = {
    RoomType,
    createRoom,
    updateRoom,
    updateRoomStatus,
    updateRoomPrice,
    roomDetails
}