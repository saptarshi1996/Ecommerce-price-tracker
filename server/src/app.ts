import express, { Application, Router } from "express";

import { ExpressRouter } from "./routes";

export class App {

  private app: Application;
  private router: ExpressRouter;

  constructor() {

    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false,
    }));

    // Set router with app.
    // this.app.use("/", this.router.getRouter());

  }
}
