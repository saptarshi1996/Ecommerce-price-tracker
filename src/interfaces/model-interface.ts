import { Model } from "sequelize";

export interface IUser extends Model {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
