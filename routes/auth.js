const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/login', authController.userLogin);
router.post('/register', authController.userRegister);
router.post('/verify', authController.verifyUser);
router.post('/resend', authController.resendToken);

module.exports = router;
