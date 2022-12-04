import { Router } from 'express'

import * as userController from '../controllers/user'

const router = Router()

router.get('/userDetails', userController.getUserDetails)

export default router
