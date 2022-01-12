import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { PrismaClient } from "@prisma/client";
const { user, userVerification } = new PrismaClient();

import { ResponseHelper, UserHelper } from "../helpers";

import { 
  IUser,
  IUserLogin,
  IUserVerify,
  IUserRegister,
  IUserVerification,
} from "../interfaces";

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

      return this.responseHelper.success(h, "USERLOGIN200", {
        "token": token,
      });

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }

  }

  public userRegister = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {

      const userRegister: IUserRegister = req.payload as IUserRegister;

      const userExists: IUser = await user.findUnique({
        where: {
          email: userRegister.email,
        },
        select: {
          id: true,
        },
      });

      // user already exists.
      if (userExists) {
        return this.responseHelper.error(h, "USERALREADYEXISTS400");
      }

      // Get the hash.
      const hash: string = this.userHelper.hashPassword(userRegister.password);

      // create a new user.
      const userCreated: IUser = await user.create({
        data: {
          first_name: userRegister.first_name,
          last_name: userRegister.last_name,
          email: userRegister.email,
          password: hash,
        }
      });

      const otp: number = this.userHelper.generateOtp();

      // create a record in user verification with the user for future references.
      await userVerification.create({
        data: {
          user_id: userCreated.id,
          is_revoked: false,
          created_at: new Date(),
          otp,
        },
      });

      return this.responseHelper.success(h, "USERREGISTER200");

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }
  }

  public verifyUser = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {

      const { email, otp } = req.payload as IUserVerify;

      // Check if the email exists?
      const userExists: IUser = await user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      // if email exists? then get all the verifications.
      if (!userExists) {
        return this.responseHelper.error(h, "USERNOTFOUND404");
      }

      // Get the verification object with otp.
      const userVerificationFound: IUserVerification = await userVerification.findFirst({
        where: {
          user_id: userExists.id,
          is_revoked: false,
          otp,
        },
        select: {
          id: true,
          user_id: true,
        },
      });

      if (!userVerificationFound) {
        return this.responseHelper.error(h, "USERVERIFICATIONFOUND404");
      }

      await user.update({
        data: {
          is_verified: true,
        },
        where: {
          id: userVerificationFound.user_id,
        },
      })

      await userVerification.update({
        data: { 
          is_revoked: true,
        },
        where: { 
          id: userVerificationFound.id,
        },
      });

      return this.responseHelper.success(h, "USERVERIFIED200");

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }
  }

  public resendToken = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {

      const { email } = req.payload as IUser;

      // Check if the email exists?
      const userExists: IUser = await user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      // if email exists? then get all the verifications.
      if (!userExists) {
        return this.responseHelper.error(h, "USERNOTFOUND404");
      }

      // Revoke all previous tokens. 
      await userVerification.updateMany({
        data: {
          is_revoked: true,
        },
        where: {
          user_id: userExists.id,
        },
      });

      // create a new otp and verification object.
      const otp: number = this.userHelper.generateOtp();

      // create a record in user verification with the user for future references.
      await userVerification.create({
        data: {
          user_id: userExists.id,
          is_revoked: false,
          otp,
        },
      });

      return this.responseHelper.success(h, "USERRESEND200"); 

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }
  }

}
