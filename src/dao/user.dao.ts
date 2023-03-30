import { PrismaClient } from '@prisma/client'

import IUser from '../interfaces/models/user.interface'

const {
  user: User
} = new PrismaClient()

export const getUser = async ({
  where,
  select
}: {
  where: any
  select: any
}): Promise<IUser> => {
  return await User.findFirst({
    where,
    select
  }) as IUser
}
