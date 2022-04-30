const express = require("express");
const path = require("path");
const db = require("./config/connection");
// const routes = require("./routes");
const { ApolloServer } = require("apollo-server-express");
// the auth function for the apollo server
const { authMiddleware } = require("./utils/auth");
// import the schemas to the server
const { typeDefs, resolvers } = require("./schemas");
// import this interesting compression package to hopefully decrease load times
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  // this starts the apollo server
  await server.start();
  // applies apollo to the app itself
  server.applyMiddleware({ app });

  // once the server is up then this console log will help me get to the path to use graphql
  console.log(
    `Use graphql here: http://localhost:${PORT}${server.graphqlPath}`
  );
};
// server is basically set up so just calling the function to run
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use the compression
app.use(
  compression({
    level: 6,
  })
);
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// this is the new way to use graphql's api route
// server is good to go!
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
