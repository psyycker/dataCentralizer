import GenericError from './GenericError'

export default class UserNotFoundError extends GenericError {
  constructor (customMessage = 'User not found') {
    super(customMessage)
  }
}
