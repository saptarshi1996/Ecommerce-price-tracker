export interface IUser { 
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  is_verified?: boolean;
}

export interface IUserVerification {
  id?: number;
  created_at?: Date;
  is_revoked?: boolean;
  user_id?: number;
}
