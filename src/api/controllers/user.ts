import { Request, Response } from 'express'

import * as response from '../../helpers/response'

import * as userDao from '../../dao/user'

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userExists = await userDao.findUser({
      where: {
        id: +(req.user?.id as number),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      }
    })

    return response.success({
      res,
      statusCode: 200,
      body: {
        user: userExists,
      },
    })
  } catch (ex) {
    return response.error({
      res,
      ex,
    })
  }
}
