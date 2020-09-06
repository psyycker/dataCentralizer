import ProjectPermissions, { IProjectPermissionsSchema } from './index'

import { stringToObjectID } from '../../../utils'
import ProjectPermissionsFindingError from '../../../../errors/project/permissions/ProjectPermissionsFindingError'

export function getUserPermissionsForProject (userid: string, projectId: string): Promise<IProjectPermissionsSchema> {
  return new Promise<IProjectPermissionsSchema>((resolve, reject) => {
    ProjectPermissions.findOne({ project: stringToObjectID(projectId), user: stringToObjectID(userid) }, (err, result) => {
      if (err || result == null) {
        reject(new ProjectPermissionsFindingError())
        return
      }
      resolve(result)
    })
  })
}
