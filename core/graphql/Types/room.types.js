const { GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLBoolean } = require("graphql");
const { HotelType } = require("./../Schemas/hotel.graphql");
const { HotelUserType } = require("./../Schemas/hotel-user.graphql");
const { RoomTypeType } = require("./../Schemas/room-type.graphql");

module.exports = {
    name: "Room",
    description: "This represents a hotel room of hotel booking",
    fields: () => ({
        _id: { type: new GraphQLNonNull( GraphQLString ) },
        hotelId: { type: new GraphQLNonNull( GraphQLString ) },
        hotelDetails: {
            type: HotelType
        },
        displayName: { type: new GraphQLNonNull( GraphQLString ) },
        description: { type: new GraphQLNonNull( GraphQLString ) },
        roomType: { type: new GraphQLNonNull( GraphQLString ) },
        roomTypeDetails: {
            type: RoomTypeType
        },
        defaultPrice: { type: new GraphQLNonNull( GraphQLInt ) },
        isActive: { type: GraphQLBoolean },
        createdBy: { type: new GraphQLNonNull( GraphQLString ) },
        createdByDetails: {
            type: HotelUserType
        }
    })
}