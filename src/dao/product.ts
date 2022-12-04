import { PrismaClient } from '@prisma/client'

import IProduct from '../interfaces/models/product'

const {
  product: Product
} = new PrismaClient()
