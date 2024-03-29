import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";
import { concatPagination } from "@apollo/client/utilities";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: HASURA_GRAPHQL_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          HASURA_ADMIN_SECRET,
      },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            fetchUsers: concatPagination(),
          },
        },
      },
    }),
  });
};

let apolloclient;

export default function initializeApollo(initialState = null) {
  const _apolloclient = apolloclient ? apolloclient : createApolloClient();

  if (initialState) {
    const existing = _apolloclient.extract();
    _apolloclient.restore({ ...existing, ...initialState });
  }

  if (typeof window === "undefined") {
    return _apolloclient;
  }

  if (!apolloclient) {
    apolloclient = _apolloclient;
  }

  return _apolloclient;
}

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
