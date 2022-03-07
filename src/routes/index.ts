import { Plugin } from '@hapi/hapi'

import { authRoute } from './auth'
import { userRoute } from './user'

export const routes: Plugin<Record<string, unknown>>[] = [
  authRoute,
  userRoute
]
