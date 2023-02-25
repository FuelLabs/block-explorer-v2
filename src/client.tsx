import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import './App.css';
import { getProviderUrl } from './providers/NetworkProvider/utils';

const { REACT_APP_GRAPHQL_API_ENDPOINT } = process.env;

export const httplink = new HttpLink({
  uri: () => {
    const providerUrl = getProviderUrl() || REACT_APP_GRAPHQL_API_ENDPOINT!;
    return providerUrl;
  },
});

export const graphqlClient = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
  // We can configure for each schema the keys to cache, without
  // this config for each one objects without id, will not work
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
