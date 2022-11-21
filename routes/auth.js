const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.userLogin);
router.post('/register', authController.userRegister);
router.post('/verify', authController.verifyUser);
router.post('/resend', authController.resendToken);

module.exports = router;
