import { hashSync, compareSync, genSaltSync } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export class UserHelper {

  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  public comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

}
