import { Plugin, Server, ServerRoute } from '@hapi/hapi'

import {
  userLogin,
  userRegistration,
} from '../controllers'

import {
  userLoginValidation,
  userRegistrationValidation,
} from '../validations'

const tags: string[] = ['api', 'auth']

export const authRoute: Plugin<unknown> = {
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
      }
    ]

    server.route(serverRoute)

  },
}
