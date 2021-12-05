import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { ILink } from "../interfaces";
import { Database } from "../config";

class LinkModel {

  private sequelize: Sequelize;
  private model: ModelCtor<ILink>;

  constructor() {
    this.sequelize = new Database().getSequelize();
    this.setModel();
    this.createRelations();
  }

  private setModel(): void {

    this.model = this.sequelize.define<ILink>("links", {

      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      site_name: {
        type: DataTypes.STRING,
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

  }

  public getModel(): ModelCtor<ILink> {
    return this.model;
  }

}

export const Link = new LinkModel().getModel();
