import {IProjectPermissionsSchema} from "./index";
import ProjectPermissions from './index';
import {stringToObjectID} from "../../../utils";
import ProjectPermissionsFindingError from "../../../../errors/project/permissions/ProjectPermissionsFindingError";

export function getUserPermissionsForProject(userid: string, projectId: string): Promise<IProjectPermissionsSchema> {
  return new Promise<IProjectPermissionsSchema>((resolve, rejects) => {
    ProjectPermissions.findOne({ project: stringToObjectID(projectId), user: stringToObjectID(userid) }, (err, result) => {
      console.log(err)
      console.log(result)
      if (err || result == null){
        rejects(new ProjectPermissionsFindingError())
        return;
      }
      resolve(result);
    })
  })
}
