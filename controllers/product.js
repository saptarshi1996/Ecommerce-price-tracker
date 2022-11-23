const responseHelper = require('../helpers/response');

const productDao = require('../dao/product');

exports.listUserProduct = async (req, res) => {
  try {
    const { user } = req;

    const userProductList = await productDao.listUserProduct({
      where: {
        user_id: user.id,
      },
      select: {
        id: true,
      },
    });

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        user_product: userProductList,
      }
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};

exports.getUserProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userProduct = await productDao.getUserProduct({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        user_product: userProduct,
      },
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};

exports.deleteUserProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productDao.deleteUserProduct({
      where: {
        id,
      },
    });

    return responseHelper.success({
      res,
      statusCode: 204,
      body: {
        message: 'User product deleted successfully',
      },
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};
