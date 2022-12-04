import { Response } from 'express'

export const success = ({ res, statusCode, body }: {
  res: Response,
  statusCode: number,
  body: Record<string, unknown>
}) => {
  return res.status(statusCode).json(body)
}

export const error = ({ res, ex }: {
  res: Response,
  ex: any,
}) => {

  console.log(ex.stack)

  const statusCode: number = ex.statusCode || 500
  return res.status(statusCode).json({
    message: ex.message,
  })
}
