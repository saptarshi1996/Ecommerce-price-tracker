import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { IUserProduct } from "../interfaces";
import { Database } from "../config";

import { User } from "./users";
import { Product } from "./products";

class UserProductModel {

  private sequelize: Sequelize;
  private model: ModelCtor<IUserProduct>;

  public constructor() {
    this.sequelize = new Database().getSequelize();
    this.setModel();
    this.createRelations();
  }

  public getModel(): ModelCtor<IUserProduct> {
    return this.model;
  }

  private setModel(): void {
    this.model = this.sequelize.define<IUserProduct>("user_products", {

      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      product_id: {
        type: DataTypes.INTEGER,
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

  private createRelations(): void { 
    this.model.belongsTo(User, {
      foreignKey: "user_id",
    });
    this.model.belongsTo(Product, {
      foreignKey: "product_id",
    });
  }
}

export const UserProduct = new UserProductModel().getModel();
