import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = "https://api.spacex.land/graphql/";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launchesPast: {
          keyArgs: ["order", "find"],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri,
  cache,
});

export default client;
