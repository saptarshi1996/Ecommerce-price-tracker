import { Sequelize } from "sequelize";

import { Constant } from "./constant";

export class Database { 

  private constant: Constant;
  private sequelize: Sequelize;

  constructor() {
    this.constant = new Constant();
    this.setSequelize();
  }

  private setSequelize(): void { 
    try {

      const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = this.constant.getEnvironment();
      this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port: DB_PORT,
        logging: false,
      });

      // Run automigrations.w
      this.sequelize.sync();
      
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

}
