import { sign, verify } from "jsonwebtoken";
import { compareSync, hashSync, genSaltSync } from "bcryptjs";
import { Constant } from "../config";

export class UserHelper {

  private constant: Constant;

  constructor() {
    this.constant = new Constant();
  }

  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  public checkPassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  public createToken(payload: string): string {
    try {
      const secret = this.constant.getEnvironmentByKey("JWT_SECRET");
      return sign(payload, secret);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public generateOtp(): number { 
    return Math.floor(100000 + Math.random() * 900000);
  }

}
