export interface IStatus {
  success?: boolean;
  message?: string;
  statusCode?: number;
}

export interface IResponse { 
  status?: IStatus;
  data?: Object;
}
