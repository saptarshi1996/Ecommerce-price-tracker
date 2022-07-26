const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/login', authController.userLogin);

module.exports = router;
