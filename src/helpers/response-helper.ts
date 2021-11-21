import { Response } from "express";
import { IStatus, IResponse } from "../interfaces";

import { StatusCode } from "../status-code";

export class ResponseHelper {

  private readonly statusCode: StatusCode;

  constructor() {
    this.statusCode = new StatusCode();
  }

  public success(res: Response, code: string, data?: Object): Response {

    const status = code.substring(code.length - 3);
    const statusMessage: string = this.statusCode.getObjectByCode(code);

    const statusObject: IStatus = {
      message: statusMessage,
      statusCode: +status,
      success: true,
    };

    const responseObject: IResponse = {
      status: statusObject,
    }

    if (data) {
      responseObject.data = data;
    }

    return res.status(+status).json(responseObject);

  }

  public error(res: Response, code: string, error?: any) {

    const status: string = code.substring(code.length - 3);
    const statusMessage: string = this.statusCode.getObjectByCode(code);

    const statusObject: IStatus = {
      message: statusMessage,
      statusCode: +status,
      success: false,
    };

    if (error) {
      console.log(error);
      statusObject.message = error.message;
    }

    const responseObject: IResponse = {
      status: statusObject,
    };

    return res.status(+status).json(responseObject);

  }

}
