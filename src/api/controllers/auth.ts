import { Request, Response } from 'express'

import * as response from '../../helpers/response'

import * as userDao from '../../dao/user'

import * as dateHelper from '../../helpers/date'
import * as userHelper from '../../helpers/user'
import * as queueHelper from '../../helpers/queue'

import IUser from '../../interfaces/models/user'
import IUserVerification from '../../interfaces/models/user-verification'

import BadRequestError from '../../errors/BadRequestError'
import NotFoundError from '../../errors/NotFoundError'

export const userLogin = async (req: Request, res: Response) => {
  try {
    const userLoginPayload: {
      email: string,
      password: string,
    } = req.body

    const userExists: IUser = await userDao.findUser({
      where: {
        email: userLoginPayload.email,
      },
      select: {
        id: true,
        password: true,
        is_verified: true,
      },
    })

    if (!userExists) {
      throw new NotFoundError('User does not exists')
    }

    if (userExists && !userExists.is_verified) {
      throw new BadRequestError('User not verified')
    }

    const verifyPassword = userHelper.checkPassword({
      password: userLoginPayload.password,
      hash: userExists.password as string,
    })

    if (!verifyPassword) {
      throw new BadRequestError('User password does not match')
    }

    // generate token for user.
    const token = await userHelper.createToken({ id: userExists.id as number })
    return response.success({
      res,
      statusCode: 200,
      body: {
        token,
      },
    })

  } catch (ex) {
    return response.error({
      res,
      ex,
    })
  }
}

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userRegisterPayload: {
      first_name: string,
      last_name: string,
      email: string,
      password: string,
    } = req.body

    const userExists = await userDao.findUser({
      where: {
        email: userRegisterPayload.email,
      },
      select: {
        id: true,
      },
    })

    if (userExists) {
      throw new BadRequestError('User already exists')
    }

    const hash = userHelper.hashPassword(userRegisterPayload.password)

    const userCreated = await userDao.createUser({
      first_name: userRegisterPayload.first_name,
      last_name: userRegisterPayload.last_name,
      email: userRegisterPayload.email,
      password: hash,
    })

    const otp = userHelper.createOtp()

    const {
      createdAt,
      expiredAt,
    } = dateHelper.getCreatedAndExpiredDate(5)

    // Create an otp for user using this id/
    await userDao.createUserVerification({
      user_id: userCreated.id,
      expired_at: expiredAt,
      created_at: createdAt,
      otp,
    })

    queueHelper.sendMessageToQueue({
      name: 'SendMail', 
      data: {
        otp: otp
      },
    })

    return response.success({
      res,
      statusCode: 200,
      body: {
        message: 'User registered successfully',
      },
    })
  } catch (ex) {
    return response.error({
      res,
      ex,
    })
  }
}

export const userVerify = async (req: Request, res: Response) => {
  try {
    const userVerifyPayload = req.body as {
      email: string,
      otp: number,
    }

    // Check if email exists
    const userExists = await userDao.findUser({
      where: {
        email: userVerifyPayload.email,
      },
      select: {
        id: true,
        is_verified: true,
      },
    })

    if (!userExists) {
      throw new NotFoundError('User does not exists')
    }

    const userVerificationExists = await userDao.findUserVerification({
      where: {
        user_id: userExists.id,
        otp: userVerifyPayload.otp,
      },
      select: {
        id: true,
        is_revoked: true,
        is_expired: true,
      }
    }) as IUserVerification

    if (!userVerificationExists) {
      throw new NotFoundError('User verification does not exists.')
    }

    if (userVerificationExists && userVerificationExists.is_revoked) {
      throw new BadRequestError('User verification revoked')
    }

    if (userVerificationExists && userVerificationExists.is_expired) {
      throw new BadRequestError('User verification expired')
    }

    // Verify user and revoke token.
    const updateUserPromise = userDao.updateUser({
      data: {
        is_verified: true,
      },
      where: {
        id: userExists.id,
      },
    })

    // Revoke user token.
    const updateUserVerificationPromise = userDao.updateUserVerification({
      data: {
        is_revoked: true,
        is_expired: true,
      },
      where: {
        id: userVerificationExists.id,
      }
    })

    await Promise.all([updateUserPromise, updateUserVerificationPromise])

    return response.success({
      res,
      statusCode: 200,
      body: {
        message: 'User verified successfully',
      },
    })
  } catch (ex) {
    return response.error({
      res,
      ex,
    })
  }
}

export const resendToken = async (req: Request, res: Response) => {
  try {
    const resendTokenPayload: {
      email: string,
    } = req.body

    // Check if email exists
    const userExists = await userDao.findUser({
      where: {
        email: resendTokenPayload.email,
      },
      select: {
        id: true,
        is_verified: true,
      },
    })

    if (!userExists) {
      throw new NotFoundError('User does not exists')
    }

    // revoke all old tokens.
    await userDao.updateUserVerification({
      data: {
        is_revoked: true,
        is_expired: true,
      },
      where: {
        user_id: userExists.id,
      }
    }, true)

    const otp = userHelper.createOtp()

    const {
      createdAt,
      expiredAt,
    } = dateHelper.getCreatedAndExpiredDate(5)

    // Create an otp for user using this id/
    await userDao.createUserVerification({
      user_id: userExists.id,
      expired_at: expiredAt,
      created_at: createdAt,
      otp,
    })

    return response.success({
      res,
      statusCode: 200,
      body: {
        message: 'User token sent successfully',
      },
    })
  } catch (ex) {
    return response.error({
      res,
      ex,
    })
  }
}
