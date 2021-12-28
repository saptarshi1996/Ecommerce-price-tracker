export interface UserLogin {
  id?: number;
  email?: string;
  password?: string;
  is_verified?: boolean;
}

export interface UserRegiser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export interface IUser { 
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

