const express = require('express');
const router = express.Router();
const { filterHotels } = require('./common.controller');

router.get('/filter', filterHotels);

module.exports = router;