const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const { verifyAdminAuth } = require('./../../helpers/jwtHelperGraphQL');
const adminUserTypes = require("../Types/admin-user.types");
const { adminUserSignUpService, adminUserSignInService, changeAdminPasswordService, parseAdminProfileDetails } = require('./../../../src/v1/admin-user/admin-user.service');

const AdminUserType = new GraphQLObjectType( adminUserTypes );

const adminUserSignUp = async( adminData ) => {
    const adminUser = await adminUserSignUpService( adminData );
    return adminUser;
}

const adminUserSignIn = async( email, password ) => {
    const adminUser = await adminUserSignInService( email, password );
    return adminUser;
}

const adminChangePassword = async( context, args ) => {
    const adminUserObj = await verifyAdminAuth( context );
    const { oldPassword, newPassword } = args;
    const userObj = { oldPassword, newPassword };
    await changeAdminPasswordService( adminUserObj.userId._id, userObj );
    const adminUser = parseAdminProfileDetails( adminUserObj );
    return adminUser;
}

const adminUserDetails = async( context ) => {
    const adminUserObj = await verifyAdminAuth( context );
    const adminUser = parseAdminProfileDetails( adminUserObj );
    return adminUser;
}

module.exports = {
    AdminUserType,
    adminUserSignUp,
    adminUserSignIn,
    adminChangePassword,
    adminUserDetails
}