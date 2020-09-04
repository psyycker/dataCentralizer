import {IUserSchema} from "../database/schemas/user";
import {IProjectSchema} from "../database/schemas/project";
import Project from '../database/schemas/project'
import ProjectPermission, {IProjectPermissionsSchema} from '../database/schemas/project/permissions';
import PermissionDenied from "../errors/PermissionDenied";
import ProjectCreationError from "../errors/project/ProjectCreationError";
import ProjectPermissionCreationError from "../errors/project/ProjectPermissionCreationError";
import {removeProject, getProject as getProjectDB} from "../database/schemas/project/helper";
import {getUserPermissionsForProject} from "../database/schemas/project/permissions/helper";


function canCreateProject(user: IUserSchema) {
  if (user == null) {
    throw new PermissionDenied();
  }
}

function canGetProject(projectId: string, user: IUserSchema): void{
  if (user == null) {
    throw new PermissionDenied()
  }
  //TODO check if permission document exists for project
}



export async function getProjectPermissions(projectId: string, user: IUserSchema): Promise<IProjectPermissionsSchema> {
  canGetProject(projectId, user);
  return await getUserPermissionsForProject(user._id, projectId);
}

export async function getProject(projectId: string, user: IUserSchema): Promise<IProjectSchema> {
  canGetProject(projectId, user);
  return await getProjectDB(projectId);
}

export function createProject(name: string, organisation: string, user:IUserSchema): Promise<IProjectSchema> {
  canCreateProject(user);
  const project = new Project({
    name,
    organisation
  });
  const projectPermissions = new ProjectPermission({
    project: project._id,
    user: user._id,
    canEdit: true,
    canRemoveFiles: true,
    canView: true,
    canMoveFiles: true,
    canCreateFiles: true,
    canAddUserToProject: true,
    canRemoveUserFromProject: true,
    owner: true
  })
  return new Promise<IProjectSchema>((resolve, rejects) => {
    project.save((err, result) => {
      if (err){
        rejects(new ProjectCreationError())
        return;
      }
      projectPermissions.save(async (err, result) => {
        if (err) {
          rejects(new ProjectPermissionCreationError())
          await removeProject(project._id)
          return;
        }
        resolve(project);
      })
    })
  })
}
