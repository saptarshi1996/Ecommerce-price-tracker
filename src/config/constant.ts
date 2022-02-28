import { config } from 'dotenv'
config()

export const Constant: Record<string, Record<string, unknown>> = {

  'environment': {
    'PORT': process.env.PORT,
    'ENV': process.env.ENV,
  }

}
