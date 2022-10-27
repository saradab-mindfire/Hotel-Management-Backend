const express = require('express');
const router = express.Router();
const { createHotel, getHotelDetails, updateHotel, updateHotelStatus, filterHotel } = require('./hotel.controller');
const { verifyHotelAuth } = require('./../../../core/helpers/jwtHelper');

router.post( '/create', verifyHotelAuth, createHotel );
router.get( '/details/:hotelId', getHotelDetails );
router.patch( '/update/status/:hotelId', updateHotelStatus );
router.put( '/update/:hotelId', updateHotel );
router.get( '/filter', filterHotel );

module.exports = router;