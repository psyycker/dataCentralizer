import GenericError from './GenericError'

export default class PermissionDenied extends GenericError {
  constructor (customMessage = 'Permission Denied') {
    super(customMessage)
  }
}
