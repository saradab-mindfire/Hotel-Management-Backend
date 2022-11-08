const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { AdminUserType, adminUserDetails } = require('./Schemas/admin-user.graphql');
const { CustomerType, customerDetails } = require('./Schemas/customer.graphql');
const { HotelUserType, hotelUserUserDetails } = require('./Schemas/hotel-user.graphql');
const { HotelType, createHotel, getHotelUserDetails, updateHotel, updateHotelStatus } = require('./Schemas/hotel.graphql');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        // Customer Functions
        customerDetails: {
            type: CustomerType,
            description: "Get Customer Details",
            resolve: ( parent, args, context ) => {
                return customerDetails( context )
            }
        },
        // Admin Functions
        adminUserDetails: {
            type: AdminUserType,
            description: "Get Customer Details",
            resolve: ( parent, args, context ) => {
                return adminUserDetails( context )
            }
        },
        // Hotel User Functions
        hotelUserDetails: {
            type: HotelUserType,
            description: "Get Hotel User Details",
            resolve: ( parent, args, context ) => {
                return hotelUserUserDetails( context )
            }
        },
        // Hotel Details
        hotelDetails: {
            type: HotelType,
            description: "Get Hotel Details",
            args: {
                hotelId: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args, context ) => {
                return getHotelUserDetails( args.hotelId, context )
            }
        }
    })
})

module.exports = {
    RootQueryType
}