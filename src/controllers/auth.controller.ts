import { Request } from 'express'

import {
  getUser,
  createUser,
  updateUser
} from '../dao/user.dao'

import {
  getUserVerification,
  createUserVerification,
  updateUserVerification
} from '../dao/user-verification.dao'

import NotFoundError from '../errors/notfound.error'
import BadRequestError from '../errors/badrequest.error'

import {
  generateOtp,
  hashPassword,
  generateToken,
  comparePassword
} from '../helpers/auth.helper'

import { addMinutes } from '../helpers/date.helper'

import IUser from '../interfaces/models/user.interface'
import IUserVerification from '../interfaces/models/userverification.interface'

export const userLogin = async (req: Request) => {
  const userLoginPayload = req.body as {
    email: string
    password: string
  }

  // Check if user exists
  const userFound = await getUser({
    where: {
      id: true,
      is_verified: true
    },
    select: {
      id: true,
      is_verified: true,
      password: true
    }
  }) as IUser

  if (!userFound) {
    throw new NotFoundError('User not found.')
  }

  if (!userFound.is_verified) {
    throw new BadRequestError('User not verified.')
  }

  // Check if the password is valid
  const matchPassword = comparePassword({
    hash: userLoginPayload.password,
    password: userFound.password as string
  })

  if (!matchPassword) {
    throw new BadRequestError('Invalid password.')
  }

  // Create new token
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

  // Check if user exists
  const userFound = await getUser({
    where: {
      email: userRegisterPayload.email
    },
    select: {
      id: true
    }
  }) as IUser

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

  // Get date and expiry time to the date
  const createdAt = new Date()
  const expiresAt = addMinutes({
    date: createdAt,
    minute: 30
  })

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

export const verifyUser = async (req: Request) => {
  const userVerifyPayload = req.body as {
    email: string
    otp: number
  }

  // Check if user exists
  const userFound = await getUser({
    where: {
      email: userVerifyPayload.email
    },
    select: {
      id: true,
      is_verified: true
    }
  }) as IUser

  if (!userFound) {
    throw new NotFoundError('User does not exists.')
  }

  if (userFound.is_verified) {
    throw new BadRequestError('User already verified.')
  }

  const userVerificationFound = await getUserVerification({
    where: {
      user_id: userFound.id,
      otp: userVerifyPayload.otp
    },
    select: {
      id: true,
      is_revoked: true,
      is_expired: true
    }
  }) as IUserVerification

  if (!userVerificationFound) {
    throw new NotFoundError('User verification does not exists.')
  }

  if (userVerificationFound.is_expired) {
    throw new BadRequestError('User verification expired.')
  }

  if (userVerificationFound.is_revoked) {
    throw new BadRequestError('User verification revoked.')
  }

  const updateUserPromise = updateUser({
    where: {
      id: userFound.id
    },
    data: {
      is_verified: true
    }
  })

  const updateUserVerificationPromise = updateUserVerification({
    where: {
      user_id: userVerificationFound.user_id
    },
    data: {
      is_expired: true,
      is_revoked: true
    },
    many: true
  })

  await Promise.all([updateUserPromise, updateUserVerificationPromise])
  return { message: 'User verified successfully' }
}

export const resendToken = async (req: Request) => {
  const resendTokenPayload = req.body as {
    email: string
  }

  // Check if user exists
  const userFound = await getUser({
    where: {
      email: resendTokenPayload.email
    },
    select: {
      id: true,
      is_verified: true
    }
  }) as IUser

  if (!userFound) {
    throw new NotFoundError('User does not exists.')
  }

  if (userFound.is_verified) {
    throw new BadRequestError('User already verified.')
  }

  // Revoke all old user verifications
  await updateUserVerification({
    data: {
      is_revoked: true,
      is_expired: true
    },
    where: {
      user_id: userFound.id
    },
    many: true
  })

  const otp = generateOtp()

  const createdAt = new Date()
  const expiresAt = addMinutes({
    date: createdAt,
    minute: 30
  })

  await createUserVerification({
    data: {
      otp,
      is_revoked: false,
      is_expired: false,
      expires_at: expiresAt,
      created_at: createdAt,
      user_id: userFound.id
    }
  })

  return { message: 'User token sent successfully.' }
}

export const resetPassword = async (req: Request) => {
  const { id } = req.user
  const {
    old_password: oldPassword,
    new_password: newPassword
  } = req.body as {
    old_password: string
    new_password: string
  }

  // Check if user exists and password is valid
  const userExists = await getUser({
    where: { id },
    select: {
      id: true,
      is_verified: true,
      password: true
    }
  }) as IUser

  if (!userExists) {
    throw new NotFoundError('User does not exists')
  }

  const passwordValid = comparePassword({
    hash: userExists.password as string,
    password: oldPassword
  })

  if (!passwordValid) {
    throw new BadRequestError('Incorrect password')
  }

  // Check validity of the password and update it
  if (oldPassword === newPassword) {
    throw new BadRequestError('Old password is same as new password')
  }

  await updateUser({
    where: { id },
    data: {
      password: newPassword
    },
    many: true
  })

  return {
    message: 'User password updated successfully'
  }
}
