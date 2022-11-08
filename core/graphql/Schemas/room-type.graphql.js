const { GraphQLObjectType } = require("graphql");
const RoomTypes = require("../Types/room-type.types");

const RoomType = new GraphQLObjectType( RoomTypes );

module.exports = {
    RoomType
}