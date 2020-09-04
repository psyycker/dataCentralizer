import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import StartDB from "./database/Database";
import morgan from "morgan";
import {IUserSchema} from "./database/schemas/user";
import {getUserWithToken} from "./database/schemas/user/Helpers";

const PORT = 4000

StartDB(() => {
  const app = express();
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || '';
        if (token) {
          const user: IUserSchema = await getUserWithToken(token);
          return { user }
        }
      } catch (e) {}
    }
  });
  app.use('*', cors());
  app.use(morgan("tiny"));
  app.use(compression());
  server.applyMiddleware({ app, path: '/graphql' });
  const httpServer = createServer(app);
  httpServer.listen(
    { port: PORT },
    (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:${PORT}/graphql`));
})
