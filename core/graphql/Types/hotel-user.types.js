const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const { UserType } = require("./../Schemas/user.graphql");

module.exports = {
    name: "HotelUser",
    description: "This represents a hotel user of hotel booking",
    fields: () => ({
        _id: { type: new GraphQLNonNull( GraphQLString ) },
        userId: { type: new GraphQLNonNull( GraphQLString ) },
        userType: { type: new GraphQLNonNull( GraphQLString ) },
        user: {
            type: UserType
        },
        token: { type: GraphQLString }
    })
}