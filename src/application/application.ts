import { Server, ServerRegisterPluginObject } from '@hapi/hapi'

import HapiSwagger, { RegisterOptions } from 'hapi-swagger'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'

import { authMiddleware } from '../middlewares'
import { Constant } from '../config'
import { routes } from '../routes'
import { IUser } from '../interfaces'

// Override hapi user
declare module '@hapi/hapi' {
  export interface Request {
    user?: IUser
  }
}

export const Application = async (): Promise<Server> => {

  const PORT: number = +Constant.environment.PORT
  const server: Server = new Server({
    port: PORT,
    routes: {
      cors: true,
    },
  })

  server.auth.scheme('custom', authMiddleware)
  server.auth.strategy('default', 'custom')
  server.auth.default('default')

  const swaggerOptions: RegisterOptions = {
    info: {
      title: 'Ecommerce Tracker API Documentation',
      version: '1.0.0.0',
    },
    grouping: 'tags',
    basePath: '/api',
    documentationPath: '/api/documentation',
    jsonPath: '/api/swagger.json',
    swaggerUIPath: '/api/swagger/ui',
    schemes: Constant.environment.ENV === 'LOCAL' ? ['http'] : ['https'],
  }

  const plugins: Array<ServerRegisterPluginObject<unknown>> = [
    {
      plugin: Inert
    },
    {
      plugin: Vision
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]

  await server.register(plugins)

  await server.register(routes, {
    routes: {
      prefix: '/api'
    }
  })

  try {
    process.on('SIGINT', () => {
      console.log('\nstopping server...')
      process.exit(1)
    })
  } catch (ex) {
    console.log(ex)
    process.exit(1)
  }

  console.log(`Server on port ${PORT}`)
  await server.start()

  return server

}
