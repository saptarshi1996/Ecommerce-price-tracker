const userDao = require('../dao/user');

const responseHelper = require('../helpers/response');
const userHelper = require('../helpers/user');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

module.exports = async (req, res, next) => {
  try {
    const {
      headers: {
        authorization,
      }
    } = req;

    const payload = await userHelper.verifyToken({
      token: authorization,
    });

    const userFound = await userDao.findUser({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
      },
    });

    if (!userFound) {
      throw new UnAuthorizedError('Invalid credentials');
    }

    req.user = userFound;
    return next();
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};
