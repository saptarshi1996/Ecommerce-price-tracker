import { AuthCode } from "./auth";
import { ResponseCode } from "./response";

export class StatusCode {

  private statusObject: { [key: string]: string };

  constructor() {
    this.setStatusCode();
  }

  private setStatusCode(): void {
    this.statusObject = {
      ...AuthCode,
      ...ResponseCode,
    };
  }

  public getStatusByCode(key: string): string {
    return this.statusObject[key];
  }

}
