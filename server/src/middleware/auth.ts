import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";

import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

import { IUser } from "../interfaces";
import { UserHelper, ResponseHelper } from "../helpers";

export class AuthMiddleware {

  private userHelper: UserHelper;
  private responseHelper: ResponseHelper;

  constructor() {
    this.userHelper = new UserHelper();
    this.responseHelper = new ResponseHelper();
  }

  public middleware = (server: Server): any => {

    const userHelper: UserHelper = this.userHelper;
    const responseHelper: ResponseHelper = this.responseHelper;

    return {

      async authenticate(request: Request, h: ResponseToolkit): Promise<ResponseObject | symbol> {
        try {

          const { authorization } = request.headers;
          const decoded: { id: number } = userHelper.verifyToken(authorization) as { id: number };
          const userFound: IUser = await user.findUnique({
            where: {
              id: decoded.id,
            },
            select: {
              id: true,
            }
          });

          if (!userFound) {
            return responseHelper.error(h, "AUTH403").takeover();
          }

          request.user = userFound;
          return h.continue;

        } catch (err) {
          return responseHelper.error(h, "SERVER500", err).takeover();
        }
      },
    }
  }

}
