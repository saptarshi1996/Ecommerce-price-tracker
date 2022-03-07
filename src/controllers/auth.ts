import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { PrismaClient } from '@prisma/client'

import {
  IUser, IUserRegistration,
} from '../interfaces'

import {
  success,
  error,
  comparePassword,
  hashPassword,
  generateOtp,
  createToken,
} from '../helpers'

const prisma = new PrismaClient()

/**
 * User Login
 * @param req Request
 * @param h Response
 * @returns { Promise }
 */
export const userLogin = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const userLoginPayload = req.payload as {
      email: string,
      password: string,
    }

    const userExists: IUser = await prisma.user.findFirst({
      where: {
        email: userLoginPayload.email,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (!userExists) {
      return error(h, 'USERNOTFOUND404')
    }

    // Check if the password is correct
    const passwordValid = comparePassword(userLoginPayload.password, userExists.password)
    if (!passwordValid) {
      return error(h, 'PASSWORDINVALID403')
    }

    // Generate jwt token
    const token = createToken(JSON.stringify({
      id: userExists.id,
    }))

    return success(h, 'USERLOGIN200', {
      token,
    })

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

/**
 * User Registration
 * @param req
 * @param h
 * @returns { Promise }
 */
export const userRegistration = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const userRegister = req.payload as {
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    }

    const userExists: IUser = await prisma.user.findFirst({
      where: {
        email: userRegister.email,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (userExists) {
      return error(h, 'USEREXISTS400')
    }

    // Hash the password
    const hashedPassword = hashPassword(userRegister.password)
    const userModel: IUser = await prisma.user.create({
      data: {
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
        email: userRegister.email,
        password: hashedPassword,
        isActive: false,
      },
    })

    const otp = generateOtp()

    // Create an object for user registration.
    await prisma.userRegistration.create({
      data: {
        otp,
        isRevoked: false,
        userId: userModel.id,
      },
    })

    // Send the otp via mail to user.

    return success(h, 'USERREGISTER200')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

export const userVerification = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const userVerificationPayload = req.payload as {
      email: string,
      otp: number,
    }

    // Check if the user exists and has this otp.
    const userExists: IUser = await prisma.user.findFirst({
      where: {
        email: userVerificationPayload.email,
      },
      select: {
        id: true,
        isActive: true,
      }
    })

    if (!userExists) {
      return error(h, 'USERNOTFOUND404')
    }

    if (userExists.isActive) {
      return error(h, 'USERALREADYACTIVE400')
    }

    const userRegistrationExists = await prisma.userRegistration.findFirst({
      where: {
        otp: userVerificationPayload.otp,
        userId: userExists.id,
        isRevoked: false,
      },
      select: {
        id: true,
      }
    }) as IUserRegistration

    if (!userRegistrationExists) {
      return error(h, '')
    }

    // revoke the user registration object
    await prisma.userRegistration.updateMany({
      data: {
        isRevoked: true,
      },
      where: {
        userId: userExists.id,
      }
    })

    // also user verify the user
    await prisma.user.update({
      data: {
        isActive: true,
      },
      where: {
        id: userExists.id,
      }
    })

    return success(h, 'USERVERIFIED200')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

export const resendVerificationToken = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const resendVerificationObject = req.payload as {
      email: string
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: resendVerificationObject.email,
      },
      select: {
        id: true,
        isActive: true,
      },
    }) as IUser

    // Does the user exists?
    if (!userExists) {
      return error(h, 'USERNOTFOUND404')
    }

    if (!userExists.isActive) {
      return error(h, '')
    }

    // revoke all previous otp.
    await prisma.userRegistration.updateMany({
      data: {
        isRevoked: true,
      },
      where: {
        userId: userExists.id,
      }
    })

    const otp = generateOtp()

    // send the mail to user

    // create a new record in registration
    await prisma.userRegistration.create({
      data: {
        isRevoked: false,
        userId: userExists.id,
        otp,
      },
    })

    return success(h, '')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}
