const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const { UserType } = require("./../Schemas/user.graphql");

module.exports = {
    name: "Customer",
    description: "This represents a customer of hotel booking",
    fields: () => ({
        _id: { type: new GraphQLNonNull( GraphQLString ) },
        userId: { type: new GraphQLNonNull( GraphQLString ) },
        user: {
            type: UserType
        },
        token: { type: GraphQLString }
    })
}