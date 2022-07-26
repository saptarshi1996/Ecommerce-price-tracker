const userDao = require('../dao/user');

exports.userDetails = async (req, res) => {
  try {
    const payload = req.body;

    const userExists = await userDao.getUserByEmail({
      email: payload.email,
    });

    // user not found
    if (!userExists) {
      throw new Error('User not found');
    }

    return res.status(200).json({
      data: userExists,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
