import { Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client';

import { UserLogin, UserRegiser, IUser } from "../interfaces";
import { ResponseHelper, UserHelper } from "../helpers";

const { user, userVerification } = new PrismaClient();

export class AuthController {

  private responseHelper: ResponseHelper;
  private userHelper: UserHelper;

  constructor() {
    console.log("auth")
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

      const { first_name, last_name, email, password } = req.body as UserRegiser;

      // Check if the user exists?
      const userExists: UserRegiser = await user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (userExists) {
        return this.responseHelper.error(res, "USEREXISTS400");
      }

      // create a new user with hashed password.
      const hashedPassword: string = this.userHelper.hashPassword(password);
      const userCreated = await user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
        }
      });

      console.log(userCreated);

      // Using pk of user created it to the user verifications.

      return this.responseHelper.success(res, "USERREGISTER200");

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

  public async verifyUser(req: Request, res: Response) { 

    try { 

      const { email } = req.body as { email: string };

      // check if the user email is valid?
      const userExists: IUser = await user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        }
      });

      if (!userExists) {
        return this.responseHelper.error(res, "USERVERIFICATION404");
      }

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }

  }

  public async resendUserToken(req: Request, res: Response) {
    try {

      const { email } = req.body;

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

}
