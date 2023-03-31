import { Router } from 'express'

import {
  userLogin,
  userRegister
} from '../controllers/auth.controller'

import wrapAsync from '../middlewares/wrapasync.middleware'
import validateMiddleware from '../middlewares/validate.middleware'

import loginValidation from '../validations/auth/login.validation'
import registerValidation from '../validations/auth/register.validation'

const router = Router()

router.post('/login', validateMiddleware(loginValidation), wrapAsync(userLogin))
router.post('/register', validateMiddleware(registerValidation), wrapAsync(userRegister))

export default router
