const userDao = require('../dao/user');
const authHelper = require('../helpers/auth');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnAuthenticatedError = require('../errors/UnAuthenticatedError');

exports.userLogin = async (req, res) => {
  try {
    const userPayload = req.body;

    const userExists = await userDao.findUser({
      email: userPayload.email,
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists');
    }

    if (!userExists.isVerified) {
      throw new BadRequestError('User not verified');
    }

    const passwordMatch = authHelper.checkPassword({
      password: userPayload.password,
      hash: userExists.password,
    });

    if (!passwordMatch) {
      throw new BadRequestError('Password does not match');
    }

    const token = authHelper.generateToken(userExists.id);
    return res.status(200).json({
      token,
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
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
      throw new BadRequestError('User already exists');
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
    return res.status(ex.statusCode || 500).json({
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
      throw new NotFoundError('User does not exists');
    }

    if (userExists.isVerified) {
      throw new BadRequestError('User already verified');
    }

    // Check if the otp exists for this user.
    const userAuthenticationFound = await userDao.findUserAuthentication({
      userId: userExists.id,
      otp: +otp,
      isRevoked: false,
    });

    if (!userAuthenticationFound) {
      throw new UnAuthe('User Authentication does not exists');
    }

    // Revoke all user authentications
    await userDao.updateUserAuthenticationRevoke({ userId: userExists.id });

    // Now verify the user.
    await userDao.verifyUser({ userId: userExists.id });

    return res.status(200).json({
      message: 'User verified successfully',
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
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
      throw new NotFoundError('User does not exists');
    }

    if (userExists.isVerified) {
      throw new UnAuthenticatedError('User already verified');
    }

    // Revoke all user authentications
    await userDao.updateUserAuthenticationRevoke({ userId: userExists.id });

    // Check date with current date for expiry.
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
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};
