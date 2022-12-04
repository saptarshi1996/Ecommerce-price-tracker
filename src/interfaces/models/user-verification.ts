export default interface IUserVerification {
  id?: number
  otp?: number
  is_expired?: Boolean
  is_revoked?: Boolean
  expired_at?: Date
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date

  user_id?: number
}
