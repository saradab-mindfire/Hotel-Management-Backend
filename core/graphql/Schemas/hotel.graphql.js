const { GraphQLObjectType } = require("graphql");
const { verifyHotelAuth } = require("../../helpers/jwtHelperGraphQL");
const HotelTypes = require("../Types/hotel.types");
const { createHotelService, getHotelDetailsService, updateHotelService, updateHotelStatusService, parseHotelDetails } = require('./../../../src/v1/hotel/hotel.service');

const HotelType = new GraphQLObjectType( HotelTypes );

const createHotel = async( args, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const { name, location, address, lat, lng, imageURL, checkInTime, checkOutTime } = args;
        const hotelData = { name, location, address, lat, lng, imageURL, checkInTime, checkOutTime };
        const hotelAdded = await createHotelService( hotelData, hotelUserObj._id );
        const hotelDetails = await getHotelDetailsService(hotelAdded._id);
        return parseHotelDetails( hotelDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateHotel = async( args, hotelId, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const hotelUpdated = await updateHotelService( hotelId, args );
        const hotelDetails = await getHotelDetailsService(hotelId);
        return parseHotelDetails( hotelDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const updateHotelStatus = async( hotelId, status, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const hotelStatusUpdated = await updateHotelStatusService( hotelId, status );
        const hotelDetails = await getHotelDetailsService(hotelId);
        return parseHotelDetails( hotelDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const getHotelUserDetails = async( hotelId, context ) => {
    try {
        const hotelUserObj = await verifyHotelAuth( context );
        const hotelDetails = await getHotelDetailsService( hotelId );
        return parseHotelDetails( hotelDetails );
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

module.exports = {
    HotelType,
    createHotel,
    updateHotel,
    updateHotelStatus,
    getHotelUserDetails
}