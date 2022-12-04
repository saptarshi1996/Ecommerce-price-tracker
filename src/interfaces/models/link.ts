import IProduct from "./product"

export default interface ILink {
  id?: number
  link?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  product?: IProduct[]
}
