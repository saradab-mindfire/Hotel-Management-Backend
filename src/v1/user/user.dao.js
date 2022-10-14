const UserModel = require('./user.model');

const createUser = async( userObj ) => {
    return UserModel.create( userObj );
}

const updateUser = async( userClauses, userObj ) => {
    return UserModel.updateOne( userClauses, userObj );
}

const updateUserById = async( id, userObj ) => {
    return UserModel.findByIdAndUpdate( id, userObj );
}

const getUserDetailsByClause = async( userClauses ) => {
    return UserModel.findOne( userClauses );
}

const getUserDetailsById = async( id ) => {
    return UserModel.findById( id );
}

const disableUser = async( userClauses, userObj ) => {
    return UserModel.updateOne( userClauses, userObj );
}

module.exports = {
    createUser,
    updateUser,
    disableUser,
    getUserDetailsByClause,
    getUserDetailsById,
    updateUserById
}