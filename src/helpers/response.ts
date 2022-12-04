import { Response } from 'express'

export const success = ({
  res,
  statusCode,
  body,
}: {
  res: Response,
  statusCode: number,
  body: Record<string, unknown>
}) => {

}

export const error = ({
  res,
  ex,
}: {
  res: Response,
  ex: any,
}) => {
  const statusCode: number = ex.statusCode || 500
  return res.status(statusCode).json({
    message: ex.message,
  })
}
