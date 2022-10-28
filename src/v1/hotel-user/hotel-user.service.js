const { updateHotelUserById,createHotelUser, disableHotelUser, getHotelUserDetails, getHotelUserDetailsById, updateHotelUser } = require('./hotel-user.dao');
const { addNewUser, validateUserByEmailandPassword, profileUpdate, profileStatusUpdate, passwordChange } = require('./../user/user.service');
const { errorResponse, successResponse } = require('./../../../core/helpers/responseHandler');
const { createJWT } = require('./../../../core/helpers/authHelper');

const updateHotelAssociatedWithService = ( hotelUserId, hotelId ) => {
    return updateHotelUserById( hotelUserId, { associatedWith: hotelId } );
}

const hotelUserSignUpService = async ( data ) => {
    try {
        const { userType, associatedWith, ...userData } = data;
        if( !userData.password ) {
            throw new Error( "Password is required !" );
        }
        
        const userAdded = await addNewUser( userData );
        if( !userAdded ) {
            throw new Error( "Failed to create user details !" );
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
            throw new Error( "Failed to create user details !" );
        }

        const { password, salt, ...userDetails } = userAdded.toObject();
        let { userId: _userId, ...hotelUser } = hotelUserAdded.toObject();

        hotelUser['user'] = userDetails;
        hotelUser['token'] = createJWT( hotelUser );

        return hotelUser;
    }
    catch( err ) {
        let errorMessage = err.message;
        if( err.keyPattern ) {
            errorMessage = Object.keys( err.keyPattern ).join(", ") + " already exists !";
        }
        throw new Error( errorMessage );
    }
}

const hotelUserSignInService = async ( email, _password ) => {
    try {
        const userId = await validateUserByEmailandPassword( { email, password: _password } );
        if( !userId ) {
            throw new Error( "Invalid Email or Password !" );
        }
        
        const hotelUserDetails = await getHotelUserDetails( { userId } );
        if( !hotelUserDetails ) {
            throw new Error( "Invalid Email or Password !" );
        }

        const { password, salt, ...userDetails } = hotelUserDetails.userId.toObject();
        let { userId: _userId, ...hotelUser } = hotelUserDetails.toObject();
        
        hotelUser['user'] = userDetails;
        hotelUser['token'] = createJWT( hotelUser );

        return hotelUser;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const changeHotelUserPasswordService = async( userId, userObj ) => {
    try {
        const passwordUpdated = await passwordChange( userId, userObj );
        if( !passwordUpdated ) {
            throw new Error( "Failed to Update Password !" );
        }
        
        return passwordUpdated;
    }
    catch( err ) {
        throw new Error( err.message );
    }
}

const parseHotelUserProfileDetailsService = ( data ) => {
    const { password, salt, ...hoteUserDetails } = data.userId.toObject();
    let { userId: _userId, ...profile } = data.toObject();
    profile['user'] = hoteUserDetails;
    return profile;
}

module.exports = {
    updateHotelAssociatedWithService,
    parseHotelUserProfileDetailsService,
    changeHotelUserPasswordService,
    hotelUserSignInService,
    hotelUserSignUpService
}