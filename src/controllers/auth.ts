import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { PrismaClient } from '@prisma/client'

import {
  IUser,
} from '../interfaces'
import { success, error } from '../helpers'

const primsa = new PrismaClient()

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

    const userExists: IUser = await primsa.user.findFirst({
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

    const userExists: IUser = await primsa.user.findFirst({
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

    return success(h, 'USERREGISTER200')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}
