import { IProjectSchema } from '../../database/schemas/project'
import { Project, ProjectPermissions } from '../generated/graphql'
import { IProjectPermissionsSchema } from '../../database/schemas/project/permissions'

export function convertIProjectToProject (project: IProjectSchema): Project {
  return {
    id: project._id,
    name: project.name,
    permissions: project._id,
    owner: project.organisation.toString()
  }
}

export function convertIProjectPermissionsToProjectPermissions (permissions: IProjectPermissionsSchema): ProjectPermissions {
  return {
    canAddUsersToProject: permissions.canAddUserToProject,
    canCreateFiles: permissions.canCreateFiles,
    canEdit: permissions.canEdit,
    canMoveFiles: permissions.canMoveFiles,
    canRemoveFiles: permissions.canRemoveFiles,
    canRemoveUsersToProject: permissions.canRemoveUserFromProject,
    projectId: permissions.project.toString(),
    userId: permissions.user.toString()
  }
}
