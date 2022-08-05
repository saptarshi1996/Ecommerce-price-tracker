const router = require('express').Router();

const productController = require('../controllers/product');

router.get('/products', productController.getUserProducts);
router.get('/product/:id', productController.getUserProduct);
router.delete('/product/:id', productController.deleteUserProduct);

module.exports = router;
