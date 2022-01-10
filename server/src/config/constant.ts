import { config } from "dotenv";
config();

export class Constant { 

  private Environment: Object | any;

  constructor() {

    this.Environment = {
      "PORT": process.env.PORT,
      "HOST": process.env.HOST,
    }
    
  }

  public getEnvironment(): Object | any {
    return this.Environment;
  }

  public getEnvironmentByKey(key: string): string {
    return this.Environment[key];
  }

}
