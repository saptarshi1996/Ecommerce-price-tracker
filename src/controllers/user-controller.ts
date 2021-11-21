import { Request, Response } from "express";

import { User } from "../models";
import { UserHelper, ResponseHelper } from "../helpers";
import {
  IUser,
  IUserLogin,
  IUserRegister
} from "../interfaces";

export class UserController {

  private readonly userHelper: UserHelper;
  private readonly responseHelper: ResponseHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
    this.userHelper = new UserHelper();
  }

  userLogin = async (req: Request, res: Response) => {
    try {

      const userLoginPayload = req.body as IUserLogin;

      // Check if user exists?
      const userExists: IUser = await User.findOne({
        where: {
          email: userLoginPayload.email,
        },
        raw: true,
        attributes: ['id', 'password'],
      });

      if (!userExists) {
        return this.responseHelper.error(res, "USERNOTFOUND404");
      }

      // Is the password valid?
      if (!this.userHelper.comparePassword(userLoginPayload.password, userExists.password)) {
        return this.responseHelper.error(res, "PASSWORDINVALID403");
      }

      // Generate token
      const payload: Object | any = {
        id: userExists.id,
      };

      const token: string = this.userHelper.generateToken(payload);

      // Return response token
      return this.responseHelper.success(res, "USERLOGIN200", { token: token });

    } catch (ex) {

      return this.responseHelper.error(res, "SERVER500", ex);

    }
  }

  userRegister = async (req: Request, res: Response) => {
    try {

      const userRegisterPayload = req.body as IUserRegister;

      // Check if user exists?
      const userExists = await User.findOne({
        where: {
          email: userRegisterPayload.email,
        },
        raw: true,
        attributes: ['id'],
      });

      if (userExists) {
        return this.responseHelper.error(res, "USEREXISTS400");
      }

      const hashString: string = this.userHelper.hashPassword(userRegisterPayload.password);

      await User.create({
        first_name: userRegisterPayload.first_name,
        last_name: userRegisterPayload.last_name,
        email: userRegisterPayload.email,
        password: hashString,
      });

      return this.responseHelper.success(res, "USEREGISTER200");

    } catch (ex) {

      return this.responseHelper.error(res, "SERVER500");

    }
  }

  getUserDetails = async (req: Request | any, res: Response) => {
    try {

      const user: IUser = req.user as any;
      const userDetails: IUser = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt', 'password'],
        },
        raw: true,
      });

      return this.responseHelper.success(res, "USERDETAILS200", {
        user: userDetails,
      })

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500");
    }
  }

}
