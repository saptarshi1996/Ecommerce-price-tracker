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

export interface ILink extends Model { 

  id?: number;
  url?: string;
  site_name?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

}

export interface IProduct extends Model { 

  id?: number;
  name?: string;
  current_price?: number;
  lowest_price?: number;

  link_id?: number; // Foreign key for link

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

}

export interface IUserProduct extends Model { 

  id?: number;

  product_id?: number; // Product id
  user_id?: number; // User id

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

}
