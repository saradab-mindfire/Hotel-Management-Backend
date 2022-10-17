const express = require('express');
const router = express.Router();
const { addRoomType, getRoomTypeDetailsById, updateRoomType, updateRoomTypeStatus } = require('./room-types.controller');
const { verifyHotelAuth } = require('./../../../core/helpers/jwtHelper');

router.post('/add', verifyHotelAuth, addRoomType);
router.put('/update/:id', verifyHotelAuth, updateRoomType);
router.patch('/status/update/:id', verifyHotelAuth, updateRoomTypeStatus);
router.get('/details/:id', verifyHotelAuth, getRoomTypeDetailsById);

module.exports = router;