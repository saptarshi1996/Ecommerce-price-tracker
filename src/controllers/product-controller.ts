import { Request, Response } from "express";

import { ResponseHelper } from "../helpers";

export class ProductController { 

  private responseHelper: ResponseHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
  }

  addNewUserProudct(req: Request, res: Response) {
    try { 

      const { link } = req.body;

    } catch (ex) { 

    }
  }

}
