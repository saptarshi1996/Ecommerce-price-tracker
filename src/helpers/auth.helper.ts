import {
  verify
} from 'jsonwebtoken'

import BadRequestError from '../errors/badrequest.error'

import environment from '../config/environment.config'

export function verifyToken (token: string) {
  try {
    const valid = verify(token, environment.JWT_SECRET)
    return valid
  } catch (ex: any) {
    throw new BadRequestError(ex)
  }
}
