import { IStatus } from '../interfaces'

export const authCodes: Record<string, IStatus> = {

  'USERLOGIN200': {
    'message': 'User logged in successfully',
    'statusCode': 200,
    'success': true,
  },

  'USERREGISTER200': {
    'message': 'User registered successfully',
    'statusCode': 200,
    'success': true,
  },

  'USERNOTFOUND404': {
    'message': 'User not found',
    'statusCode': 404,
    'success': false,
  },

  'PASSWORDINVALID403': {
    'message': 'Invalid password',
    'statusCode': 403,
    'success': false,
  },

  'USEREXISTS400': {
    'message': 'User already exists',
    'statusCode': 400,
    'success': false,
  },

  'USERVERIFIED200': {
    'message': 'User verified successfully',
    'statusCode': 200,
    'success': true,
  },

}
