import { Request, Response, NextFunction } from "express"

import * as userDao from '../../dao/user'

import * as response from '../../helpers/response'
import * as userHelper from '../../helpers/user'

import NotFoundError from "../../errors/NotFoundError"

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers

    const payload: {
      id: number,
    } = await userHelper.verifyToken({ token: authorization as string }) as {
      id: number,
    }

    const userExists = await userDao.findUser({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
      }
    })

    if (!userExists) {
      throw new NotFoundError('User does not exists')
    }

    req.user = userExists
    return next()
  } catch (ex: any) {
    return response.error({
      res,
      ex,
    })
  }
}
