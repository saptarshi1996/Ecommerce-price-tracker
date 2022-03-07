import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

import { Constant } from '../config'

export const hashPassword = (password: string): string => {
  return hashSync(password, genSaltSync(10))
}

export const comparePassword = (password: string, hash: string): boolean => {
  return compareSync(password, hash)
}

export const generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const createToken = (payload: string): string => {
  return sign(payload, Constant.environment.JWT_SECRET, {
    expiresIn: '1d'
  })
}

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    return verify(token, Constant.environment.JWT_SECRET)
  } catch (ex) {
    throw new Error(ex.message)
  }
}
