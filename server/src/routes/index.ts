import { Router } from "express";

import { AuthRouter } from "./auth";
import { IBaseRoute } from "../interfaces";

export class ExpressRouter { 

  private router: Router;

  private routerList: Array<IBaseRoute>;

  constructor() {

    this.router = Router();

    this.routerList = [
      {
        url: "/auth",
        route: new AuthRouter().getRouter(),
      },
    ];

    this.routerList.forEach((route: IBaseRoute) => {
      this.router.use(route.url, route.route);
    });

  }

  public getRouter(): Router {
    return this.router;
  }

}
