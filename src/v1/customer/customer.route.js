const express = require('express');
const router = express.Router();
const { customerSignUp, customerSignIn, userProfileUpdate, userProfileStatusUpdate, changePassword, customerDetails } = require('./customer.controller');
const { verifyCustomerAuth } = require('./../../../core/helpers/jwtHelper');

router.post('/sign-up', customerSignUp);
router.post('/sign-in', customerSignIn);
router.put('/update-profile', verifyCustomerAuth, userProfileUpdate );
router.delete('/update-profile-status/:status', verifyCustomerAuth, userProfileStatusUpdate );
router.patch('/update-password', verifyCustomerAuth, changePassword );
router.get('/details', verifyCustomerAuth, customerDetails );

module.exports = router;