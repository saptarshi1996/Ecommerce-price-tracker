import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { config } from 'dotenv'

config()

export const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync())

export const checkPassword = ({
  password,
  hash,
}: {
  password: string,
  hash: string,
}) => bcrypt.compareSync(password, hash)

export const createOtp = () => Math.floor(100000 + Math.random() * 900000)

export const createToken = ({ 
  id
}: { id: number }) => new Promise((resolve, reject) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret)
    resolve(token)
  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})

export const verifyToken = ({
  token,
}: { token: string }) => new Promise((resolve, reject) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)
    resolve(payload)
  } catch (ex: any) {
    reject(new Error(ex.message))
  }
})
