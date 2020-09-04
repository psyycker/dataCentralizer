import { IResolvers } from 'graphql-tools';
import { merge } from "lodash"
import { UserResolvers } from "./graphql/resolvers/UserResolvers";
import { OrganisationResolvers } from './graphql/resolvers/OrganisationResolvers';
import { ProjectResolvers } from "./graphql/resolvers/ProjectResolvers";

const resolverMap: IResolvers = merge(UserResolvers, OrganisationResolvers, ProjectResolvers);
export default resolverMap;
