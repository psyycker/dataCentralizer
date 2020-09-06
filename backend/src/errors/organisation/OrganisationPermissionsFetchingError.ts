import GenericError from '../GenericError'

export default class OrganisationPermissionsFetchingError extends GenericError {
  constructor (customMessage = 'Error when getting organisation permissions for user') {
    super(customMessage)
  }
}
