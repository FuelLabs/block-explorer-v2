import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AppRoutes from './AppRoutes';
import { PROVIDER_URL_STORAGE_KEY } from './constants';
import { ChainProvider } from './contexts/network';

const { REACT_APP_GRAPHQL_API_ENDPOINT, PUBLIC_URL } = process.env;

const queryParams = new URLSearchParams(window.location.search);
const providerUrl = queryParams.get('providerUrl');
// If providerUrl is provided on the query params
// Override the current providerUrl
if (providerUrl) {
  localStorage.setItem(PROVIDER_URL_STORAGE_KEY, JSON.stringify(providerUrl));
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

const client = new ApolloClient({
  uri: parsedLocalStorageGraphQLEndpoint || REACT_APP_GRAPHQL_API_ENDPOINT,
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

export default function App() {
  return (
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
  );
}
