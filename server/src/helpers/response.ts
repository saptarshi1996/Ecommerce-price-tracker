import { Response } from "express";

import { IStatus, IResponse } from "../interfaces";
import { StatusCode } from "../status-code";

export class ResponseHelper {

  private readonly statusCode: StatusCode;

  constructor() {
    this.statusCode = new StatusCode();
  }

  private getStatusCodeAndSuccess(code: string): IStatus {

    const statusCode: string = code.substring(code.length - 3);
    const statusSuccess: boolean = statusCode[0] == "2" ? true : false;
    const statusCodeNumber: number = Number(statusCode);

    return {
      "status_code": statusCodeNumber,
      "success": statusSuccess,
    };

  }

  success(res: Response, code: any, data?: Object | any): Response {

    const responseObject: IResponse = {};
    const statusMessage: string = this.statusCode.getStatusByCode(code);
    const statusCodeAndSuccess: IStatus = this.getStatusCodeAndSuccess(code);

    const statusObject: IStatus = {
      message: statusMessage,
      success: statusCodeAndSuccess.success,
      status_code: statusCodeAndSuccess.status_code,
    };

    responseObject.status = statusObject;

    if (data) {
      responseObject.data = data;
    }

    return res.status(statusObject.status_code).json(responseObject);

  }

  error(res: Response, code: string, err?: Object | any): Response {

    const responseObject: IResponse = {};
    const statusMessage: string = this.statusCode.getStatusByCode(code);

    const statusCodeAndSuccess: IStatus = this.getStatusCodeAndSuccess(code);

    const statusObject: IStatus = {
      message: statusMessage,
      success: statusCodeAndSuccess.success,
      status_code: statusCodeAndSuccess.status_code,
    };

    responseObject.status = statusObject;

    if (err) {
      console.log(new Date().toISOString().slice(0, 19).replace('T', ' '), code, err.message);
      responseObject.status.message = err.message;
    }

    return res.status(statusObject.status_code).json(responseObject);

  }

}
