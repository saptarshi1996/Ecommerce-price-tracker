import express, { Application } from "express";

import { Constant } from "./config";
import { IUser } from "./interfaces";
import { Route } from "./routes";

declare global {
  
  namespace Express {
    interface Request {
      user: IUser
    }
  }

}

export class App {

  private readonly constant: Constant;
  private readonly route: Route;

  private app: Application;

  constructor() {

    this.constant = new Constant();
    this.route = new Route();

    this.app = express();

    // Add parser
    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false,
    }));

    this.setMiddleware();

  }

  private setMiddleware() {
    this.app.use("/api", this.route.getRouter());
  }

  start() {

    const port: string = this.constant.getEnvironmentByKey("PORT");
    this.app.listen(+port, () => console.log(`Server on port ${port}`));

  }

}
