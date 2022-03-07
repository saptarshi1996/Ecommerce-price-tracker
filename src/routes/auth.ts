import { Plugin, Server, ServerRoute } from '@hapi/hapi'

import {
  resendVerificationToken,
  userLogin,
  userRegistration,
  userVerification,
} from '../controllers'

import {
  userLoginValidation,
  userRegistrationValidation,
} from '../validations'

const tags: string[] = ['api', 'auth']

export const authRoute: Plugin<Record<string, unknown>> = {

  'name': 'auth',
  'register': (server: Server) => {

    const serverRoute: ServerRoute[] = [
      {
        method: 'POST',
        path: '/auth/login',
        options: {
          description: 'User login',
          auth: false,
          tags,
          handler: userLogin,
          validate: userLoginValidation,
        },
      },
      {
        method: 'POST',
        path: '/auth/register',
        options: {
          description: 'User Registration',
          auth: false,
          tags,
          handler: userRegistration,
          validate: userRegistrationValidation,
        },
      },
      {
        method: 'POST',
        path: '/auth/token/verify',
        options: {
          description: 'User token verification',
          auth: false,
          tags,
          handler: userVerification,
          validate: null,
        },
      },
      {
        method: 'POST',
        path: '/auth/token/resend',
        options: {
          description: 'User token resend',
          auth: false,
          tags,
          handler: resendVerificationToken,
          validate: null,
        },
      },
    ]

    server.route(serverRoute)

  },
}
