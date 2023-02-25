import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css';
import AppRoutes from './AppRoutes';
import { graphqlClient } from './client';
import { ChainProvider } from './contexts/network';
import { NetworkProvider } from './providers/NetworkProvider';

export default function App() {
  return (
    <ApolloProvider client={graphqlClient}>
      <NetworkProvider>
        <ChainProvider>
          <HashRouter>
            <Suspense
              // TODO: Add a cool loading indicator
              fallback={null}
            >
              <AppRoutes />
            </Suspense>
          </HashRouter>
        </ChainProvider>
      </NetworkProvider>
    </ApolloProvider>
  );
}
