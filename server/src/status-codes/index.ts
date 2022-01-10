import { Auth } from "./auth";
import { Response } from "./response";

import { IStatus } from "../interfaces";

export class StatusCode {

  private codes: Object | any;

  constructor() {
    this.codes = {
      ...Auth,
      ...Response,
    };
  }

  public getCodeByKey(code: string): IStatus {

    const statusCode: string = code.substring(code.length - 3);
    const statusSuccess: boolean = statusCode[0] == "2" ? true : false;
    const statusCodeNumber: number = Number(statusCode);

    return {
      "status_code": statusCodeNumber,
      "success": statusSuccess,
      "message": this.codes[code],
    };

  }
}
