import { Model } from "sequelize";

export interface IUser extends Model {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;

  is_verified?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IUserVerification extends Model {
  
  id?: number;

  otp?: number;
  is_revoked?: boolean;
  user_id?: number;
  expires_at?: Date;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

}
