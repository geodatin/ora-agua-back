import { createConnection } from 'typeorm'

import '../../../../../shared/container'
import { UpdateObservationCollector } from './updateObservation/UpdateObservation'

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
