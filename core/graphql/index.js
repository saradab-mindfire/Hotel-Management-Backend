const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { RootMutationType } = require("./mutations.graphql");
const { RootQueryType } = require("./queries.graphql");

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

module.exports = {
    schema
}