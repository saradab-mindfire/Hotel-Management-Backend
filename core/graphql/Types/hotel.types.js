const { GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLInt } = require("graphql");
const { HotelUserType } = require("../Schemas/hotel-user.graphql");

module.exports = {
    name: "Hotel",
    description: "This represents a hotel of hotel booking",
    fields: () => ({
        _id: { type: new GraphQLNonNull( GraphQLString ) },
        name: { type: new GraphQLNonNull( GraphQLString ) },
        location: { type: new GraphQLNonNull( GraphQLString ) },
        address: { type: new GraphQLNonNull( GraphQLString ) },
        lat: { type: new GraphQLNonNull( GraphQLInt ) },
        lng: { type: new GraphQLNonNull( GraphQLInt ) },
        imageURL: { type: GraphQLString },
        checkInTime: { type: new GraphQLNonNull( GraphQLString ) },
        checkOutTime: { type: new GraphQLNonNull( GraphQLString ) },
        createdBy: { type: new GraphQLNonNull( GraphQLString ) },
        createdByDetails: {
            type: HotelUserType
        }
    })
}