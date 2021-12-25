import { Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client'

import { UserLogin } from "../interfaces";
import { ResponseHelper, UserHelper } from "../helpers";

const { user } = new PrismaClient()

export class AuthController {

  private responseHelper: ResponseHelper;
  private userHelper: UserHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
    this.userHelper = new UserHelper();
  }

  public async userLogin(req: Request, res: Response): Promise<Response> {
    try {

      const { email, password } = req.body as UserLogin;

      const userExists: UserLogin = await user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          is_verified: true,
        },
      });

      // Does the user exists.
      if (!userExists) {
        return this.responseHelper.error(res, "USER404");
      }

      if (userExists && !userExists.is_verified) {
        return this.responseHelper.error(res, "USERNOTVERIFIED403");
      }

      // Check if the user password is correct?
      const passwordValid: boolean = this.userHelper.comparePassword(password, userExists.password);
      if (!passwordValid) { 
        return this.responseHelper.error(res, "USERPASSWORD403");
      }

      // create a new token.
      const token: string = this.userHelper.createToken(JSON.stringify({
        id: userExists.id,
      }));

      return this.responseHelper.success(res, "USERLOGIN200", {
        token,
      });

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

  public async userRegister(req: Request, res: Response): Promise<Response> {
    try {

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

}
