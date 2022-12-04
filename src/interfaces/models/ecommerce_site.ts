import IProduct from "./product"

export default interface IEcommerceSite {
  id?: number

  name?: string

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date

  product: IProduct[]
}
