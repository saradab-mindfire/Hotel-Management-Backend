const Room = require('./room.model');

const createRoom = async ( roomObj ) => {
    return Room.create( roomObj );
}

const updateRoom = async ( roomObj, roomClauses ) => {
    return Room.updateOne( roomClauses, roomObj );
}

const updateRoomById = async ( hotelUserId, roomObj ) => {
    return Room.findByIdAndUpdate( hotelUserId, roomObj );
}

const disableRoom = async ( roomClauses ) => {
    return Room.updateOne( roomClauses );
}

const getRoomDetailsById = async ( hotelUserId ) => {
    return Room.findById( hotelUserId ).populate('createdBy');
}

const getRoomDetailsByClause = async ( roomClauses ) => {
    return Room.findOne( roomClauses ).populate('createdBy');
}

const getAllRooms = async ( roomClauses ) => {
    return Room.find( roomClauses );
}

module.exports = {
    createRoom,
    updateRoom,
    disableRoom,
    getRoomDetailsById,
    getRoomDetailsByClause,
    getAllRooms,
    updateRoomById
}