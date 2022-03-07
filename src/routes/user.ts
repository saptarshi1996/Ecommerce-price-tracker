import { Plugin, Server, ServerRoute } from '@hapi/hapi'

import { userDetailsValidation } from '../validations'
import { getUserDetails } from '../controllers'

const tags: string[] = ['api', 'user']

export const userRoute: Plugin<Record<string, unknown>> = {

  'name': 'user',
  'register': (server: Server) => {

    const routes: ServerRoute[] = [
      {
        method: 'GET',
        path: '/user/details',
        options: {
          auth: 'default',
          description: 'Get user details',
          tags,
          handler: getUserDetails,
          validate: userDetailsValidation,
        },
      }
    ]

    server.route(routes)

  },

}
