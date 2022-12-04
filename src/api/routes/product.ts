import { Router } from 'express'

import * as productController from '../controllers/product'

const router = Router()

router.get('/product', productController.listUserProduct)
router.get('/product/:id', productController.getUserProduct)
router.delete('/product/:id', productController.deleteUserProduct)

export default router
