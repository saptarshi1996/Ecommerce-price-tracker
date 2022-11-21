const userDao = require('../dao/user');

const userHelper = require('../helpers/user');
const responseHelper = require('../helpers/response');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

exports.userLogin = async (req, res) => {
  try {
    const userLoginPayload = req.body;

    const userExists = await userDao.findUser({
      where: {
        email: userLoginPayload.email,
      },
      select: {
        id: true,
        password: true,
        is_verified: true,
      }
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists.');
    }

    // Check if user is verified.
    if (!userExists.is_verified) {
      throw new ForbiddenError('User not verified.');
    }

    // Check user password.
    const passwordMatched = userHelper.comparePassword({
      password: userLoginPayload.password,
      hash: userExists.password,
    });

    if (!passwordMatched) {
      throw ForbiddenError('User password invalid.');
    }

    // Create a token for user.
    const token = await userHelper.generateToken({
      id: userExists.id,
    });

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        message: 'User logged in successfully',
        token,
      },
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
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
      }
    });

    if (userExists) {
      throw new BadRequestError('User already exists.');
    }

    // Hash password for user.
    const hash = userHelper.hashPassword({
      password: userRegisterPayload.password,
    });

    // Create new user.
    const userCreated = await userDao.createUser({
      data: {
        first_name: userRegisterPayload.first_name,
        last_name: userRegisterPayload.last_name,
        email: userRegisterPayload.email,
        password: hash,
      },
    });

    // After user is created. Make otp.
    const otp = userHelper.generateOtp();

    const createdAndExpiry = userHelper.getExpiryAndGeneratedTime({
      addedMinutes: 5,
    });

    await userDao.createUserVerification({
      data: {
        user_id: userCreated.id,
        otp,
        created_at: createdAndExpiry.createdAt,
        expired_at: createdAndExpiry.expiredAt,
      },
    });

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        message: 'User registered successfully',
      },
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const verifyUserPayload = req.body;

    // Check if user exists?
    const userExists = await userDao.findUser({
      where: {
        email: verifyUserPayload.email,
      },
      select: {
        id: true,
        is_verified: true,
      }
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists.');
    }

    if (userExists.is_verified) {
      throw new BadRequestError('User already verified');
    }

    // Get user verification with id and otp.
    const userVerificationExists = await userDao.findUserVerification({
      where: {
        otp: +verifyUserPayload.otp,
        user_id: userExists.id,
      },
      select: {
        id: true,
        otp: true,
        is_expired: true,
        is_revoked: true,
      },
    });

    // check if exists, revoked or expired.
    if (!userVerificationExists) {
      throw new NotFoundError('User verification not found');
    }

    if (userVerificationExists.is_revoked) {
      throw new BadRequestError('Otp revoked');
    }

    if (userVerificationExists.is_expired) {
      throw new BadRequestError('Otp expired. Please send another');
    }

    // Verify user and revoke otp.
    await userDao.updateUser({
      where: {
        id: userExists.id,
      },
      data: {
        is_verified: true,
      }
    });

    await userDao.updateUserVerification({
      data: {
        is_expired: true,
        is_revoked: true,
      },
      where: {
        id: userVerificationExists.id,
      }
    }, true);

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        message: 'User verified successfully',
      },
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};

exports.resendToken = async (req, res) => {
  try {
    const resendTokenPayload = req.body;

    // Check if user exists?
    const userExists = await userDao.findUser({
      where: {
        email: resendTokenPayload.email,
      },
      select: {
        id: true,
        is_verified: true,
      }
    });

    if (!userExists) {
      throw new NotFoundError('User does not exists.');
    }

    if (userExists.is_verified) {
      throw new BadRequestError('User already verified');
    }

    // Revoke all old user verification.
    await userDao.updateUserVerification({
      where: {
        user_id: userExists.id,
      },
      data: {
        is_revoked: true,
        is_expired: true,
      }
    }, true);

    // After user is created. Make otp.
    const otp = userHelper.generateOtp();

    const createdAndExpiry = userHelper.getExpiryAndGeneratedTime({
      addedMinutes: 5,
    });

    await userDao.createUserVerification({
      data: {
        user_id: userExists.id,
        otp,
        created_at: createdAndExpiry.createdAt,
        expired_at: createdAndExpiry.expiredAt,
      },
    });

    return responseHelper.success({
      res,
      statusCode: 200,
      body: {
        message: 'User token sent successfully',
      },
    });
  } catch (ex) {
    return responseHelper.error({ res, ex });
  }
};
