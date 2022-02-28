import { Plugin } from '@hapi/hapi'
import { authRoute } from './auth'

export const routes: Plugin<unknown>[] = [
  authRoute,
]
