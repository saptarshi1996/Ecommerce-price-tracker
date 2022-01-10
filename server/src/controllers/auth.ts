import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

export class AuthController {

  constructor() {

  }

  public async userLogin(req: Request, h: ResponseToolkit): Promise<ResponseObject> {

    return h.response({
      
    });

  }

}
