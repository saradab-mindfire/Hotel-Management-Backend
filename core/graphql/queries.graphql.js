const { GraphQLObjectType } = require('graphql');
const { AdminUserType, adminUserDetails } = require('./Schemas/admin-user.graphql');
const { CustomerType, customerDetails } = require('./Schemas/customer.graphql');
const { HotelUserType, hotelUserUserDetails } = require('./Schemas/hotel-user.graphql');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        customerDetails: {
            type: CustomerType,
            description: "Get Customer Details",
            resolve: ( parent, args, context ) => {
                return customerDetails( context )
            }
        },
        adminUserDetails: {
            type: AdminUserType,
            description: "Get Customer Details",
            resolve: ( parent, args, context ) => {
                return adminUserDetails( context )
            }
        },
        hotelUserDetails: {
            type: HotelUserType,
            description: "Get Hotel User Details",
            resolve: ( parent, args, context ) => {
                return hotelUserUserDetails( context )
            }
        }
    })
})

module.exports = {
    RootQueryType
}