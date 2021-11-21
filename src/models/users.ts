import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { Database } from "../config";
import { IUser } from "../interfaces";


class UserModel { 

  private sequelize: Sequelize;
  private model: ModelCtor<IUser>;

  constructor() { 
    this.sequelize = new Database().getSequelize();
    this.setModel();
  }

  private setModel(): void { 
    this.model = this.sequelize.define<IUser>("users", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      createdAt: { 
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: { 
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: { 
        type: DataTypes.DATE,
        allowNull: true,
      },

    });
  }

  public getModel(): ModelCtor<IUser> {
    return this.model;
  }

}

export const User = new UserModel().getModel();
