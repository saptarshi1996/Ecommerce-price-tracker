const router = require('express').Router();

const userController = require('../controllers/user');

router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);
router.post('/verifyUser', userController.userVerificationToken);
router.post('/resendToken', userController.resendToken);

module.exports = router;
