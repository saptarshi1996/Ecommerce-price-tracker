export interface IUserLogin { 
  email: string;
  password: string;
}

export interface IUserRegister { 
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IVerifyUser {
  email: string;
  otp: number;
}

export interface IResendToken { 
  email: string;
}
