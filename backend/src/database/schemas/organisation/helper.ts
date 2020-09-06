import Organisation from './index'
import OrganisationRemovalError from '../../../errors/organisation/OrganisationRemovalError'
import { IUserSchema } from '../user'
import GenericError from '../../../errors/GenericError'

export function removeOrganisation (id: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Organisation.remove({ _id: id }, err => {
      if (err) {
        reject(new OrganisationRemovalError())
        return
      }
      resolve()
    })
  })
}

export function organisationNameExistsForUser (name: string, user: IUserSchema): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    Organisation.exists({ name, owner: user._id }, (err, result) => {
      if (err) {
        reject(new GenericError(err))
        return
      }
      resolve(result)
    })
  })
}
