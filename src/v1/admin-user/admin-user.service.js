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
        let { userId: _userId, ...customer } = adminUserDetails.toObject();
        
        customer['user'] = userDetails;
        customer['token'] = createJWT( customer );

        return customer;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

// const changePassword = async( req, res ) => {
//     try {
//         const userObj = req.body;
//         const passwordUpdated = await passwordChange( req.adminObj.userId._id, userObj );
//         if( !passwordUpdated ) {
//             return errorResponse( res, "Failed to Update Password !" );
//         }
        
//         return successResponse( res, "Password Updated !" );
//     }
//     catch( err ) {
//         return errorResponse( res, err.message );
//     }
// }

// const getAdminDetails = async( req, res ) => {
//     try {
//         const adminId = req.adminObj._id;
//         const adminDetails = await getAdminUserDetailsById( adminId );
//         if( !adminDetails ) {
//             return errorResponse( res, "Failed to get admin details !" );
//         }

//         return successResponse( res, "Admin Details Fetched !", { ...adminDetails.toObject() } );
//     }
//     catch( err ) {
//         return errorResponse( res, err.message );
//     }
// }

module.exports = {
    adminUserSignUpService,
    adminUserSignInService,
    // changePassword,
    // getAdminDetails
}