const userDao = require('../dao/user');

exports.getUserDetails = async (req, res) => {
  try {
    const user = await userDao.findUserById(req.user.id);
    res.status(200).json(user);
  } catch (ex) {
    res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};
