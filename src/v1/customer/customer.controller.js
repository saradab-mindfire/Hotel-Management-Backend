const { createCustomer, getCustomerDetails, getCustomerDetailsById } = require('./customer.dao');
const { addNewUser, validateUserByEmailandPassword, profileUpdate, profileStatusUpdate, passwordChange } = require('./../user/user.service');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createJWT } = require('./../../../core/helpers/authHelper');

const customerSignUp = async( req, res ) => {
    try {
        let userData = req.body;
        if( !userData.password ) {
            return errorResponse( res, "Password is required !", 422 );
        }
        
        const userAdded = await addNewUser( userData );
        if( !userAdded ) {
            return errorResponse( res, "Failed to create user details !" );
        }

        let customerDetails = {
            userId: userAdded._id
        }
        const customerAdded = await createCustomer( customerDetails );
        if( !customerAdded ) {
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

const customerSignIn = async( req, res ) => {
    try {
        const userId = await validateUserByEmailandPassword( req.body );
        if( !userId ) {
            return errorResponse( res, "Invalid Email or Password !", 401 );
        }
        
        const customerDetails = await getCustomerDetails( { userId } );
        if( !customerDetails ) {
            return errorResponse( res, "Invalid Email or Password !", 401 );
        }

        const token = createJWT( customerDetails.toObject() );
        return successResponse( res, "Signed In Successful", { token }, 200 );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const userProfileUpdate = async( req, res ) => {
    try {
        const profileUpdated = await profileUpdate( req.customerObj.userId._id, req.body );
        if( !profileUpdated ) {
            return errorResponse( res, "Failed to update profile !" );
        }
        
        return successResponse( res, "Profile Updated" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const userProfileStatusUpdate = async( req, res ) => {
    try {
        let userObj = {
            status: req.params.status
        }

        const profileUpdated = await profileStatusUpdate( req.customerObj.userId._id, userObj );
        if( !profileUpdated ) {
            return errorResponse( res, "Failed to update profile !" );
        }
        
        return successResponse( res, "Profile Status Updated !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const changePassword = async( req, res ) => {
    try {
        const userObj = req.body;
        const passwordUpdated = await passwordChange( req.customerObj.userId._id, userObj );
        if( !passwordUpdated ) {
            return errorResponse( res, "Failed to Update Password !" );
        }
        
        return successResponse( res, "Password Updated !" );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

const customerDetails = async( req, res ) => {
    try {
        const customerId = req.customerObj._id;
        const customerDetails = await getCustomerDetailsById( customerId );
        if( !customerDetails ) {
            return errorResponse( res, "Failed to get customer details !" );
        }

        return successResponse( res, "Customer Details Fetched !", { ...customerDetails.toObject() } );
    }
    catch( err ) {
        return errorResponse( res, err.message );
    }
}

module.exports = {
    customerSignUp,
    customerSignIn,
    userProfileUpdate,
    userProfileStatusUpdate,
    changePassword,
    customerDetails
}