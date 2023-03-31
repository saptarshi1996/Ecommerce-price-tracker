import * as yup from 'yup'

export default yup.object({
  body: yup.object({
    first_name: yup.string().required().label('First Name'),
    last_name: yup.string().required().label('Last Name'),
    email: yup.string().email().required().label('User Email'),
    password: yup.string().required().label('User Password')
  })
})
