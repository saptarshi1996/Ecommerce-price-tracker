import { Request, Response } from "express";

import { User, UserVerification } from "../models";
import { UserHelper, ResponseHelper, DateHelper } from "../helpers";
import {
  IUser,
  IUserLogin,
  IUserRegister,
  IVerifyUser,
  IResendToken,
} from "../interfaces";

export class UserController {

  private readonly userHelper: UserHelper;
  private readonly responseHelper: ResponseHelper;
  private readonly dateHelper: DateHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
    this.dateHelper = new DateHelper();
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
        attributes: ['id', 'password', 'is_verified'],
      });

      if (!userExists) {
        return this.responseHelper.error(res, "USERNOTFOUND404");
      }

      if (userExists && !userExists.is_verified) {
        return this.responseHelper.error(res, "USERNOTVERIFIED401");
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

      const userCreated: IUser = await User.create({
        first_name: userRegisterPayload.first_name,
        last_name: userRegisterPayload.last_name,
        email: userRegisterPayload.email,
        password: hashString,
        is_verified: false,
      });

      const otp: number = this.userHelper.generateOtp();
      const expiryDate: Date = this.dateHelper.addMinutesToCurrentDate(30);
      await UserVerification.create({
        otp,
        user_id: userCreated.id,
        is_revoked: false,
        expires_at: expiryDate,
      })

      return this.responseHelper.success(res, "USEREGISTER200");

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

  verifyUser = async (req: Request, res: Response) => {
    try {

      const verifyUserPayload = req.body as IVerifyUser;

      // Check if the user exists and is not verified.
      const userExists = await User.findOne({
        where: {
          email: verifyUserPayload.email,
        },
        raw: true,
        attributes: ['id', 'is_verified'],
      });

      if (!userExists) {
        return this.responseHelper.error(res, "USERNOTFOUND404");
      }

      if (userExists && userExists.is_verified) {
        return this.responseHelper.error(res, "USERALREADYVERIFIED400");
      }

      // Get the verification data using user id
      const verificationExists = await UserVerification.findOne({
        where: {
          otp: verifyUserPayload.otp,
          user_id: userExists.id,
          is_revoked: false,
        },
        raw: true,
        attributes: ['id'],
      });

      if (!verificationExists) {
        return this.responseHelper.error(res, "USERVERIFICATIONNOTFOUND404");
      }

      // Update verification data and verify user.
      const verifyUserPromise = User.update({
        is_verified: true,
      }, {
        where: {
          id: userExists.id,
        }
      });

      const revokeOtpPromise = UserVerification.update({
        is_revoked: true,
      }, {
        where: { 
          id: verificationExists.id,
        }
      });

      await Promise.all([verifyUserPromise, revokeOtpPromise]);

      return this.responseHelper.success(res, "USERVERIFIED200");

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

  resendToken = async (req: Request, res: Response) => {
    try {

      const resendTokenPayload: IResendToken = req.body as IResendToken;

      // Check if user exists by this email.
      const userExists = await User.findOne({
        where: {
          email: resendTokenPayload.email
        },
        raw: true,
        attributes: ['id', 'is_verified'],
      });

      if (!userExists) {
        return this.responseHelper.error(res, "USERNOTFOUND404");
      }

      if (userExists && userExists.is_verified) {
        return this.responseHelper.error(res, "USERALREADYVERIFIED400");
      }

      // Revoke all the tokens for the user.
      await UserVerification.update({
        is_revoked: true,
      }, {
        where: {
          user_id: userExists.id,
        }
      });

      // Create a new record.
      const otp: number = this.userHelper.generateOtp();
      const expiryDate: Date = this.dateHelper.addMinutesToCurrentDate(30);
      await UserVerification.create({
        otp,
        user_id: userExists.id,
        is_revoked: false,
        expires_at: expiryDate,
      });

      return this.responseHelper.success(res, "USERTOKENRESEND200");

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

  getUserDetails = async (req: Request, res: Response) => {
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
      return this.responseHelper.error(res, "SERVER500", ex);
    }
  }

}
