const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/details', userController.getUserDetails);

module.exports = router;
