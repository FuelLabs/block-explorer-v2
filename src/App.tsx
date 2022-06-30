import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AppRoutes from './AppRoutes';
import createRelayEnvironment from './api/createRelayEnvironment';
import { PROVIDER_URL_STORAGE_KEY } from './constants';
import { ChainProvider } from './contexts/network';

const { REACT_APP_GRAPHQL_API_ENDPOINT, PUBLIC_URL } = process.env;

const { location } = window;
const queryParams = new URLSearchParams(location.search);
const providerUrl = queryParams.get('providerUrl');
// If providerUrl is provided on the query params
// Override the current providerUrl
if (providerUrl) {
  if (REACT_APP_GRAPHQL_API_ENDPOINT === providerUrl) {
    localStorage.removeItem(PROVIDER_URL_STORAGE_KEY);
  } else {
    localStorage.setItem(PROVIDER_URL_STORAGE_KEY, JSON.stringify(providerUrl));
  }
  location.href = location.href.replace(location.search, '');
}

let parsedLocalStorageGraphQLEndpoint = null;
try {
  // Get from local storage by key
  const item = localStorage.getItem(PROVIDER_URL_STORAGE_KEY);
  // Parse stored json or if none return initialValue
  parsedLocalStorageGraphQLEndpoint = item ? JSON.parse(item) : null;
} catch (error) {
  console.debug(error);
}

const gqlUrl = parsedLocalStorageGraphQLEndpoint || REACT_APP_GRAPHQL_API_ENDPOINT;

const client = new ApolloClient({
  uri: gqlUrl,
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

const relayEnvironment = createRelayEnvironment(gqlUrl);

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ApolloProvider client={client}>
        <ChainProvider>
          <Router basename={PUBLIC_URL}>
            <Suspense
              // TODO: Add a cool loading indicator
              fallback={null}
            >
              <AppRoutes />
            </Suspense>
          </Router>
        </ChainProvider>
      </ApolloProvider>
    </RelayEnvironmentProvider>
  );
}
