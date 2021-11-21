import { UserCode } from "./user-code";
import { HttpCode } from "./http-code";

export class StatusCode {

  private statusCodeObject: { [key: string]: string };

  constructor() {
    this.statusCodeObject = {
      ...UserCode,
      ...HttpCode,
    };
  }

  public getObjectByCode(code: string): string {
    return this.statusCodeObject[code];
  }

}
