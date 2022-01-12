import { Server } from "@hapi/hapi";

import { AuthController } from "../controllers";
import { 
  UserLoginValidation, 
  UserRegisterValidation, 
  UserVerificationValidation,
  UserResendValidation,
} from "../validations";

class AuthRoute {

  private routes: Array<any>;
  private readonly authController: AuthController;
  private readonly tags: Array<string>;

  private readonly userRegisterValidation: UserRegisterValidation;
  private readonly userLoginValidation: UserLoginValidation;
  private readonly userVerificationValidation: UserVerificationValidation;
  private readonly userResendValidation: UserResendValidation;

  constructor() {
    this.authController = new AuthController();

    this.userRegisterValidation = new UserRegisterValidation();
    this.userLoginValidation = new UserLoginValidation();
    this.userVerificationValidation = new UserVerificationValidation();
    this.userResendValidation = new UserResendValidation();

    this.tags = ["api", "auth"];
    this.setRoute();
  }

  private setRoute(): void {
    this.routes = [
      {
        method: "POST",
        path: "/auth/login",
        config: {
          auth: false,
          tags: this.tags,
          description: "User Login Controller",
          handler: this.authController.userLogin,
          validate: this.userLoginValidation.getSchema(),
        }
      },
      {
        method: "POST",
        path: "/auth/register",
        config: {
          auth: false,
          tags: this.tags,
          description: "User register Controller",
          handler: this.authController.userRegister,
          validate: this.userRegisterValidation.getSchema(),
        }
      },
      {
        method: "POST",
        path: "/auth/verify",
        config: {
          auth: false,
          tags: this.tags,
          description: "User verify Controller",
          handler: this.authController.verifyUser,
          validate: this.userVerificationValidation.getSchema(),
        },
      },
      {
        method: "POST",
        path: "/auth/resend",
        config: {
          auth: false,
          tags: this.tags,
          description: "User resend controller",
          handler: this.authController.resendToken,
          validate: this.userResendValidation.getSchema(),
        },
      },
    ];
  }

  public getRoute(): Object {
    return {
      name: "auth",
      register: (server: Server) => server.route(this.routes),
    }
  }

};

export default new AuthRoute().getRoute();
