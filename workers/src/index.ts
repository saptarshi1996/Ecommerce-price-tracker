import express, { Application } from 'express'

import { Constant } from './config'

const app: Application = express()

const port = +Constant.environment.PORT
app.listen(port, () => console.log(`Server on port ${port}`))
