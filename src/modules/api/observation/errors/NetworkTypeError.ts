import { AppError } from '../../../../shared/errors/AppError'

export class NetworkTypeError extends AppError {
  constructor() {
    super(`Invalid network type. Must be one of ['rha', 'rqa', 'hybam']`)
  }
}
