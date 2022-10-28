const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const { verifyHotelAuth } = require('./../../helpers/jwtHelperGraphQL');
const hotelUserTypes = require("../Types/hotel-user.types");
const { hotelUserSignInService, hotelUserSignUpService, changeHotelUserPasswordService, parseHotelUserProfileDetailsService } = require('./../../../src/v1/hotel-user/hotel-user.service');

const HotelUserType = new GraphQLObjectType( hotelUserTypes );

const hotelUserSignUp = async( hotelUserData ) => {
    const hotelUser = await hotelUserSignUpService( hotelUserData );
    return hotelUser;
}

const hotelUserSignIn = async( email, password ) => {
    const hotelUser = await hotelUserSignInService( email, password );
    return hotelUser;
}

const hotelUserChangePassword = async( context, args ) => {
    const hotelUserUserObj = await verifyHotelAuth( context );
    const { oldPassword, newPassword } = args;
    const userObj = { oldPassword, newPassword };
    await changeHotelUserPasswordService( hotelUserUserObj.userId._id, userObj );
    const hotelUser = parseHotelUserProfileDetailsService( hotelUserUserObj );
    return hotelUser;
}

const hotelUserUserDetails = async( context ) => {
    const hotelUserUserObj = await verifyHotelAuth( context );
    const hotelUser = parseHotelUserProfileDetailsService( hotelUserUserObj );
    return hotelUser;
}

module.exports = {
    HotelUserType,
    hotelUserSignUp,
    hotelUserSignIn,
    hotelUserChangePassword,
    hotelUserUserDetails
}