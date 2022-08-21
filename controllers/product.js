const productDao = require('../dao/product');

exports.getUserProducts = async (req, res) => {
  try {
    const products = await productDao.getUserProducts({
      userId: req.user.id,
    });
    return res.status(200).json(products);
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};

exports.getUserProduct = async (req, res) => {
  try {
    const product = await productDao.getUserProduct({
      productId: req.params.id,
    });
    return res.status(200).json(product);
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};

exports.deleteUserProduct = async (req, res) => {
  try {
    await productDao.deleteUserProduct({
      productId: req.params.id,
    });
    return res.status(200).json({
      message: 'User Product deleted successfully',
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};
