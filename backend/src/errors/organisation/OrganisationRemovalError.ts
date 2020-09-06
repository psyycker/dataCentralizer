import GenericError from '../GenericError'

export default class OrganisationRemovalError extends GenericError {
  constructor (customMessage = 'Could not remove Organisation') {
    super(customMessage)
  }
}
