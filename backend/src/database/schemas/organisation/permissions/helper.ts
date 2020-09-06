import OrganisationPermissions, { IOrganisationPermissionsSchema } from './index'
import { IUserSchema } from '../../user'
import OrganisationPermissionsFetchingError from '../../../../errors/organisation/OrganisationPermissionsFetchingError'

export function getUserPermissions (user: IUserSchema): Promise<IOrganisationPermissionsSchema[]> {
  return new Promise<IOrganisationPermissionsSchema[]>((resolve, reject) => {
    OrganisationPermissions.find({ user: user._id }, (err, results) => {
      if (err) {
        reject(new OrganisationPermissionsFetchingError())
        return
      }
      resolve(results)
    })
  })
}
