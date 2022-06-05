import { IUrl } from './urls'

export interface IProduct {

  id?: number
  name?: string
  currentPrice?: number
  lowestPrice?: number
  imageUrl?: string
  isInStock?: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  url?: IUrl

}
