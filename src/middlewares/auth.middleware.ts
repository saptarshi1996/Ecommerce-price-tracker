import { Request } from 'express'

import wrapAsync from './wrapasync.middleware'

import IUser from '../interfaces/models/user.interface'

import { getUser } from '../dao/user.dao'

import { verifyToken } from '../helpers/auth.helper'

import BadRequestError from '../errors/badrequest.error'

const authMiddleware = async (req: Request) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

  const verified = verifyToken(token as string) as IUser

  // Check if user is valid or not.
  const userFound: IUser = await getUser({
    where: {
      id: verified.id
    },
    select: {
      id: true
    }
  })

  if (!userFound) {
    throw new BadRequestError('Invalid token')
  }

  req.user = { id: verified.id }

  return {
    valid: true
  }
}

export default wrapAsync(authMiddleware)
