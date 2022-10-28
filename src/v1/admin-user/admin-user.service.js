const { createAdminUser, disableAdminUser, getAdminUserDetails, getAdminUserDetailsById, getAllAdminUsers, updateAdminUser } = require('./admin-user.dao');
const { addNewUser, validateUserByEmailandPassword, profileUpdate, profileStatusUpdate, passwordChange } = require('./../user/user.service');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createJWT } = require('./../../../core/helpers/authHelper');

const adminUserSignUpService = async ( data ) => {
    try {
        const { userType, ...userData } = data;
        if( !userData.password ) {
            throw new Error( "Password is required !" )
        }
        
        const userAdded = await addNewUser( userData );
        if( !userAdded ) {
            throw new Error( "Failed to create user details !" )
        }

        let adminUserDetails = {
            userId: userAdded._id,
            userType: userType
        }
        const adminUserAdded = await createAdminUser( adminUserDetails );
        if( !adminUserAdded ) {
            throw new Error( "Failed to create user details !" )
        }
        
        const { password, salt, ...userDetails } = userAdded.toObject();
        let { userId: _userId, ...adminUser } = adminUserAdded.toObject();

        adminUser['user'] = userDetails;
        adminUser['token'] = createJWT( adminUser );

        return adminUser;
    }
    catch( err ) {
        let errorMessage = err.message;
        if( err.keyPattern ) {
            errorMessage = Object.keys( err.keyPattern ).join(", ") + " already exists !";
        }
        throw new Error( errorMessage );
    }
}

const adminUserSignInService = async ( email, _password ) => {
    try {
        const userId = await validateUserByEmailandPassword( { email, password: _password } );
        if( !userId ) {
            throw new Error( "Invalid Email or Password !" );
        }
        
        const adminUserDetails = await getAdminUserDetails( { userId } );
        if( !adminUserDetails ) {
            throw new Error( "Invalid Email or Password !" );
        }

        const { password, salt, ...userDetails } = adminUserDetails.userId.toObject();
        let { userId: _userId, ...adminUser } = adminUserDetails.toObject();
        
        adminUser['user'] = userDetails;
        adminUser['token'] = createJWT( adminUser );

        return adminUser;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const changeAdminPasswordService = async( adminId, userObj ) => {
    try {
        const passwordUpdated = await passwordChange( adminId, userObj );
        if( !passwordUpdated ) {
            throw new Error( "Failed to Update Password !" );
        }
        
        return passwordUpdated;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const getAdminDetailsService = async( adminId ) => {
    try {
        const adminDetails = await getAdminUserDetailsById( adminId );
        if( !adminDetails ) {
            throw new Error( "Failed to get admin details !" );
        }

        const { password, salt, ...userDetails } = adminDetails.userId.toObject();
        let { userId: _userId, ...adminUser } = adminDetails.toObject();
        
        adminUser['user'] = userDetails;
        adminUser['token'] = createJWT( adminUser );

        return adminUser;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const parseAdminProfileDetails = ( data ) => {
    const { password, salt, ...adminDetails } = data.userId.toObject();
    let { userId: _userId, ...profile } = data.toObject();
    profile['user'] = adminDetails;
    return profile;
}

module.exports = {
    adminUserSignUpService,
    adminUserSignInService,
    changeAdminPasswordService,
    getAdminDetailsService,
    parseAdminProfileDetails
}