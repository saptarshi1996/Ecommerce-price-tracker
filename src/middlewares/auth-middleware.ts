import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces";
import { User } from "../models";
import { UserHelper, ResponseHelper } from "../helpers";

export class AuthMiddleware {

  private readonly userHelper: UserHelper;
  private readonly responseHelper: ResponseHelper;

  constructor() {
    this.userHelper = new UserHelper();
    this.responseHelper = new ResponseHelper();
  }

  verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { authorization } = req.headers;
      const token: string = authorization;

      const parsed: any = this.userHelper.decodeToken(token);
      const userDetails: IUser = await User.findOne({
        where: {
          id: parsed.id,
        },
        raw: true,
        attributes: ['id'],
      });

      if (!userDetails) {
        return this.responseHelper.error(res, "UNAUTHACCESS403");
      } else {
        req.user = userDetails;
        next();
      }

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

}
