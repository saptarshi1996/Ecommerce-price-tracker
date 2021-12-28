import { Router } from "express";

import { AuthController } from "../controllers";
import { IRoute } from "../interfaces";

export class AuthRouter { 

  private router: Router;
  private authController: AuthController;

  private postRoute: Array<IRoute>;
  private getRoute: Array<IRoute>;

  constructor() {

    this.router = Router();

    this.authController = new AuthController();

    this.postRoute = [
      {
        url: "/login",
        type: "POST",
        controller: this.authController.userLogin,
      },
      {
        url: "/register",
        type: "POST",
        controller: this.authController.userRegister,
      },
    ];

    this.getRoute = [];

    this.postRoute.forEach((route: IRoute) => {
      this.router.post(route.url, route.controller);
    });

    this.getRoute.forEach((route: IRoute) => {
      this.router.get(route.url, route.controller);
    });

  }

  public getRouter(): Router { 
    return this.router;
  }

}
