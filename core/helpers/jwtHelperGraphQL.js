const { verifyJWT } = require('./authHelper');
const { getCustomerDetailsById } = require('./../../src/v1/customer/customer.dao');
const { getAdminUserDetailsById } = require('./../../src/v1/admin-user/admin-user.dao');
const { getHotelUserDetailsById } = require('./../../src/v1/hotel-user/hotel-user.dao');

const verifyCustomerAuth = async ( context ) => {
    let authToken = getHeaders( context );
    let customerObj = await verifyJWT( authToken );
    let latestCustomerObj;
    if( customerObj ) {
        latestCustomerObj = await getCustomerDetailsById( customerObj._id );
    }
    else {
        throw new Error("Session Expired !")
    }
    return latestCustomerObj;
}

const verifyAdminAuth = async ( context ) => {
    let authToken = getHeaders( context );
    let adminObj = await verifyJWT( authToken );
    let latestAdminObj;
    if( adminObj ) {
        latestAdminObj = await getAdminUserDetailsById( adminObj._id );
    }
    else {
        throw new Error("Session Expired !")
    }
    return latestAdminObj;
}

const verifyHotelAuth = async ( context ) => {
    let authToken = getHeaders( context );
    let hotelUserObj = await verifyJWT( authToken );
    let latestHotelObj;
    if( hotelUserObj ) {
        latestHotelObj = await getHotelUserDetailsById( hotelUserObj._id );
    }
    else {
        throw new Error("Session Expired !")
    }
    return latestHotelObj;
}

const getHeaders = ( context ) => {
    let headers = context.headers;
    return headers.authorization ? headers.authorization.split( " " )[1] : false;
}

module.exports = {
    verifyCustomerAuth,
    verifyAdminAuth,
    verifyHotelAuth
}