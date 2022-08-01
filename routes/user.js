const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/userDetails', userController.getUserDetails);

module.exports = router;
