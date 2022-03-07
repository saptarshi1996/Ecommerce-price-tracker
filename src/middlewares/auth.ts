import { ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { PrismaClient } from '@prisma/client'
const primsa = new PrismaClient()

import { IUser } from '../interfaces'
import { error, verifyToken } from '../helpers'

export const authMiddleware = () => {

  return {

    authenticate: async (request: any, h: ResponseToolkit): Promise<ResponseObject | symbol> => {
      try {

        const { authorization } = request.headers as any

        const token = verifyToken(authorization)
        const tokenObject = JSON.parse(token as string) as {
          id: number
        }

        const userExists = await primsa.user.findFirst({
          where: { id: tokenObject.id },
          select: {
            id: true,
          }
        }) as IUser

        if (!userExists) {
          return error(h, 'AUTH403')
        } else {
          request.user = userExists
          return h.continue
        }

      } catch (err) {
        return error(h, 'SERVER500', err)
      }
    },
  }
}
