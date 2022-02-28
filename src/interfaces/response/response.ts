import { IStatus } from './status'

export interface IResponse {
  data?: Record<string, unknown>
  status?: IStatus
}
