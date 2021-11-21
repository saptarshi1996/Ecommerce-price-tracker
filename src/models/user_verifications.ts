import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { Database } from "../config";
import { IUserVerification } from "../interfaces";

import { User } from "./users";

class UserVerificationModel { 

  private sequelize: Sequelize;
  private model: ModelCtor<IUserVerification>;

  constructor() { 
    this.sequelize = new Database().getSequelize();
    this.setModel();
    this.createRelations();
  }

  private setModel(): void { 
    this.model = this.sequelize.define<IUserVerification>("user_verifications", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      is_revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      expires_at: {
        type: DataTypes.DATE,
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

  public getModel(): ModelCtor<IUserVerification> {
    return this.model;
  }

  private createRelations(): void {
    this.model.belongsTo(User, {
      foreignKey: "user_id",
    });
  }

}

export const UserVerification = new UserVerificationModel().getModel();
