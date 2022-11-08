const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLFloat } = require("graphql");
const { CustomerType, customerSignIn, customerSignUp, customerUpdateProfile, customerChangePassword } = require("./Schemas/customer.graphql");
const { AdminUserType, adminUserSignIn, adminUserSignUp, adminChangePassword } = require("./Schemas/admin-user.graphql");
const { HotelUserType, hotelUserSignIn, hotelUserSignUp, hotelUserUserDetails, hotelUserChangePassword } = require("./Schemas/hotel-user.graphql");
const { HotelType, createHotel, updateHotel, updateHotelStatus } = require("./Schemas/hotel.graphql");
const { RoomType, createRoom, updateRoom, updateRoomStatus } = require("./Schemas/room.graphql");

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        // Customer Functions
        customerSignIn: {
            type: CustomerType,
            args: {
                email: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args ) => {
                return customerSignIn( args.email, args.password );
            }
        },
        customerSignUp: {
            type: CustomerType,
            args: {
                firstName: { type: new GraphQLNonNull( GraphQLString ) },
                lastName: { type: new GraphQLNonNull( GraphQLString ) },
                email: { type: new GraphQLNonNull( GraphQLString ) },
                mobile: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args ) => {
                return customerSignUp( args );
            }
        },
        customerProfileUpdate: {
            type: CustomerType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString }
            },
            resolve: ( parent, args, context ) => {
                return customerUpdateProfile( context, args );
            }
        },
        customerChangePassword: {
            type: CustomerType,
            args: {
                newPassword: { type: GraphQLString },
                oldPassword: { type: GraphQLString }
            },
            resolve: ( parent, args, context ) => {
                return customerChangePassword( context, args );
            }
        },
        // Admin Functions
        adminUserSignIn: {
            type: AdminUserType,
            args: {
                email: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args ) => {
                return adminUserSignIn( args.email, args.password );
            }
        },
        adminUserSignUp: {
            type: AdminUserType,
            args: {
                userType: { type: new GraphQLNonNull( GraphQLString ) },
                firstName: { type: new GraphQLNonNull( GraphQLString ) },
                lastName: { type: new GraphQLNonNull( GraphQLString ) },
                email: { type: new GraphQLNonNull( GraphQLString ) },
                mobile: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args ) => {
                return adminUserSignUp( args );
            }
        },
        adminChangePassword: {
            type: AdminUserType,
            args: {
                oldPassword: { type: new GraphQLNonNull( GraphQLString ) },
                newPassword: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args, context ) => {
                return adminChangePassword( context, args );
            }
        },
        // Hotel User Functions
        hotelUserSignIn: {
            type: HotelUserType,
            args: {
                email: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args ) => {
                return hotelUserSignIn( args.email, args.password );
            }
        },
        hotelUserSignUp: {
            type: HotelUserType,
            args: {
                userType: { type: new GraphQLNonNull( GraphQLString ) },
                firstName: { type: new GraphQLNonNull( GraphQLString ) },
                lastName: { type: new GraphQLNonNull( GraphQLString ) },
                email: { type: new GraphQLNonNull( GraphQLString ) },
                mobile: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args ) => {
                return hotelUserSignUp( args );
            }
        },
        hotelUserChangePassword: {
            type: HotelUserType,
            args: {
                oldPassword: { type: new GraphQLNonNull( GraphQLString ) },
                newPassword: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args, context ) => {
                return hotelUserChangePassword( context, args );
            }
        },
        // Hotel Functions
        createHotel: {
            type: HotelType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                location: { type: new GraphQLNonNull( GraphQLString ) },
                address: { type: new GraphQLNonNull( GraphQLString ) },
                lat: { type: new GraphQLNonNull( GraphQLFloat ) },
                lng: { type: new GraphQLNonNull( GraphQLFloat ) },
                imageURL: { type: GraphQLString },
                checkInTime: { type: GraphQLString },
                checkOutTime: { type: GraphQLString }
            },
            resolve: ( parent, args, context ) => {
                return createHotel( args, context );
            }
        },
        updateHotel: {
            type: HotelType,
            args: {
                hotelId: { type: new GraphQLNonNull( GraphQLString ) },
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                address: { type: GraphQLString },
                lat: { type: GraphQLFloat },
                lng: { type: GraphQLFloat },
                imageURL: { type: GraphQLString },
                checkInTime: { type: GraphQLString },
                checkOutTime: { type: GraphQLString },
            },
            resolve: ( parent, args, context ) => {
                const { hotelId, ...hotelDetails } = args;
                return updateHotel( hotelDetails, hotelId, context );
            }
        },
        updateHotelStatus: {
            type: HotelType,
            args: {
                hotelId: { type: new GraphQLNonNull( GraphQLString ) },
                isActive: { type: new GraphQLNonNull( GraphQLBoolean ) }
            },
            resolve: ( parent, args, context ) => {
                return updateHotelStatus( args.hotelId, args.isActive, context );
            }
        },
        // Room Functions
        createRoom: {
            type: RoomType,
            args: {
                hotelId: { type: new GraphQLNonNull( GraphQLString ) },
                displayName: { type: new GraphQLNonNull( GraphQLString ) },
                description: { type: new GraphQLNonNull( GraphQLString ) },
                roomType: { type: new GraphQLNonNull( GraphQLString ) },
                defaultPrice: { type: new GraphQLNonNull( GraphQLFloat ) },
                createdBy: { type: new GraphQLNonNull( GraphQLString ) }
            },
            resolve: ( parent, args, context ) => {
                return createRoom( args, context );
            }
        },
        updateRoom: {
            type: RoomType,
            args: {
                roomId: { type: new GraphQLNonNull( GraphQLString ) },
                hotelId: { type: GraphQLString },
                displayName: { type: GraphQLString },
                description: { type: GraphQLString },
                roomType: { type: GraphQLString },
                defaultPrice: { type: GraphQLFloat },
                createdBy: { type: GraphQLString }
            },
            resolve: ( parent, args, context ) => {
                return updateRoom( args, args.roomId, context );
            }
        },
        updateRoomStatus: {
            type: RoomType,
            args: {
                roomId: { type: new GraphQLNonNull( GraphQLString ) },
                isActive: { type: new GraphQLNonNull( GraphQLBoolean ) }
            },
            resolve: ( parent, args, context ) => {
                return updateRoomStatus( args.roomId, args.isActive, context );
            }
        },
        // updateRoomPrice: {

        // }
    })
})

module.exports = {
    RootMutationType
}