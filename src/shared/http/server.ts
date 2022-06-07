import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swagger from 'swagger-ui-express'

import '@shared/database/utils/formatPgResponse'
import docs from '../../../docs/docs.json'
import '../database'
import '../container'
import { checkError } from '../errors/checkError'
import { routes } from './routes/index.routes'

const app = express()
app.use(express.json())
app.use('/api/docs', swagger.serve, swagger.setup(docs))
// app.use(rateLimiter)
app.use(cors())
app.use('/api', routes)
app.use(checkError)

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`)
})
