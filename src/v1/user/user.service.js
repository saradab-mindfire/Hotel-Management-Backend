const { createUser, disableUser, updateUser, getUserDetailsByClause, getUserDetailsById, updateUserById } = require('./user.dao');
const { createJWT, encryptPassword, generateSalt } = require('./../../../core/helpers/authHelper');
const { UserSchemaValidation } = require('./user.schema');

const addNewUser = async ( userObj ) => {
    try {
        const { error } = UserSchemaValidation.validate( userObj );
        if( error ) {
            throw error;
        }

        userObj['salt'] = generateSalt();
        userObj['password'] = encryptPassword( userObj.password, userObj.salt );
        userObj['status'] = 'in-active';
        
        return createUser( userObj );
    }
    catch( err ) {
        throw err;
    }
}

const validateUserByEmailandPassword = async ( userData ) => {
    try {
        const userDetails = await getUserDetailsByClause( { email: userData.email } );
        if( !userDetails ) {
            throw new Error("Invalid Email or Password !")
        }

        const { salt, password, ...filteredUserDetails } = userDetails.toObject(); 
        if( encryptPassword( userData.password, salt ) !== password ) {
            throw new Error("Invalid Email or Password !")
        }

        return filteredUserDetails._id;

    }
    catch( err ) {
        throw err;
    }
}

const profileUpdate = async ( id, userObj ) => {
    try {
        // const { error } = UserSchemaValidation.validate( userObj );
        // if( error ) {
        //     throw error;
        // }

        const updatedData = await updateUserById( id, userObj );
        if( !updatedData ) {
            throw new Error( "Failed to update user data !" );
        }

        return true;
    }
    catch( err ) {
        throw err;
    }
    
}

const profileStatusUpdate = async ( id, userObj ) => {
    try {
        const updatedData = await updateUserById( id, userObj );
        if( !updatedData ) {
            throw new Error( "Failed to update user data !" );
        }

        return true;
    }
    catch( err ) {
        throw err;
    }
    
}

const passwordChange = async( id, userData ) => {
    try {
        const userProfile = await getUserDetailsById( id );
        if( !userProfile ) {
            throw new Error( "User Profile Not Found !");
        }

        if( encryptPassword( userData.oldPassword, userProfile.salt ) !== userProfile.password ) {
            throw new Error( "Invalid Current Password !");
        }

        const newPasswordObj = {
            password: encryptPassword( userData.newPassword, userProfile.salt )
        }
        const updatedData = await updateUserById( id, newPasswordObj );
        if( !updatedData ) {
            throw new Error( "Failed to Update Password" );
        }

        return true;
    }
    catch( err ) {
        throw err;
    }
}

module.exports = {
    addNewUser,
    validateUserByEmailandPassword,
    profileUpdate,
    profileStatusUpdate,
    passwordChange
}