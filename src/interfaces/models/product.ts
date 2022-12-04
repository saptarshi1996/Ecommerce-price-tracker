import IUserProduct from "./user_product"

export default interface IProduct {
  id?: number

  name?: String
  image_url?: String

  current_price?: number
  lowest_price?: number

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date

  ecommerce_site_id?: number
  link_id?: number

  user_product?: IUserProduct[]
}
