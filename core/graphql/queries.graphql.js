const {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} = require('graphql');
const { CustomerType, customerDetails } = require('./Schemas/customer.graphql');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        // getCustomers: {
        //     type: new GraphQLList( CustomerType ),
        //     resolve: () => {
        //         return getCustomers();
        //     }
        // },
        customerDetails : {
            type: CustomerType,
            description: "Get Customer Details",
            resolve: ( parent, args, context ) => {
                return customerDetails( context )
            }
        }
    })
})

module.exports = {
    RootQueryType
}