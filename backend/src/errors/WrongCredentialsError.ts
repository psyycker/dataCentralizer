import GenericError from './GenericError'

export default class WrongCredentialsError extends GenericError {
  constructor (customMessage = 'Email or Password wrong') {
    super(customMessage)
  }
}
