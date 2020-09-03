import { IResolvers } from 'graphql-tools';
import { merge } from "lodash"
import { UserResolvers } from "./graphql/resolvers/UserResolvers";
import { OrganisationResolvers } from './graphql/resolvers/OrganisationResolvers';

const resolverMap: IResolvers = merge(UserResolvers, OrganisationResolvers);
export default resolverMap;
