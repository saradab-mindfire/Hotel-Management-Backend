const { verifyJWT } = require('./authHelper');
const { getCustomerDetailsById } = require('./../../src/v1/customer/customer.dao');
const { getAdminUserDetailsById } = require('./../../src/v1/admin-user/admin-user.dao');
const { getHotelUserDetailsById } = require('./../../src/v1/hotel-user/hotel-user.dao');

const verifyCustomerAuth = async ( req, res, next ) => {
    let authToken = getHeaders( req );
    let customerObj = await verifyJWT( authToken );
    if( customerObj ) {
        let latestCustomerObj = await getCustomerDetailsById( customerObj._id );
        req.customerObj = latestCustomerObj;
        next();
    }
    else {
        res.status(401).json( { success: false, message: "Session Expired !" } )
    }
}

const verifyAdminAuth = async ( req, res, next ) => {
    let authToken = getHeaders( req );
    let adminObj = await verifyJWT( authToken );
    if( adminObj ) {
        let latestAdminObj = await getAdminUserDetailsById( adminObj._id );
        req.adminObj = latestAdminObj;
        next();
    }
    else {
        res.status(500).json( { success: false, message: "Session Expired !" } )
    }
}

const verifyHotelAuth = async ( req, res, next ) => {
    let authToken = getHeaders( req );
    let hotelUserObj = await verifyJWT( authToken );
    if( hotelUserObj ) {
        let latestHotelObj = await getHotelUserDetailsById( hotelUserObj._id );
        req.hotelUserObj = latestHotelObj;
        next();
    }
    else {
        res.status(500).json( { success: false, message: "Session Expired !" } )
    }
}

const getHeaders = ( req ) => {
    let headers = req.headers;
    return headers.authorization ? headers.authorization.split( " " )[1] : false;
}

module.exports = {
    verifyCustomerAuth,
    verifyAdminAuth,
    verifyHotelAuth
}