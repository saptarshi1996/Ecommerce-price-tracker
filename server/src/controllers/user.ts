import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

import { IUser } from "../interfaces";
import { ResponseHelper } from "../helpers";

export class UserController {

  private responseHelper: ResponseHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
  }

  public userDetails = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {

      const { id } = req.user as IUser;
      const userDetails: IUser = await user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      });

      return this.responseHelper.success(h, "USERDETAILS200", {
        "user": userDetails,
      });

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }
  }
}
