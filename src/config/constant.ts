import { config } from "dotenv";
config();

export class Constant { 

  private Environment: Object | any = {};

  constructor() {
    this.setEnvironment();
  }

  private setEnvironment(): void { 
    this.Environment = {
      "PORT": process.env.PORT,
      "HOST": process.env.HOST,
      "DB_NAME": process.env.DB_NAME,
      "DB_HOST": process.env.DB_HOST,
      "DB_PASSWORD": process.env.DB_PASSWORD,
      "DB_USER": process.env.DB_USER,
      "DB_DIALECT": process.env.DB_DIALECT,
      "DB_PORT": process.env.DB_PORT,
      "JWT_SECRET": process.env.JWT_SECRET,
    };
  }

  public getEnvironment(): Object | any { 
    return this.Environment;
  }

  public getEnvironmentByKey(key: string): string { 
    return this.Environment[key];
  }
 
}
