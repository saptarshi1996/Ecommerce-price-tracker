import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { success, error } from '../helpers'
import { IUser } from '../interfaces'

export const getUserDetails = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const { id } = req.user as IUser

    const userExists = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
      }
    }) as IUser

    return success(h, '', {
      'user': userExists,
    })

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}
