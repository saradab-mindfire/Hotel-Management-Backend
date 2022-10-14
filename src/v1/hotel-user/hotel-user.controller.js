const { createHotelUser, disableHotelUser, getAllHotelUsers, getHotelUserDetails, getHotelUserDetailsById, updateHotelUser } = require('./hotel-user.dao');
const { addNewUser, validateUserByEmailandPassword, profileUpdate, profileStatusUpdate, passwordChange } = require('./../user/user.service');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createJWT } = require('./../../../core/helpers/authHelper');

const hotelUserSignUp = async ( req, res ) => {
    try {
        const { userType, associatedWith, ...userData } = req.body;
        if( !userData.password ) {
            return errorResponse( res, "Password is required !", 422 );
        }
        
        const userAdded = await addNewUser( userData );
        if( !userAdded ) {
            return errorResponse( res, "Failed to create user details !" );
        }

        let hotelUserDetails = {
            userId: userAdded._id,
            userType: userType
        }
        if( associatedWith ) {
            Object.assign( hotelUserDetails, {
                associatedWith: associatedWith
            } )
        }
        const hotelUserAdded = await createHotelUser( hotelUserDetails );
        if( !hotelUserAdded ) {
            return errorResponse( res, "Failed to create user details !" );
        }
        
        return successResponse( res, "Signed Up Successfully !" );
    }
    catch( err ) {
        let errorMessage = err.message;
        if( err.keyPattern ) {
            errorMessage = Object.keys( err.keyPattern ).join(", ") + " already exists !";
        }
        return errorResponse( res, errorMessage );
    }
}

const hotelUserSignIn = async ( req, res ) => {
    try {
        const userId = await validateUserByEmailandPassword( req.body );
        if( !userId ) {
            return errorResponse( res, "Invalid Email or Password !", 401 );
        }
        
        const hotelUserDetails = await getHotelUserDetails( { userId } );
        if( !hotelUserDetails ) {
            return errorResponse( res, "Invalid Email or Password !", 401 );
        }

        const token = createJWT( hotelUserDetails.toObject() );

        return successResponse( res, "Signed In Successful", { token }, 200 );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const changePassword = async( req, res ) => {
    try {
        const userObj = req.body;
        const passwordUpdated = await passwordChange( req.hotelUserObj.userId._id, userObj );
        if( !passwordUpdated ) {
            return errorResponse( res, "Failed to Update Password !" );
        }
        
        return successResponse( res, "Password Updated !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const hotelUserDetails = async( req, res ) => {
    try {
        const hotelUserId = req.hotelUserObj._id;
        const hotelUserDetails = await getHotelUserDetailsById( hotelUserId );
        if( !hotelUserDetails ) {
            return errorResponse( res, "Failed to get hotel user details !" );
        }

        return successResponse( res, "Hotel User Details Fetched !", { ...hotelUserDetails.toObject() } );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    hotelUserSignUp,
    hotelUserSignIn,
    changePassword,
    hotelUserDetails
}