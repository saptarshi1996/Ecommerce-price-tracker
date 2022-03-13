import Joi from 'joi'

export const headerValidation = Joi.object({
  authorization: Joi.object({ authorization: Joi.string().required() }).options({ allowUnknown: true })
})
