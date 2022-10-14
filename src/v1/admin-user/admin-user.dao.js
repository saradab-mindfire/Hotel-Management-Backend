const AdminUser = require('./admin-user.model');

const createAdminUser = async ( adminUserObj ) => {
    return AdminUser.create( adminUserObj );
}

const updateAdminUser = async ( adminUserObj, adminUserClauses ) => {
    return AdminUser.updateOne( adminUserClauses, adminUserObj );
}

const disableAdminUser = async ( adminUserClauses ) => {
    return AdminUser.updateOne( adminUserClauses );
}

const getAdminUserDetailsById = async ( adminUserId ) => {
    return AdminUser.findById( adminUserId ).populate('userId');
}

const getAdminUserDetails = async ( adminUserClauses ) => {
    return AdminUser.findOne( adminUserClauses ).populate('userId');
}

const getAllAdminUsers = async ( adminUserClauses ) => {
    return AdminUser.find( adminUserClauses );
}

module.exports = {
    createAdminUser,
    updateAdminUser,
    disableAdminUser,
    getAdminUserDetailsById,
    getAdminUserDetails,
    getAllAdminUsers
}