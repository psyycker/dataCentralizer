import GenericError from '../GenericError'

export default class OrganisationCreationError extends GenericError {
  constructor (customMessage = 'Could not create organisation') {
    super(customMessage)
  }
}
