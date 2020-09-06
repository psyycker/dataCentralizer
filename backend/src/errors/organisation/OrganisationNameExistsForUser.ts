import GenericError from '../GenericError'

export default class OrganisationNameExistsForUser extends GenericError {
  constructor (customMessage = 'You already have an organisation with this name') {
    super(customMessage)
  }
}
