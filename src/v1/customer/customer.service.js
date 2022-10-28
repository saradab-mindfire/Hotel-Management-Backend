const { createJWT } = require('../../../core/helpers/authHelper');
const { addNewUser, validateUserByEmailandPassword, profileUpdate, profileStatusUpdate, passwordChange } = require('./../user/user.service');
const { getAllCustomers, getCustomerDetails, createCustomer, getCustomerDetailsById } = require('./customer.dao');

const customerSignUpService = async( userData ) => {
    try {
        if( !userData.password ) {
            throw new Error( "Password is required !" );
        }
        
        const userAdded = await addNewUser( userData );
        if( !userAdded ) {
            throw new Error( "Failed to create user details !" )
        }

        const customerAdded = await createCustomer( { userId: userAdded._id } );
        if( !customerAdded ) {
            throw new Error( "Failed to create user details !" )
        }

        const { password, salt, ...userDetails } = userAdded.toObject();
        let { userId: _userId, ...customer } = customerAdded.toObject();

        customer['user'] = userDetails;
        customer['token'] = createJWT( userDetails );

        return customer;
        
    }
    catch( err ) {
        let errorMessage = err.message;
        if( err.keyPattern ) {
            errorMessage = Object.keys( err.keyPattern ).join(", ") + " already exists !";
        }
        throw new Error( errorMessage )
    }
}

const customerSignInService = async( email, _password ) => {
    try {
        const userId = await validateUserByEmailandPassword( { email, password: _password } );
        if( !userId ) {
            throw new Error("Invalid Email or Password !")
        }
        
        const customerDetails = await getCustomerDetails( { userId } );
        if( !customerDetails ) {
            throw new Error("Invalid Email or Password !")
        }

        const { password, salt, ...userDetails } = customerDetails.userId.toObject();
        let { userId: _userId, ...customer } = customerDetails.toObject();
        
        customer['user'] = userDetails;
        customer['token'] = createJWT( userDetails );

        return customer;

    }
    catch( err ) {
        throw err;
    }
}

const userProfileUpdateService = async( userId, userObj ) => {
    try {
        const profileUpdated = await profileUpdate( userId, userObj );
        if( !profileUpdated ) {
            throw new Error( "Failed to update profile !" );
        }
        
        return true;
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const userProfileStatusUpdateService = async( userId, status ) => {
    try {
        let userObj = { status };
        const profileUpdated = await profileStatusUpdate( userId, userObj );
        if( !profileUpdated ) {
            throw new Error( "Failed to update profile !" )
        }
        
        return true;
    }
    catch( err ) {
        throw new Error( err.message )
    }
}

const changePasswordService = async( userId, userObj ) => {
    try {
        const passwordUpdated = await passwordChange( userId, userObj );
        if( !passwordUpdated ) {
            throw new Error("Failed to Update Password !")
        }
        
        return passwordUpdated;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const getCustomerProfile = async( id ) => {
    try {
        const customerDetails = await getCustomerDetailsById( id );
        if( !customerDetails ) {
            throw new Error( "Failed to get customer details !" );
        }

        return parseProfileDetails( customerDetails );

    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const parseCustomerProfileDetails = ( data ) => {
    const { password, salt, ...userDetails } = data.userId.toObject();
    let { userId: _userId, ...profile } = data.toObject();
    profile['user'] = userDetails;
    return profile;
}

module.exports = {
    customerSignUpService,
    customerSignInService,
    userProfileUpdateService,
    userProfileStatusUpdateService,
    changePasswordService,
    getCustomerProfile,
    parseCustomerProfileDetails
}