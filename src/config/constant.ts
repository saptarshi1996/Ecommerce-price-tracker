import { config } from 'dotenv'
import { IConstant } from '../interfaces'
config()

export const Constant: IConstant = {

  'environment': {
    'PORT': process.env.PORT,
    'ENV': process.env.ENV,
    'JWT_SECRET': process.env.JWT_SECRET,
  }

}
