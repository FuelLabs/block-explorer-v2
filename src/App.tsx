import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink
} from "@apollo/client";
import './App.css';
import { Homepage } from "./pages/Homepage";
import { AddressPage } from "./pages/AddressPage";
import { BlockPage } from "./pages/BlockPage";
import { TransactionPage } from "./pages/TransactionPage";
import { BlockTransactionsPage } from './pages/BlockTransactionsPage';
import { CoinPage } from './pages/CoinPage';
import { CreateTransactionPage } from './pages/CreateTransactionPage';
import { ContractPage } from './pages/ContractPage';
import { config } from './config';
import { setContext } from "@apollo/client/link/context";
import { ChainProvider } from './contexts/network';

const httpLink = createHttpLink({
  uri: config.apiUrl,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => ({
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    // fetchOptions: {
    //   mode: 'no-cors'
    // }
  }));
  return forward(operation);
});

const client = new ApolloClient({
  uri: config.apiUrl,
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChainProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path={"/address/:address"} component={AddressPage} />
            <Route path={"/block/:block/transactions"} component={BlockTransactionsPage} />
            <Route path={"/block/:block"} component={BlockPage} />
            <Route path={"/transaction/:transaction"} component={TransactionPage} />
            <Route path={"/create-transaction/:transaction"} component={CreateTransactionPage} />
            <Route path={"/coin/:coin"} component={CoinPage} />
            <Route path={"/contract/:contract"} component={ContractPage} />
          </Switch>
        </Router>
      </ChainProvider>
    </ApolloProvider>
  );
}

export default App;
