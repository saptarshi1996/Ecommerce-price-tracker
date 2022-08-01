const userDao = require('../dao/user');
const authHelper = require('../helpers/auth');

exports.userLogin = async (req, res) => {
  try {
    const userPayload = req.body;

    const userExists = await userDao.findUser({
      email: userPayload.email,
    });

    if (!userExists) {
      throw new Error('User does not exists');
    }

    if (!userExists.isVerified) {
      throw new Error('User not verified');
    }

    const passwordMatch = authHelper.checkPassword({
      password: userPayload.password,
      hash: userExists.password,
    });

    if (!passwordMatch) {
      throw new Error('Password does not match');
    }

    const token = authHelper.generateToken(userExists.id);
    return res.status(200).json({
      token,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const userPayload = req.body;

    const userExists = await userDao.findUser({
      email: userPayload.email,
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const userObject = {
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
      email: userPayload.email,
      password: authHelper.hashPassword({ password: userPayload.password }),
      isVerified: false,
    };

    const userCreated = await userDao.createUser(userObject);

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 5 * 60000);
    const otp = authHelper.generateOtp();

    const userAuthenticationObject = {
      userId: userCreated.id,
      expiresAt,
      createdAt,
      isRevoked: false,
      otp,
    };

    await userDao.createUserAuthenticatipn(userAuthenticationObject);

    return res.status(200).json({
      message: 'User created successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const {
      otp,
      email,
    } = req.body;

    // From user email get user id.
    const userExists = await userDao.findUser({
      email,
    });

    if (!userExists) {
      throw new Error('User does not exists');
    }

    if (userExists.isVerified) {
      throw new Error('User already verified');
    }

    // Check if the otp exists for this user.
    const userAuthenticationFound = await userDao.findUserAuthentication({
      userId: userExists.id,
      otp: +otp,
      isRevoked: false,
    });

    if (!userAuthenticationFound) {
      throw new Error('User Authentication does not exists');
    }

    // Revoke all user authentications
    await userDao.updateUserAuthenticationRevoke({ userId: userExists.id });

    // Now verify the user.
    await userDao.verifyUser({ userId: userExists.id });

    return res.status(200).json({
      message: 'User verified successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.resendToken = async (req, res) => {
  try {
    const {
      email,
    } = req.body;

    // From user email get user id.
    const userExists = await userDao.findUser({
      email,
    });

    if (!userExists) {
      throw new Error('User does not exists');
    }

    if (userExists.isVerified) {
      throw new Error('User already verified');
    }

    // Revoke all user authentications
    await userDao.updateUserAuthenticationRevoke({ userId: userExists.id });

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 5 * 60000);
    const otp = authHelper.generateOtp();
    const userAuthenticationObject = {
      userId: userExists.id,
      expiresAt,
      createdAt,
      isRevoked: false,
      otp,
    };

    await userDao.createUserAuthenticatipn(userAuthenticationObject);

    return res.status(200).json({
      message: 'User otp sent successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
