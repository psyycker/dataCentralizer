import { IResolvers } from 'graphql-tools'
import {
  MutationCreateProjectArgs, Project, ProjectPermissions, QueryGetProjectArgs, QueryPermissionsArgs
} from '../generated/graphql'
import { IUserSchema } from '../../database/schemas/user'
import { createProject, getProject, getProjectPermissions } from '../../services/ProjectService'
import { convertIProjectPermissionsToProjectPermissions, convertIProjectToProject } from '../converters/Project'

export const ProjectResolvers: IResolvers = {
  Query: {
    getProjects (_: void, _args: void, context: { user: IUserSchema }): void {},
    getProjectsForUser (_: void, _args: void, context: { user: IUserSchema }): void {},
    async getProject (_: void, _args: QueryGetProjectArgs, context: { user: IUserSchema }): Promise<Project> {
      const { project: projectId } = _args
      const project = await getProject(projectId, context.user)
      return convertIProjectToProject(project)
    }
  },
  Mutation: {
    async createProject (_: void, args: MutationCreateProjectArgs, context: { user: IUserSchema }): Promise<Project> {
      const { name, organisation } = args
      const project = await createProject(name, organisation, context.user)
      return convertIProjectToProject(project)
    }
  },
  Project: {
    async permissions (_parents: Project, _args: QueryPermissionsArgs, context: { user: IUserSchema }): Promise<ProjectPermissions> {
      const permissions = await getProjectPermissions(_parents.id, context.user)
      return convertIProjectPermissionsToProjectPermissions(permissions)
    }
  }
}
