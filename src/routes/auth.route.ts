import { Router } from 'express'

import {
  userLogin,
  verifyUser,
  resendToken,
  userRegister
} from '../controllers/auth.controller'

import wrapAsync from '../wrappers/async.wrapper'
import validateMiddleware from '../middlewares/validate.middleware'

import loginValidation from '../validations/auth/login.validation'
import registerValidation from '../validations/auth/register.validation'
import verifyValidation from '../validations/auth/verify.validation'
import resendTokenValidation from '../validations/auth/resend.validation'

const router = Router()

router.post('/login', validateMiddleware(loginValidation), wrapAsync(userLogin))
router.post('/register', validateMiddleware(registerValidation), wrapAsync(userRegister))
router.post('/verify', validateMiddleware(verifyValidation), wrapAsync(verifyUser))
router.post('/resend', validateMiddleware(resendTokenValidation), wrapAsync(resendToken))

export default router
