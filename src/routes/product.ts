import {
  Plugin,
  Server,
  ServerRoute,
} from '@hapi/hapi'

import {
  createNewProduct,
  updateProduct,
  listProduct,
  deleteProduct,
} from '../controllers'

const tags = ['api', 'product']

export const productRoute: Plugin<Record<string, unknown>> = {
  name: 'product',
  register: (server: Server) => {
    const serverRoute: ServerRoute[] = [
      {
        method: 'POST',
        path: '/product/create',
        options: {
          description: 'Create new product',
          auth: 'default',
          tags,
          handler: createNewProduct,
        },
      },
      {
        method: 'GET',
        path: '/product/list',
        options: {
          description: 'List products',
          auth: 'default',
          tags,
          handler: listProduct,
        },
      },
      {
        method: 'PUT',
        path: '/product/update/{id}',
        options: {
          description: 'Update product',
          auth: 'default',
          tags,
          handler: updateProduct,
        },
      },
      {
        method: 'DELETE',
        path: '/product/delete/{id}',
        options: {
          description: 'delete product',
          auth: 'default',
          tags,
          handler: deleteProduct,
        }
      },
    ]

    server.route(serverRoute)

  }
}
