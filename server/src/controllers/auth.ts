import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

import { ResponseHelper, UserHelper } from "../helpers";
import { IUserLogin, IUser } from "../interfaces";

export class AuthController {

  private userHelper: UserHelper;
  private responseHelper: ResponseHelper;

  constructor() {
    this.userHelper = new UserHelper();
    this.responseHelper = new ResponseHelper();
  }

  public userLogin = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {

    try {
      const userLogin = req.payload as IUserLogin;

      const userExists: IUser = await user.findUnique({
        where: {
          email: userLogin.email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          is_verified: true,
        }
      });

      if (!userExists) {
        return this.responseHelper.error(h, "USERNOTFOUND404");
      }

      if (!userExists.is_verified) {
        return this.responseHelper.error(h, "USERNOTVERIFIED403");
      }

      if (!this.userHelper.checkPassword(userLogin.password, userExists.password)) {
        return this.responseHelper.error(h, "USERINVALIDPASSWORD400");
      }

      // Generate a token for the user.
      const token: string = this.userHelper.createToken(JSON.stringify({
        "id": userExists.id,
      }));

      return this.responseHelper.success(h, "USERLOGIN200");
    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }

  }

}
