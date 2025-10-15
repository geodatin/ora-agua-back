import { createConnection } from 'typeorm'

import '../../../../../shared/container'
import { UpdateObservationCollector } from './updateObservation/UpdateObservation'

import cron from 'node-cron'

async function collect() {
  const connection = await createConnection()
  try {
    const updateObservationCollector = new UpdateObservationCollector()
    await updateObservationCollector.run()
  } catch (error) {
    await connection.close()
    console.log(error)
  }
}

collect()

cron.schedule('0 0 * * *', async () => {
  await collect()
})
