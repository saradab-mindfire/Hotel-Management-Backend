const Hotel = require('./hotel.model');

const addNewHotel = ( hotelObj ) => {
    return Hotel.create( hotelObj );
}

const updateHotelById = ( hotelId, hotelObj ) => {
    return Hotel.findByIdAndUpdate( hotelId, hotelObj );
}

const updateHotelByClause = ( hotelClauses, hotelObj ) => {
    return Hotel.findOneAndUpdate( hotelClauses, hotelObj );
}

const getHotelsByClause = ( hotelClauses ) => {
    return Hotel.find( hotelClauses );
}

const getHotelById = ( id ) => {
    return Hotel.findById( id );
}

const getHotelByClause = ( clauses ) => {
    return Hotel.findOne( clauses );
}

module.exports = {
    addNewHotel,
    updateHotelById,
    updateHotelByClause,
    getHotelsByClause,
    getHotelById,
    getHotelByClause
};