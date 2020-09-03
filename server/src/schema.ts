// schema.ts
import 'graphql-import-node';
import * as userTypeDefs from './graphql/schemas/userSchema.graphql';
import * as organisationTypeDefs from './graphql/schemas/organisationSchema.graphql';
import * as emptyTypeDefs from './graphql/schemas/empty.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [ emptyTypeDefs, userTypeDefs, organisationTypeDefs ],
  resolvers
});
export default schema;
