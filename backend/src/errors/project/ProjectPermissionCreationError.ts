import GenericError from '../GenericError'

export default class ProjectPermissionCreationError extends GenericError {
  constructor (customMessage = 'Error when creating project permissions') {
    super(customMessage)
  }
}
