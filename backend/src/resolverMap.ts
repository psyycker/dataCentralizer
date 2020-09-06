import { IResolvers } from 'graphql-tools'
import { merge } from 'lodash'
import { UserResolvers } from './graphql/resolvers/UserResolvers'
import { OrganisationResolvers } from './graphql/resolvers/OrganisationResolvers'
import { ProjectResolvers } from './graphql/resolvers/ProjectResolvers'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'

const jsonResolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
}

const resolverMap: IResolvers = merge(jsonResolvers, UserResolvers, OrganisationResolvers, ProjectResolvers)
export default resolverMap
