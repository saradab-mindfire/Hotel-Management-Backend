const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");

module.exports = {
    name: "User",
    description: "This represents a user of hotel booking",
    fields: () => ({
        uuid: { type: new GraphQLNonNull( GraphQLString ) },
        firstName: { type: new GraphQLNonNull( GraphQLString ) },
        lastName: { type: new GraphQLNonNull( GraphQLString ) },
        email: { type: new GraphQLNonNull( GraphQLString ) },
        mobile: { type: new GraphQLNonNull( GraphQLString ) },
        // salt: { type: new GraphQLNonNull( GraphQLString ) },
        // password: { type: new GraphQLNonNull( GraphQLString ) },
        emailVerified: { type: new GraphQLNonNull( GraphQLBoolean ) },
        mobileVerified: { type: new GraphQLNonNull( GraphQLBoolean ) },
        status: { type: new GraphQLNonNull( GraphQLString ) }
    })
}