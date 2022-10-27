const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const { verifyAdminAuth } = require('./../../helpers/jwtHelperGraphQL');
const adminUserTypes = require("../Types/admin-user.types");
const { adminUserSignUpService, adminUserSignInService } = require('./../../../src/v1/admin-user/admin-user.service');

const AdminUserType = new GraphQLObjectType( adminUserTypes );

const adminUserSignUp = async( adminData ) => {
    const adminUser = await adminUserSignUpService( adminData );
    return adminUser;
}

const adminUserSignIn = async( email, password ) => {
    const adminUser = await adminUserSignInService( email, password );
    return adminUser;
}

module.exports = {
    AdminUserType,
    adminUserSignUp,
    adminUserSignIn
}