const express = require('express');
const router = express.Router();
const { bookNow, checkAvailability } = require('./bookings.controller');
const { verifyCustomerAuth } = require('./../../../core/helpers/jwtHelper');

router.post( '/create', verifyCustomerAuth, bookNow );
router.post( '/check-availability', checkAvailability );

module.exports = router;