const express = require('express');
const router = express.Router();
const { bookNow, checkAvailability, cancelBooking, getBookings, getBookingDetails } = require('./bookings.controller');
const { verifyCustomerAuth, verifyAdminAuth, verifyHotelAuth } = require('./../../../core/helpers/jwtHelper');

router.post( '/create', verifyCustomerAuth, bookNow );
router.post( '/check-availability', checkAvailability );

router.patch( '/hotel/cancel/:bookingId', verifyHotelAuth, cancelBooking );
router.patch( '/admin/cancel/:bookingId', verifyAdminAuth, cancelBooking );
router.patch( '/cancel/:bookingId', verifyCustomerAuth, cancelBooking );

router.get( '/hotel/all', verifyHotelAuth, getBookings );
router.get( '/admin/all', verifyAdminAuth, getBookings );
router.get( '/all', verifyCustomerAuth, getBookings );

router.get( '/hotel/booking/:bookingId', verifyHotelAuth, getBookingDetails );
router.get( '/admin/booking/:bookingId', verifyAdminAuth, getBookingDetails );
router.get( '/booking/:bookingId', verifyCustomerAuth, getBookingDetails );

module.exports = router;