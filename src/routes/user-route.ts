import { Router } from "express";

import {
  UserController,
} from "../controllers";

import { AuthMiddleware } from "../middlewares";

class UserRoute {

  private router: Router;

  private readonly userController: UserController;
  private readonly authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();

    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();

    this.setPostRoute();
    this.setGetRoute();

  }

  private setPostRoute(): void {
    this.router.post("/user-login", this.userController.userLogin);
    this.router.post("/user-register", this.userController.userRegister);
    this.router.post("/user-verify", this.userController.verifyUser);
    this.router.post("/resend-token", this.userController.resendToken);
  }

  private setGetRoute(): void {
    this.router.get("/user-details", this.authMiddleware.verifyUser, this.userController.getUserDetails);
  }

  public getRouter(): Router {
    return this.router;
  }

}

export default UserRoute;
