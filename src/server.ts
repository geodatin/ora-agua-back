import express from 'express'
import 'express-async-errors'

import '@utils/formatPgResponse'
import './database'
import './shared/container'
import { checkError } from './errors/checkError'
import { routes } from './routes/index.routes'

const app = express()
app.use(express.json())
app.use('/api', routes)
app.use(checkError)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
