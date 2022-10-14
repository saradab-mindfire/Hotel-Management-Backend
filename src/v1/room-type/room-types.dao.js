const RoomType = require('./room-types.model');

const addNewRoomType = ( roomTypeObj ) => {
    return RoomType.create( roomTypeObj );
}

const updateRoomTypeById = ( roomTypeId, roomTypeObj ) => {
    return RoomType.findByIdAndUpdate( roomTypeId, roomTypeObj );
}

const updateRoomTypeByClause = ( roomTypeClauses, roomTypeObj ) => {
    return RoomType.findOneAndUpdate( roomTypeClauses, roomTypeObj );
}

const getRoomTypesByClause = ( roomTypeClauses ) => {
    return RoomType.find( roomTypeClauses );
}

const getRoomTypeById = ( roomTypeId ) => {
    return RoomType.findById( roomTypeId );
}

const getRoomTypeByClause = ( roomTypeClauses ) => {
    return RoomType.findOne( roomTypeClauses );
}

module.exports = {
    addNewRoomType,
    updateRoomTypeById,
    updateRoomTypeByClause,
    getRoomTypesByClause,
    getRoomTypeById,
    getRoomTypeByClause
};