import { ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { statusCode } from '../status-codes'
import {
  IResponse,
  IStatus,
} from '../interfaces'

export const success = (h: ResponseToolkit, code: string, data?: Record<string, unknown>): ResponseObject => {

  const responseObject: IResponse = {}
  const statusObject: IStatus = statusCode[code]

  responseObject.status = statusObject

  if (data) {
    responseObject.data = data
  }

  console.log(new Date().toISOString().slice(0, 19).replace('T', ' '), `${h.request.method.toUpperCase()} | ${h.request.url} -> ${statusObject.statusCode}`)
  return h.response(responseObject).code(statusObject.statusCode).takeover()

}

export const error = (h: ResponseToolkit, code: string, err?: any): ResponseObject => {

  const responseObject: IResponse = {}
  const statusObject: IStatus = statusCode[code]

  responseObject.status = statusObject

  if (err) {
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '), code)
    console.log(err)
    responseObject.status.message = err.message
  }

  console.log(new Date().toISOString().slice(0, 19).replace('T', ' '), `${h.request.method.toUpperCase()} | ${h.request.url} -> ${statusObject.statusCode}`)
  return h.response(responseObject).code(statusObject.statusCode).takeover()
}
