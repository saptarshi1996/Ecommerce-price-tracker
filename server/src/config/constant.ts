import { config } from "dotenv";
config();

export class Constant { 

  private environmentVariable: Object | any;

  constructor() {
    this.setEnvironmentVariable();
  }

  private setEnvironmentVariable(): void { 
    this.environmentVariable = {
      "HOST": process.env.HOST,
      "PORT": process.env.PORT,
      "JWT_SECRET": process.env.JWT_SECRET,
    };
  }

  public getEnvironmentVariableByKey(key: string): string { 
    return this.environmentVariable[key];
  }

}
