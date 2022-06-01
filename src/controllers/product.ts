import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import { PrismaClient } from '@prisma/client'

import {
  error,
  success,
} from '../helpers'

import {
  IUser,
} from '../interfaces'

const prisma = new PrismaClient()

/**
 * Create a new product from url
 * @param req Request
 * @param h Response
 * @returns Promise
 */
export const createNewProduct = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    return success(h, '')
  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

/**
 * List product by user
 * @param req Request
 * @param h Response
 * @returns Promise
 */
export const listProduct = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const user = req.user as IUser

    return success(h, '')
  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

/**
 * Get product by id
 * @param req Request
 * @param h Response
 * @returns Promise
 */
export const getProductById = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const { id } = req.params

    return success(h, '')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

/**
 * Update a product
 * @param req Request
 * @param h Response
 * @returns Promise
 */
export const updateProduct = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    return success(h, '')
  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}

/**
 * Delete a product of a user
 * @param req Request
 * @param h Response
 * @returns Promise
 */
export const deleteProduct = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    return success(h, '')
  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}
