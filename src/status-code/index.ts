import { HttpCode } from "./http-code";

import { UserCode } from "./user-code";
import { ProductCode } from "./product-code";

export class StatusCode {

  private statusCodeObject: { [key: string]: string };

  constructor() {
    this.statusCodeObject = {
      ...UserCode,
      ...HttpCode,
      ...ProductCode,
    };
  }

  public getObjectByCode(code: string): string {
    return this.statusCodeObject[code];
  }

}
