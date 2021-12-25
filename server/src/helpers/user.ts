import { hashSync, compareSync, genSaltSync } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

import { Constant } from "../config";

export class UserHelper {

  private constant: Constant;

  constructor() {
    this.constant = new Constant();
  }

  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  public comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  public createToken(payload: string): string { 
    return sign(payload, this.constant.getEnvironmentVariableByKey("JWT_SECRET"));
  }

}
