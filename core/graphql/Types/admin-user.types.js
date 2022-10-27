const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");
const { UserType } = require("./../Schemas/user.graphql");

module.exports = {
    name: "AdminUser",
    description: "This represents a admin user of hotel booking",
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