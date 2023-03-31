import { PrismaClient } from '@prisma/client'

import IUser from '../interfaces/models/user.interface'

const {
  user: User
} = new PrismaClient()

export const getUser = async ({
  where,
  select,
  many = false
}: {
  where: any
  select: any
  many?: boolean
}): Promise<IUser[] | IUser> => {
  return many
    ? await User.findMany({
      where,
      select
    }) as IUser[]
    : await User.findFirst({
      where,
      select
    }) as IUser
}

export const createUser = async ({
  data
}: {
  data: any
}): Promise<IUser> => {
  return await User.create({ data }) as IUser
}

export const updateUser = async ({
  data,
  where,
  many = false
}: {
  data: any
  where: any
  many?: boolean
}) => {
  return many
    ? await User.updateMany({
      where,
      data
    })
    : await User.update({
      where,
      data
    })
}

export const deleteUser = async ({
  where,
  many = false
}: {
  where: any
  many?: boolean
}) => {
  return many
    ? await User.deleteMany({
      where
    })
    : await User.delete({
      where
    })
}
