import IUserVerification from "./user-verification"
import IUserProduct from "./user_product"

export default interface IUser {
  id?: number
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  is_verified?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date

  user_verification?: IUserVerification[]
  user_product?: IUserProduct[]
}
