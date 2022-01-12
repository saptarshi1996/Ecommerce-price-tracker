export interface IUserLogin {
  email: string;
  password: string;
};

export interface IUserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string; 
  otp: number;
};

export interface IUserVerify { 
  email: string;
  otp: number;
}
