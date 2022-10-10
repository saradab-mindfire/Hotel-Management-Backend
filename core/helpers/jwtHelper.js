const { verifyJWT } = require('./authHelper');

const verifyUserAuth = async ( req, res, next ) => {
    let authToken = getHeaders( req );
    userObj = await verifyJWT( authToken );
    if( userObj ) {
        let latestUserObj = userObj;
        // latestUserObj = await getOneUser( { _id: userObj._id } );
        req.userObj = latestUserObj;
        next();
    }
    else {
        res.status(401).json( { success: false, message: "Unauthorized!" } )
    }
}

const verifyAdminAuth = async ( req, res, next ) => {
    let authToken = getHeaders( req );
    adminObj = await verifyJWT( authToken );
    if( adminObj ) {
        let latestAdminObj = adminObj;
        // latestAdminObj = await getOneStaff( { id: adminObj._id } );
        // if( latestAdminObj.status == 2 || latestAdminObj.status == 3 ) {
        //     res.status(500).json( { success: false, message: "Session Expired !" } )   
        //     return;
        // }
        req.adminObj = latestAdminObj;
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
    verifyUserAuth,
    verifyAdminAuth
}