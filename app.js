require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");

async function startApolloServer() {
  const app = express();

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "localhost";

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port, host }, () =>
    console.log(
      `Server is running at http://${host}:${port}${server.graphqlPath}`,
    ),
  );
}

startApolloServer().catch((error) => {
  console.error("Error starting Apollo Server:", error);
});
