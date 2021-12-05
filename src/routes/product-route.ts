import { Router } from "express";

class ProductRoute { 

  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter(): Router {
    return this.router;
  }

}

export default ProductRoute;
