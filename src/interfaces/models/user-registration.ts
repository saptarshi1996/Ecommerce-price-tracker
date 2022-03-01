import { IUser } from './user'

export interface IUserRegistration {

  id?: number
  otp?: number
  isRevoked?: boolean
  expiresAt?: boolean

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  user?: IUser

}
