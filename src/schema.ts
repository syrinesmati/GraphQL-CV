import { readFileSync } from "fs";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { Subscription } from "./resolvers/Subscription";
import { Cv } from "./resolvers/Cv";


const typeDefs = readFileSync(path.join(__dirname, "../schema/schema.gql"), "utf-8");

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Cv,
  },
});
