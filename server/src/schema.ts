// schema.ts
import 'graphql-import-node';
import * as userTypeDefs from './graphql/schemas/userSchema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [ userTypeDefs ],
  resolvers,
});
export default schema;
