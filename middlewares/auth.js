const userDao = require('../dao/user');
const authHelper = require('../helpers/auth');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const decoded = await authHelper.verifyToken(authorization);
    const userExists = await userDao.findUser({ id: +decoded });

    if (!userExists) {
      throw new Error('Invalid credentials');
    } else {
      req.user = {
        id: userExists.id,
      };
      return next();
    }
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
