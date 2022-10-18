const Bookings = require('./bookings.model');

const createBooking = async ( bookingObj ) => {
    return Bookings.create( bookingObj );
}

const getAllBookingCount = async ( clauses = undefined ) => {
    return Bookings.count( clauses );
}

const getBookingByClause = async ( clauses ) => {
    return Bookings.findOne( clauses );
}

const getBookingsByClause = async ( clauses ) => {
    return Bookings.find( clauses );
}

const getBookingById = async ( id ) => {
    return Bookings.findById( id );
}

const updateBookingById = async ( id, bookingObj ) => {
    return Bookings.findByIdAndUpdate( id, bookingObj );
}

module.exports = {
    createBooking,
    getAllBookingCount,
    getBookingByClause,
    getBookingsByClause,
    getBookingById,
    updateBookingById
}