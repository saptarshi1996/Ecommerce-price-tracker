const userDao = require('../dao/user');

const responseHelper = require('../helpers/response');

exports.getUserDetails = async (req, res) => {
  try {
    const { user } = req;

    const userFound = await userDao.findUser({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        is_verified: true,
      }
    });

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        user: userFound,
      }
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};
