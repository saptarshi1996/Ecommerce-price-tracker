import { IStatus } from '../interfaces'

export const productCode: Record<string, IStatus> = {

  PRODUCTCREATE201: {
    message: 'Product created successfully',
    statusCode: 201,
    success: true,
  },

  PRODUCTFETCH200: {

  },

  PRODUCTDELETE204: {
    message: 'Product deleted successfully',
    statusCode: 200,
    success: true,
  },

}
