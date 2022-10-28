const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require("graphql");
const { CustomerType, customerSignIn, customerSignUp, customerUpdateProfile, customerChangePassword } = require("./Schemas/customer.graphql");
const { AdminUserType, adminUserSignIn, adminUserSignUp, adminChangePassword } = require("./Schemas/admin-user.graphql");
const { HotelUserType, hotelUserSignIn, hotelUserSignUp, hotelUserUserDetails, hotelUserChangePassword } = require("./Schemas/hotel-user.graphql");

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
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
        }
    })
})

module.exports = {
    RootMutationType
}