import { PrismaClient } from '@prisma/client'

import IUser from '../interfaces/models/user'
import IUserVerification from '../interfaces/models/user-verification'

const {
  user: User,
  userVerification: UserVerification,
} = new PrismaClient()

export const findUser = ({
  where,
  select,
}: {
  where: Record<string, unknown>,
  select: Record<string, unknown>,
}): Promise<IUser> => new Promise(async (resolve, reject) => {
  try {
    const userFound = await User.findFirst({
      where,
      select,
    })

    resolve(userFound as IUser)
  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})

export const createUser = (data: any): Promise<IUser> => new Promise(async (resolve, reject) => {
  try {
    const createdUser = await User.create({ data: data as any })
    resolve(createdUser as IUser)
  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})

export const updateUser = ({
  where,
  data,
}: {
  where: Record<string, any>,
  data: Record<string, any>,
}, many = false) => new Promise(async (resolve, reject) => {
  try {
    const updatedUser = await many ? User.updateMany({
      where,
      data,
    }) : User.update({
      where,
      data,
    })

    resolve(updatedUser)
  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})

export const findUserVerification = ({
  where,
  select,
}: {
  where: Record<string, unknown>,
  select: Record<string, unknown>,
}) => new Promise(async (resolve, reject) => {
  try {
    const userVerificationFound = await UserVerification.findFirst({
      where,
      select,
    })

    resolve(userVerificationFound as IUserVerification)
  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})

export const createUserVerification = (data: any) => new Promise(async (resolve, reject) => {
  try {

    const userVerificationCreated = await UserVerification.create({
      data,
    })

    resolve(userVerificationCreated)

  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})

export const updateUserVerification = ({
  where,
  data,
}: {
  where: Record<string, unknown>,
  data: Record<string, unknown>,
}, many = false) => new Promise(async (resolve, reject) => {
  try {
    const updatedUserVerification = await many ? UserVerification.updateMany({
      where,
      data,
    }) : UserVerification.update({
      where,
      data,
    })

    resolve(updatedUserVerification)
  } catch (ex: any) {
    reject(new Error(ex.mesage))
  }
})
