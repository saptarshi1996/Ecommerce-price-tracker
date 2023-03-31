import * as yup from 'yup'

export default yup.object({
  body: yup.object({
    email: yup.string().email().required().label('User Email'),
    otp: yup.number().required().label('User otp')
  })
})
