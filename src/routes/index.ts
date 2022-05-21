import { Plugin } from '@hapi/hapi'

import { authRoute } from './auth'
import { userRoute } from './user'
import { productRoute } from './product'

export const routes: Plugin<Record<string, unknown>>[] = [
  authRoute,
  userRoute,
  productRoute,
]
