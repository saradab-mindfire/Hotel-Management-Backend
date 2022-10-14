const express = require('express');
const router = express.Router();
const { adminUserSignUp, adminUserSignIn, changePassword, getAdminDetails } = require('./admin-user.controller');
const { verifyAdminAuth } = require('./../../../core/helpers/jwtHelper');

router.post('/sign-up', adminUserSignUp);
router.post('/sign-in', adminUserSignIn);
router.patch('/update-password', verifyAdminAuth, changePassword );
router.get('/details', verifyAdminAuth, getAdminDetails );

module.exports = router;