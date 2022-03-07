import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import { success, error } from '../helpers'
import { IUser } from '../interfaces'

export const getUserDetails = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {

    const user = req.user as IUser
    console.log(user)
    return success(h, '')

  } catch (ex) {
    return error(h, 'SERVER500', ex)
  }
}
