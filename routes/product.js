const express = require('express');

const userProductController = require('../controllers/product');

const router = express.Router();

router.get('/userProduct', userProductController.listUserProduct);
router.get('userProduct/:id', userProductController.getUserProduct);
router.delete('/userProduct/:id', userProductController.deleteUserProduct);

module.exports = router;
