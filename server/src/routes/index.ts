import { AuthRouter } from "./auth";

export class ExpressRouter { 

  private authRouter: AuthRouter;

  constructor() { 
    this.authRouter = new AuthRouter();
  }

  public getRouter() { 
    
  }

}
