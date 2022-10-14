const { createAdminUser, disableAdminUser, getAdminUserDetails, getAdminUserDetailsById, getAllAdminUsers, updateAdminUser } = require('./admin-user.dao');
const { addNewUser, validateUserByEmailandPassword, profileUpdate, profileStatusUpdate, passwordChange } = require('./../user/user.service');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createJWT } = require('./../../../core/helpers/authHelper');

const adminUserSignUp = async ( req, res ) => {
    try {
        const { userType, ...userData } = req.body;
        if( !userData.password ) {
            return errorResponse( res, "Password is required !", 422 );
        }
        
        const userAdded = await addNewUser( userData );
        if( !userAdded ) {
            return errorResponse( res, "Failed to create user details !" );
        }

        let adminUserDetails = {
            userId: userAdded._id,
            userType: userType
        }
        const adminUserAdded = await createAdminUser( adminUserDetails );
        if( !adminUserAdded ) {
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

const adminUserSignIn = async ( req, res ) => {
    try {
        const userId = await validateUserByEmailandPassword( req.body );
        if( !userId ) {
            return errorResponse( res, "Invalid Email or Password !", 401 );
        }
        
        const adminUserDetails = await getAdminUserDetails( { userId } );
        if( !adminUserDetails ) {
            return errorResponse( res, "Invalid Email or Password !", 401 );
        }

        const token = createJWT( adminUserDetails.toObject() );

        return successResponse( res, "Signed In Successful", { token }, 200 );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const changePassword = async( req, res ) => {
    try {
        const userObj = req.body;
        const passwordUpdated = await passwordChange( req.adminObj.userId._id, userObj );
        if( !passwordUpdated ) {
            return errorResponse( res, "Failed to Update Password !" );
        }
        
        return successResponse( res, "Password Updated !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const getAdminDetails = async( req, res ) => {
    try {
        const adminId = req.adminObj._id;
        const adminDetails = await getAdminUserDetailsById( adminId );
        if( !adminDetails ) {
            return errorResponse( res, "Failed to get admin details !" );
        }

        return successResponse( res, "Admin Details Fetched !", { ...adminDetails.toObject() } );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    adminUserSignUp,
    adminUserSignIn,
    changePassword,
    getAdminDetails
}