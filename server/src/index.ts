import _ from "lodash/fp";
import express from "express";
import { users } from "./users";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql";
const app = express();
const port = 8000;


//GraphQL endpoint
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: "/api/gql" });

// Parse JSON from request
app.use(express.json());

// Create REST API endpoints
app.get("/api/rest/users", (_req, res) => res.send(users));

app.get("/api/rest/user/:id", (req, res) => res.send(_.find({ id: req.params.id }, users)));

app.post("/api/rest/user", (req, res) => {
  const index = users.length;
  users.push({ id: `${index + 1}`, name: req.body.name, age: req.body.age });
  res.send(users[index]);
});

app.put("/api/rest/user", (req, res) => {
  const index = _.findIndex({ id: req.body.id }, users);
  if (index > -1) {
    users[index] = {
      ...users[index],
      name: req.body.name || users[index].name,
      age: req.body.age || users[index].age
    };
    res.send(users[index]);
  }
  throw new Error("failed to update user");
});

app.delete("/api/rest/user/:id", (req, res) => {
  const index = _.findIndex({ id: req.params.id }, users);
  if (index > -1) {
    res.send(users.splice(index, 1)[0]);
  }
  throw new Error("failed to delete user");
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);