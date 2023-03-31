import * as yup from 'yup'

export default yup.object({
  body: yup.object({
    email: yup.string().email().required().label('User Email'),
    password: yup.string().required().label('User Password')
  })
})
