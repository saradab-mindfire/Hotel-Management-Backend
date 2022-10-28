const { GraphQLObjectType } = require("graphql");
const hotelUserTypes = require("../Types/hotel-user.types");

const HotelUserType = new GraphQLObjectType( hotelUserTypes );

module.exports = {
    HotelUserType
}