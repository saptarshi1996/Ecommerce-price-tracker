import { Request, Response } from "express";

import * as response from '../../helpers/response'

export const listUserProduct = async (req: Request, res: Response) => {
  try {

  } catch (ex) {
    return response.error({
      res,
      ex,
    })
  }
}

export const getUserProduct = async (req: Request, res: Response) => {

}

export const deleteUserProduct = async (req: Request, res: Response) => {

}
