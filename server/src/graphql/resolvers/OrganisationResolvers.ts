import { IResolvers } from 'graphql-tools';
import {GetOrganisationsResult, MutationCreateOrganisationArgs, OrganisationCreationResult} from "../generated/graphql";
import {createOrganisation, getOrganisations} from "../../services/OrganisationService";
import {IUserSchema} from "../../database/schemas/user";

export const OrganisationResolvers: IResolvers = {
  Query: {
    async getOrganisations(_: void, _args: void, context: { user: IUserSchema }): Promise<GetOrganisationsResult> {
      return {
        organisations: await getOrganisations(context.user)
      }
    }
  },
  Mutation: {
    async createOrganisation(_: void, args: MutationCreateOrganisationArgs, context: { user: IUserSchema }): Promise<OrganisationCreationResult> {
      const { name } = args;
      const organisationId = await createOrganisation(context.user, name);
      return {
        id: organisationId
      }
    }
  }
}
