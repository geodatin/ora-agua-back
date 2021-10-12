import env from 'dotenv-safe'
import { createConnection } from 'typeorm'

env.config()
createConnection().then(() => {
  console.log('Connection established')
})
