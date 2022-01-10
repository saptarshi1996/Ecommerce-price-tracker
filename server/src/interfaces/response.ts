export interface IStatus { 
  message: string;
  status_code: number;
  success: boolean;
}

export interface IResponse {
  status?: IStatus;
  data?: Object | any;
}
