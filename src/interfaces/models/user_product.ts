export default interface IUserProduct {
  id?: number

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date

  user_id: number
  product_id: number
}
