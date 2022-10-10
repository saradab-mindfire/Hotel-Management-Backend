const express = require('express');
const router = express.Router();

const v1Router = require('./src/v1/v1Router');
router.use( '/v1', v1Router );

module.exports = router;