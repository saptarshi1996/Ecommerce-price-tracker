import { Request, Response, NextFunction } from 'express'

import logger from '../config/logger.config'
import environment from '../config/environment.config'

const wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  const getStatusFromRequest = (method: string): number => {
    switch (method) {
      case 'POST':
        return 201
      case 'PUT':
        return 201
      case 'GET':
        return 200
      case 'DELETE':
        return 200
      default:
        return 200
    }
  }

  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).then((result: any) => {
      // If result has valid: true, it comes from middleware and needs to be passed to next()
      if (result.MIDDLEWARE_SECRET === environment.MIDDLEWARE_SECRET) {
        next()
        return
      }

      const statusCode = getStatusFromRequest(req.method)
      logger.info(`${req.method} | ${req.originalUrl} | ${statusCode}`)

      return res.status(statusCode).json(result)
    }).catch((err) => {
      const statusCode: number = err.statusCode || 500
      logger.error(`${req.method} | ${req.originalUrl} | ${statusCode}`)

      if (!err.statusCode || statusCode === 500) {
        logger.error(err.stack)
      }

      return res.status(statusCode).json({ message: err.message })
    })
  }
}

export default wrapAsync
