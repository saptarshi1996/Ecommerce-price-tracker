export interface IStatus {
  status_code?: number;
  message?: string;
  success?: boolean;   
}

export interface IResponse {
  status?: IStatus;
  data?: Object | any;
}
