import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { StatusCode } from "../status-codes";
import { IResponse, IStatus } from "../interfaces";

export class ResponseHelper {

  private statusCode: StatusCode;

  constructor() {
    this.statusCode = new StatusCode();
  }

  public success(h: ResponseToolkit, code: string, data?: Object | any): ResponseObject {
    
    const statusObject: IStatus = this.statusCode.getCodeByKey(code);
    const responseObject: IResponse = {
      status: statusObject,
    };

    if (data) {
      responseObject.data = data;
    }

    return h.response(responseObject).code(statusObject.status_code);

  }

  public error(h: ResponseToolkit, code: string, err?: Object | any): ResponseObject {

    const statusObject: IStatus = this.statusCode.getCodeByKey(code);
    const responseObject: IResponse = {
      status: statusObject,
    };

    if (err) {
      console.log(new Date().toISOString().slice(0, 19).replace('T', ' '), code, err.message);
      responseObject.status.message = err.message;
    }

    return h.response(responseObject).code(statusObject.status_code);

  }

}
