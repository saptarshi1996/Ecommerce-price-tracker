import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { PrismaClient } from '@prisma/client'

import {
  IUser,
} from '../interfaces'

import {
  success,
  error,
  comparePassword,
  hashPassword,
  generateOtp,
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

    const userLogin = req.payload as {
      email: string,
      password: string,
    }

    const userExists: IUser = await prisma.user.findFirst({
      where: {
        email: userLogin.email,
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
    const passwordValid = comparePassword(userLogin.password, userExists.password)
    if (!passwordValid) {
      return error(h, 'PASSWORDINVALID403')
    }

    return success(h, 'USERLOGIN200')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

/**
 * User Registration
 * @param req
 * @param h
 * @returns
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

    // Create an object for user registration.
    const otp = generateOtp()

    console.log(userModel)
    console.log(otp)

    return success(h, 'USERREGISTER200')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

export const userVerification = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    return success(h, '')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

export const resendVerificationToken = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    return success(h, '')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}
