const express = require('express');
const router = express.Router();

const customer = require('./customer/customer.route');
router.use( '/customer', customer );

const adminUser = require('./admin-user/admin-user.route');
router.use( '/admin-user', adminUser );

const hotelUser = require('./hotel-user/hotel-user.route');
router.use( '/hotel-user', hotelUser );

const hotel = require('./hotel/hotel.route');
router.use( '/hotel', hotel );

const roomType = require('./room-type/room-types.route');
router.use( '/room-type', roomType );

const room = require('./room/room.route');
router.use( '/room', room );

const bookings = require('./bookings/bookings.route');
router.use( '/bookings', bookings );

const notifications = require('./notifications/notifications.route');
router.use( '/notifications', notifications );

module.exports = router;