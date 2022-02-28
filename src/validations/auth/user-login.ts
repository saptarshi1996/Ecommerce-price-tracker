import Joi from 'joi'

export const userLoginValidation = {
  payload: Joi.object({
    email: Joi.string().email().required().label('User Email'),
    password: Joi.string().required().label('Password')
  })
}
