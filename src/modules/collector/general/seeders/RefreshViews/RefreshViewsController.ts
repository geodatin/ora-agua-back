import { container } from 'tsyringe'

import { RefreshViewsSeeder } from './RefreshViewsSeeder'

class RefreshViewsController {
  async start() {
    const refreshViewsSeeder = container.resolve(RefreshViewsSeeder)
    await refreshViewsSeeder.execute()
  }
}

export default new RefreshViewsController()
