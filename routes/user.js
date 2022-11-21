const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/userDetails', userController.getUserDetails);

module.exports = router;
