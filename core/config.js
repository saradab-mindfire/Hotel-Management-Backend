require('dotenv').config();

module.exports = {
    dbURL: process.env.DBURL,
    port: process.env.PORT,
    userAuthenticationSecret: process.env.USER_AUTHENTICATION_SECRET,
    adminAuthenticationSecret: process.env.ADMIN_AUTHENTICATION_SECRET,
    hotelUserAuthenticationSecret: process.env.HOTEL_USER_AUTHENTICATION_SECRET
}