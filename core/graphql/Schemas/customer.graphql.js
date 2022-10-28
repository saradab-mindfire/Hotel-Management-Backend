const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const customerTypes = require("../Types/customer.types");
const { customerSignInService, customerSignUpService, userProfileUpdateService, changePasswordService, parseCustomerProfileDetails, getCustomerProfile } = require('./../../../src/v1/customer/customer.service');
const { verifyCustomerAuth } = require('./../../helpers/jwtHelperGraphQL')

const CustomerType = new GraphQLObjectType( customerTypes );

const customerSignIn = async( email, password ) => {
    const customer = await customerSignInService( email, password );
    return customer;
}

const customerSignUp = async( userData ) => {
    const customer = await customerSignUpService( userData );
    return customer;
}

const customerDetails = async( context ) => {
    const customerObj = await verifyCustomerAuth( context );
    const { password, salt, ...userDetails } = customerObj.userId.toObject();
    let { userId: _userId, ...customer } = customerObj.toObject();
    customer['user'] = userDetails;
    return customer;
}

const customerUpdateProfile = async( context, args ) => {
    const customerObj = await verifyCustomerAuth( context );
    const { firstName, lastName } = args;
    const userObj = {
        firstName, 
        lastName
    };
    await userProfileUpdateService( customerObj.userId._id, userObj );
    const customer = getCustomerProfile( customerObj._id );
    return customer;
}

const customerChangePassword = async( context, args ) => {
    const customerObj = await verifyCustomerAuth( context );
    const { oldPassword, newPassword } = args;
    const userObj = { oldPassword, newPassword };
    await changePasswordService( customerObj.userId._id, userObj );
    const customer = parseCustomerProfileDetails( customerObj );
    return customer;
}

module.exports = {
    CustomerType,
    customerSignIn,
    customerSignUp,
    customerDetails,
    customerUpdateProfile,
    customerChangePassword
}