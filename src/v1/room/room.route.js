const express = require('express');
const router = express.Router();
const { addNewRoom, getRoomDetails, updateRoomDetails, updateRoomStatus, updateRoomPrice } = require('./room.controller');
const { verifyHotelAuth } = require('./../../../core/helpers/jwtHelper');

router.post( '/add', verifyHotelAuth, addNewRoom );
router.put( '/update/:id', verifyHotelAuth, updateRoomDetails );
router.patch( '/status/update/:id', verifyHotelAuth, updateRoomStatus );
router.patch( '/price/update/:id', verifyHotelAuth, updateRoomPrice );
router.get( '/details/:id', verifyHotelAuth, getRoomDetails );

module.exports = router;