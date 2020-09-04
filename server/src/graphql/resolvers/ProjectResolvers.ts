import { IResolvers } from 'graphql-tools';
import {
  GetOrganisationsResult,
  MutationCreateOrganisationArgs,
  MutationCreateProjectArgs,
  OrganisationCreationResult, Project, ProjectPermissions, QueryGetProjectArgs, QueryPermissionsArgs
} from "../generated/graphql";
import {createOrganisation, getOrganisations} from "../../services/OrganisationService";
import {IUserSchema} from "../../database/schemas/user";
import {createProject, getProject, getProjectPermissions} from "../../services/ProjectService";
import {userExists} from "../../database/schemas/user/Helpers";

export const ProjectResolvers: IResolvers = {
  Query: {
    getProjects(_: void, _args: void, context: { user: IUserSchema }): void {},
    getProjectsForUser(_: void, _args: void, context: { user: IUserSchema }): void {},
    async getProject(_: void, _args: QueryGetProjectArgs, context: { user: IUserSchema }): Promise<Project> {
      const { project: projectId } = _args;
      const project = await getProject(projectId, context.user);
      return {
        id: project._id,
        name: project.name,
        permissions: project._id,
        owner: project.organisation.toString()
      }
    }
  },
  Mutation: {
    async createProject(_: void, args: MutationCreateProjectArgs, context: { user: IUserSchema }): Promise<Project> {
      const { name, organisation } = args;
      const project = await createProject(name, organisation, context.user);
      return {
        owner: organisation,
        id: project._id.toString(),
        permissions: project._id.toString(),
        name: project.name
      }
    }
  },
  Project: {
    async permissions(_parents: Project, _args: QueryPermissionsArgs, context: { user: IUserSchema }): Promise<ProjectPermissions> {
      const permissions = await getProjectPermissions(_parents.id, context.user);
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
  }
}
