import { IStatus } from '../interfaces'

export const serverCodes: Record<string, IStatus> = {

  'SERVER500': {
    'message': 'Internal Server Error',
    'statusCode': 500,
    'success': false,
  },

}
