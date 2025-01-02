import { sign, verify } from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcryptjs'

import BadRequestError from '../errors/badrequest.error'

import environment from '../config/environment.config'

const { JWT_SECRET } = environment

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000)

export const hashPassword = (password: string) => hashSync(password, 10)

export const comparePassword = ({
  hash,
  password
}: {
  hash: string
  password: string
}) => compareSync(password, hash)

export const generateToken = (id: number) => sign({ id }, environment.JWT_SECRET, {
  expiresIn: 60 * 60 * 3600
})

export const verifyToken = (token: string) => {
  try {
    const valid = verify(token, JWT_SECRET)
    return valid
  } catch (ex: any) {
    throw new BadRequestError(ex)
  }
}
