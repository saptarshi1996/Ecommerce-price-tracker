import { Request, Response } from "express";

import { Link, Product } from "../models";
import { IAddNewUserProduct, IUser, ILink } from "../interfaces";
import { ResponseHelper } from "../helpers";

export class ProductController { 

  private responseHelper: ResponseHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
  }

  addNewUserProudct = async (req: Request, res: Response) => {
    try { 

      const { id } = req.user as IUser;
      const { link } = req.body as IAddNewUserProduct;

      // From link, get the product details
      const linkExists: ILink = await Link.findOne({
        where: {
          url: link,
        },
        attributes: ['id', 'url'],
        raw: true,
      });

    } catch (ex) { 
      return this.responseHelper.error(res, "SERVER500");
    }
  }

  deleteUserProduct = async (req: Request, res: Response) => {
    try{

      const { id } = req.user as IUser;
      const { product_id } = req.params as { [key: string]: string };

    } catch (ex) {
      return this.responseHelper.error(res, "SERVER500");
    }
  }

}
