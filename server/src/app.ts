import express, { Application } from "express";

import { Constant } from "./config";
import { ExpressRouter } from "./routes";

export class App {

  private app: Application;
  private router: ExpressRouter;

  private constant: Constant;

  constructor() {

    this.router = new ExpressRouter();
    this.constant = new Constant();

    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false,
    }));

    // Set router with app.
    this.app.use("/", this.router.getRouter());

  }

  public start() {
    const port = +this.constant.getEnvironmentVariableByKey("PORT");
    this.app.listen(port, () => console.log(`server on port ${port}`));
  }

}
