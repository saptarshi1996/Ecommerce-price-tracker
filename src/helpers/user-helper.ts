import { genSaltSync, compareSync, hashSync } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";

import { Constant } from "../config";

export class UserHelper {

  private constant: Constant;

  constructor() {
    this.constant = new Constant();
  }

  public comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  public generateToken(payload: Object | any): string {
    const secret: string = this.constant.getEnvironmentByKey("JWT_SECRET");
    return sign(JSON.stringify(payload), secret);
  }

  public decodeToken(token: string): string | JwtPayload {
    try {
      const secret: string = this.constant.getEnvironmentByKey("JWT_SECRET");
      return verify(token, secret);
    } catch (ex) {
      throw new Error(ex);
    }
  }

}
