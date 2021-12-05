import {  Router } from "express";

import UserRouter from "./user-route";
import ProductRouter from "./product-route";

export class Route {

  private router: Router;

  private userRouter: UserRouter;
  private productRouter: ProductRouter;

  constructor() {
    this.router = Router();

    this.userRouter = new UserRouter();
    this.productRouter = new ProductRouter;

    this.setRouter();
  }

  private setRouter() {
    this.router.use("/user", this.userRouter.getRouter());
    this.router.use("/product", this.productRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }

}
