import { authCodes } from './auth-codes'
import { serverCodes } from './server-codes'

export const statusCode: Record<string, unknown> = {
  ...authCodes,
  ...serverCodes,
}
