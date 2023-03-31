import { Request } from 'express'

import {
  getUser,
  createUser
} from '../dao/user.dao'

import {
  createUserVerification
} from '../dao/user-verification.dao'

import NotFoundError from '../errors/notfound.error'
import BadRequestError from '../errors/badrequest.error'

import {
  hashPassword,
  comparePassword,
  generateToken,
  generateOtp
} from '../helpers/auth.helper'

import IUser from '../interfaces/models/user.interface'

import { addMinutes } from '../helpers/date.helper'

export const userLogin = async (req: Request) => {
  const userLoginPayload = req.body as {
    email: string
    password: string
  }

  const userFound = await getUser({
    where: {
      email: userLoginPayload.email
    },
    select: {
      id: true,
      password: true,
      is_verified: true
    }
  }) as IUser

  if (!userFound) {
    throw new NotFoundError('User not found.')
  }

  if (!userFound.is_verified) {
    throw new BadRequestError('User not verified.')
  }

  const matchPassword = comparePassword(userLoginPayload.password, userFound.password as string)
  if (!matchPassword) {
    throw new BadRequestError('Invalid password.')
  }

  const token = generateToken(userFound.id as number)
  return { token }
}

export const userRegister = async (req: Request) => {
  const userRegisterPayload = req.body as {
    first_name: string
    last_name: string
    email: string
    password: string
  }

  const userFound = await getUser({
    where: {
      email: userRegisterPayload.email
    },
    select: {
      id: true
    }
  })

  if (userFound) {
    throw new BadRequestError('User already exists.')
  }

  const hash = hashPassword(userRegisterPayload.password)
  const userCreated = await createUser({
    data: {
      first_name: userRegisterPayload.first_name,
      last_name: userRegisterPayload.last_name,
      email: userRegisterPayload.email,
      password: hash
    }
  })

  const otp = generateOtp()

  const createdAt = new Date()
  const expiresAt = addMinutes(createdAt, 30)

  await createUserVerification({
    data: {
      otp,
      is_revoked: false,
      is_expired: false,
      expires_at: expiresAt,
      created_at: createdAt,
      user_id: userCreated.id
    }
  })

  return { message: 'User registered successfully' }
}
