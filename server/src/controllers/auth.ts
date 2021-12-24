import { Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client'

import { UserLogin } from "../interfaces";
import { ResponseHelper } from "../helpers";

const { user } = new PrismaClient()

export class AuthController {

  private responseHelper: ResponseHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
  }

  public async userLogin(req: Request, res: Response) {
    try {

      const { email } = req.body as UserLogin;

      const userExists: UserLogin = await user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      // Does the user exists.
      if (!userExists) {
        return this.responseHelper.error(res, "USER404");
      }

      // Check if the user password is correct?
      return this.responseHelper.success(res, "LOGIN200");

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

  public async userRegister(req: Request, res: Response) {
    try {

    } catch (ex) {

    }
  }

}
