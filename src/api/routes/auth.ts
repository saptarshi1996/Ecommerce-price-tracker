import { Router } from 'express'

import * as authController from '../controllers/auth'

const router = Router()

router.post('/login', authController.userLogin)
router.post('/register', authController.userRegister)
router.post('/verify', authController.userVerify)
router.post('/resend', authController.resendToken)

export default router
