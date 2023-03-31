import { Request } from 'express'
import { Schema } from 'yup'

import BadRequestError from '../errors/badrequest.error'

import wrapAsync from '../wrappers/async.wrapper'

import environment from '../config/environment.config'

const validateSchemaMiddleware = (schema: Schema) => wrapAsync(async (req: Request) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    })

    return { MIDDLEWARE_SECRET: environment.MIDDLEWARE_SECRET }
  } catch (ex: any) {
    throw new BadRequestError(ex.message)
  }
})

export default validateSchemaMiddleware
