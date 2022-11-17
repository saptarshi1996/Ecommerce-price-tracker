const userDao = require('../dao/user');

const dateHelper = require('../helpers/date');
const userHelper = require('../helpers/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnAuthenticatedError = require('../errors/UnAuthenticatedError');

exports.userLogin = async (req, res) => {
  try {
    const loginPayload = req.body;

    const userExists = await userDao.findUser({
      where: {
        email: loginPayload.email,
      },
      select: {
        id: true,
        password: true,
        is_verified: true,
      },
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists');
    }

    if (userExists && !userExists.is_verified) {
      throw new UnAuthenticatedError('User not verified');
    }

    const passwordMatch = userHelper.comparePassword({
      password: loginPayload.password,
      hash: userExists.password,
    });

    if (!passwordMatch) {
      throw new UnAuthenticatedError('Password Invalid');
    }

    const token = await userHelper.generateToken({
      id: userExists.id,
    });

    return res.status(200).json({
      message: 'User Logged in successfully',
      data: {
        token,
      },
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message || 'Internal Server Error'
    });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const userRegisterPayload = req.body;

    const userExists = await userDao.findUser({
      where: {
        email: userRegisterPayload.email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (userExists) {
      throw new BadRequestError('User already exists');
    }

    const hashedPassword = userHelper.hashPassword({
      password: userRegisterPayload.password,
    });

    const userCreated = await userDao.createUser({
      data: {
        first_name: userRegisterPayload.first_name,
        last_name: userRegisterPayload.last_name,
        email: userRegisterPayload.email,
        password: hashedPassword,
      },
    });

    const otp = userHelper.generateOtp();
    const createTimeAndExpireTime = dateHelper.setCreateAndExpireTime();

    await userDao.createUserVerification({
      data: {
        user_id: userCreated.id,
        created_at: createTimeAndExpireTime.createdAt,
        expires_at: createTimeAndExpireTime.expiresAt,
        otp,
      },
    });

    return res.status(200).json({
      message: 'User registered successfully',
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message || 'Internal Server Error',
    });
  }
};

exports.userVerificationToken = async (req, res) => {
  try {
    const userVerificationPayload = req.body;

    const userExists = await userDao.findUser({
      where: {
        email: userVerificationPayload.email,
      },
      select: {
        id: true,
        email: true,
        is_verified: true,
      },
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists');
    }

    // If the user exists. Check if they are verified or not.
    if (userExists.is_verified) {
      throw new BadRequestError('User already verified');
    }

    const verificationExists = await userDao.findUserVerification({
      where: {
        user_id: userExists.id,
        otp: +userVerificationPayload.otp,
      },
      select: {
        id: true,
        is_revoked: true,
        is_expired: true,
      },
    });

    if (!verificationExists) {
      throw new NotFoundError('Verification does not exists');
    }

    if (verificationExists.is_revoked) {
      throw new BadRequestError('Token revoked.');
    }

    if (verificationExists.is_expired) {
      throw new BadRequestError('Token expired.');
    }

    // If the token exists and has not expired or revoked.
    // then verify the user.
    await userDao.updateUserVerification({
      data: {
        is_revoked: true,
        is_expired: true,
      },
      where: {
        user_id: userExists.id,
      },
      many: true,
    });

    await userDao.updateUser({
      data: {
        is_verified: true,
      },
      where: {
        id: userExists.id,
      },
    });

    return res.status(200).json({
      message: 'User verified successfully',
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message || 'Internal Server Error',
    });
  }
};

exports.resendToken = async (req, res) => {
  try {
    const resendTokenPayload = req.body;

    // Check if the user exists with this email.
    const userExists = await userDao.findUser({
      where: {
        email: resendTokenPayload.email,
      },
      select: {
        id: true,
        is_verified: true,
      },
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists');
    }

    // If the user exists. Check if they are verified or not.
    if (userExists.is_verified) {
      throw new BadRequestError('User already verified');
    }

    // Revoke all old user token
    await userDao.updateUserVerification({
      data: {
        is_revoked: true,
        is_expired: true,
      },
      where: {
        user_id: userExists.id,
      },
      many: true,
    });

    const otp = userHelper.generateOtp();
    const createTimeAndExpireTime = dateHelper.setCreateAndExpireTime();

    await userDao.createUserVerification({
      data: {
        user_id: userExists.id,
        created_at: createTimeAndExpireTime.createdAt,
        expires_at: createTimeAndExpireTime.expiresAt,
        otp,
      },
    });

    return res.status(200).json({
      message: 'User token resent successfully',
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message || 'Internal Server Error',
    });
  }
};
