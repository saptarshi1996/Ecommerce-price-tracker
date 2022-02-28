import Joi from 'joi'

export const userRegistrationValidation = {
  payload: Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('User Email'),
    password: Joi.string().required().label('Password'),
  })
}
