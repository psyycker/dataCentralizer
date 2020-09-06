import GenericError from '../../GenericError'

export default class ProjectPermissionsFindingError extends GenericError {
  constructor (customMessage = 'Error when getting project permissions') {
    super(customMessage)
  }
}
