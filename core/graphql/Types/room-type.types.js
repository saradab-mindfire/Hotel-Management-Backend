const { GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLBoolean } = require("graphql");
const { HotelType } = require("./../Schemas/hotel.graphql");
const { HotelUserType } = require("./../Schemas/hotel-user.graphql");

module.exports = {
    name: "RoomType",
    description: "This represents a room type of hotel booking",
    fields: () => ({
        _id: { type: new GraphQLNonNull( GraphQLString ) },
        hotelId: { type: new GraphQLNonNull( GraphQLString ) },
        hotelDetails: {
            type: HotelType
        },
        roomType: { type: new GraphQLNonNull( GraphQLString ) },
        maxPersonLimit: { type: new GraphQLNonNull( GraphQLInt ) },
        isActive: { type: GraphQLBoolean },
        createdBy: { type: new GraphQLNonNull( GraphQLString ) },
        createdByDetails: {
            type: HotelUserType
        }
    })
}