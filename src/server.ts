/**
 * @file server.ts
 * @description Entry point for the IoT GraphQL API server.
 *
 * Liskov Substitution / Dependency Inversion: ApolloServer receives the
 * schema pieces (typeDefs + resolvers) as constructor arguments, keeping
 * server bootstrapping independent from schema definition.
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

/** Port the server will listen on. Falls back to 4000 if not set. */
const PORT = Number(process.env.PORT) || 4000;

async function bootstrap(): Promise<void> {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  IoT GraphQL API ready at: ${url}`);
  console.log(`📡  Open Apollo Sandbox: ${url}`);
}

bootstrap().catch((err) => {
  console.error('❌  Failed to start server:', err);
  process.exit(1);
});
