export interface IUser {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  isActive?: boolean

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
