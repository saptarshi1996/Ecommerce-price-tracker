import { PrismaClient } from '@prisma/client'

import IUserVerification from '../interfaces/models/userverification.interface'

const { userVerification: UserVerification } = new PrismaClient()

export const getUserVerification = async ({
  where,
  select,
  many = false
}: {
  where: any
  select: any
  many?: boolean
}): Promise<IUserVerification[] | IUserVerification> => {
  return many
    ? await UserVerification.findMany({
      where,
      select
    }) as IUserVerification[]
    : await UserVerification.findFirst({
      where,
      select
    }) as IUserVerification
}

export const createUserVerification = async ({ data }: {
  data: any
}): Promise<IUserVerification> => {
  return await UserVerification.create({ data }) as IUserVerification
}

export const updateUserVerification = async ({
  data,
  where,
  many = false
}: {
  data: any
  where: any
  many?: boolean
}) => {
  return many
    ? await UserVerification.updateMany({
      where,
      data
    })
    : await UserVerification.update({
      where,
      data
    })
}

export const deleteUserVerification = async ({
  where,
  many = false
}: {
  where: any
  many?: boolean
}) => {
  return many
    ? await UserVerification.deleteMany({
      where
    })
    : await UserVerification.delete({
      where
    })
}
