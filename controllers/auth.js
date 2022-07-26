const userDao = require('../dao/user');

exports.userLogin = async (req, res) => {
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
      message: 'User logged in successfully',
      data: null,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const payload = req.body;

    const userExists = await userDao.getUserByEmail({
      email: payload.email,
    });

    // user not found
    if (userExists) {
      throw new Error('User already exists');
    }

    return res.status(200).json({
      message: 'User logged in successfully',
      data: null,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

// exports.userVerification = (req, res) => {

// };

// exports.userTokenResend = (req, res) => {

// };
