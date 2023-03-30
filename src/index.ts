import { getApplication } from './setup/application.setup'

import environment from './config/environment.config'
import logger from './config/logger.config'

const { PORT, HOST } = environment

getApplication().then((server) => {
  server.listen(PORT, HOST, () => { logger.info(`Server on ${HOST} ${PORT}`) })
}).catch(err => { throw (err) })
