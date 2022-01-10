import { Server } from "@hapi/hapi";

import { UserLoginValidation, UserRegisterValidation } from "../validations";
import { AuthController } from "../controllers";

class AuthRoute {

  private routes: Array<any>;
  private readonly authController: AuthController;
  private readonly tags: Array<string>;

  private readonly userRegisterValidation: UserRegisterValidation;
  private readonly userLoginValidation: UserLoginValidation;

  constructor() {
    this.authController = new AuthController();

    this.userRegisterValidation = new UserRegisterValidation();
    this.userLoginValidation = new UserLoginValidation();

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
    ];
  }

  public getRoute(): Object {
    return {
      name: "scraper",
      register: (server: Server) => server.route(this.routes),
    }
  }

};

export default new AuthRoute().getRoute();
