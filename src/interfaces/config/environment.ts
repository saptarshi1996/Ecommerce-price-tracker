export default interface IEnvironment {
  HOST: string
  API_PORT: number
  CRON_PORT: number
  WORKER_PORT: number
  REDIS_HOST: string
  REDIS_PORT: number
  JWT_SECRET: string
}
