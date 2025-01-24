import { Request } from 'express'

import {
  getUser
} from '../dao/user.dao'
import NotFoundError from '../errors/notfound.error'

export const fetchUser = async (req: Request) => {
  const { id } = req.user

  const userExists = await getUser({
    where: {
      id
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true

    }
  })

  if (!userExists) {
    throw new NotFoundError('User does not exists')
  }

  return {
    user: userExists
  }
}

export const userUpdate = async (req: Request) => {}
