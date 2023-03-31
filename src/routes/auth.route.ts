import { Router } from 'express'

import {
  userLogin,
  userRegister,
  verifyUser
} from '../controllers/auth.controller'

import wrapAsync from '../wrappers/async.wrapper'
import validateMiddleware from '../middlewares/validate.middleware'

import loginValidation from '../validations/auth/login.validation'
import registerValidation from '../validations/auth/register.validation'
import verifyValidation from '../validations/auth/verify.validation'

const router = Router()

router.post('/login', validateMiddleware(loginValidation), wrapAsync(userLogin))
router.post('/register', validateMiddleware(registerValidation), wrapAsync(userRegister))
router.post('/verify', validateMiddleware(verifyValidation), wrapAsync(verifyUser))

export default router
