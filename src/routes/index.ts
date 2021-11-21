import {  Router } from "express";

import UserRouter from "./user-route";

export class Route {

  private router: Router;

  private userRouter: UserRouter;

  constructor() {
    this.router = Router();

    this.userRouter = new UserRouter();

    this.setRouter();
  }

  private setRouter() {
    this.router.use("/user", this.userRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }

}
