const { GraphQLObjectType } = require("graphql")
const userTypes = require("../Types/user.types")

const UserType = new GraphQLObjectType( userTypes )

module.exports = {
    UserType
}