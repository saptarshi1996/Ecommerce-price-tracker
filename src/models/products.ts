import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { IProduct } from "../interfaces";
import { Database } from "../config";

import { Link } from "./links";

class ProductModel { 

  private sequelize: Sequelize;
  private model: ModelCtor<IProduct>;

  constructor() {
    this.sequelize = new Database().getSequelize();
    this.setModel();
    this.createRelations();
  }

  public getModel(): ModelCtor<IProduct> {
    return this.model;
  }

  private setModel(): void {
    this.model = this.sequelize.define<IProduct>("products", {

      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      current_price: {
        type: DataTypes.REAL,
        allowNull: false, 
      },

      lowest_price: {
        type: DataTypes.REAL,
        allowNull: false,
      },

      link_id: {
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
    this.model.belongsTo(Link, {
      foreignKey: "link_id",
    })
  }

}

export const Product = new ProductModel().getModel();
