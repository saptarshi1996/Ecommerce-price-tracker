import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

import { ResponseHelper } from "../helpers";
import { IUserLogin, IUser } from "../interfaces";

export class AuthController {

  private responseHelper: ResponseHelper;
  
  constructor() {
    this.responseHelper = new ResponseHelper();
  }

  public async userLogin(req: Request, h: ResponseToolkit): Promise<ResponseObject> {

    const userLogin = req.payload as IUserLogin;

    const userExists: IUser = await user.findUnique({
      where: {
        email: userLogin.email,
      },
      select: {
        id: true,
        email: true,
      }
    });

    if (!userExists) {
      return this.responseHelper.error(h, "USERNOTFOUND404");
    }

    return this.responseHelper.success(h, "USERLOGIN200");

  }

}
