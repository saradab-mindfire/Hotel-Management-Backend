const express = require('express');
const router = express.Router();
const { hotelUserSignIn, hotelUserSignUp, changePassword, hotelUserDetails } = require('./hotel-user.controller');
const { verifyHotelAuth } = require('./../../../core/helpers/jwtHelper');

router.post('/sign-up', hotelUserSignUp);
router.post('/sign-in', hotelUserSignIn);
router.patch('/update-password', verifyHotelAuth, changePassword );
router.get('/details', verifyHotelAuth, hotelUserDetails );

module.exports = router;