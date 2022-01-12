import { Server } from "@hapi/hapi";

import { UserController } from "../controllers";
import { UserDetailsValidation } from "../validations";

class UserRoute {

  private routes: Array<any>;
  private readonly userController: UserController;
  private readonly tags: Array<string>;

  private readonly userDetailsValidation: UserDetailsValidation;

  constructor() {
    this.userController = new UserController();

    this.userDetailsValidation = new UserDetailsValidation();

    this.tags = ["api", "user"];
    this.setRoute();
  }

  private setRoute(): void {
    this.routes = [
      {
        method: "POST",
        path: "/user/details",
        config: {
          auth: "default",
          tags: this.tags,
          description: "User Details Controller",
          handler: this.userController.userDetails,
          validate: this.userDetailsValidation.getSchema(),
        }
      },
    ];
  }

  public getRoute(): Object {
    return {
      name: "user",
      register: (server: Server) => server.route(this.routes),
    }
  }

};

export default new UserRoute().getRoute();
