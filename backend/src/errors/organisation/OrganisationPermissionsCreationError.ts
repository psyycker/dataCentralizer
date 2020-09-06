import GenericError from '../GenericError'

export default class OrganisationPermissionsCreationError extends GenericError {
  constructor (customMessage = 'Could not create permissions for Organisation') {
    super(customMessage)
  }
}
