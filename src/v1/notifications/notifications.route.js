const express = require('express');
const router = express.Router();
const { bulkSendNotification } = require('./notifications.controller');
const { verifyAdminAuth } = require('./../../../core/helpers/jwtHelper')

router.post('/bulk-send', verifyAdminAuth, bulkSendNotification);

module.exports = router;