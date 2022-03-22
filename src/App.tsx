import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { AddressPage } from "./pages/AddressPage";
import { BlockPage } from "./pages/BlockPage";
import { TransactionPage } from "./pages/TransactionPage";
import { BlockTransactionsPage } from "./pages/BlockTransactionsPage";
import { CreateTransactionPage } from "./pages/CreateTransactionPage";
import { ContractPage } from "./pages/ContractPage";
import { ChainProvider } from "./contexts/network";

const { REACT_APP_GRAPHQL_API_ENDPOINT } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
  // We can configure for each schema the keys to cache, without
  // this config for each one objects without id, will not work
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChainProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path={"/address/:address"} component={AddressPage} />
            <Route path={"/block/:block/transactions"} component={BlockTransactionsPage} />
            <Route path={"/block/:block"} component={BlockPage} />
            <Route path={"/transaction/:transaction"} component={TransactionPage} />
            <Route path={"/create-transaction/:transaction"} component={CreateTransactionPage} />
            <Route path={"/contract/:contract"} component={ContractPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ChainProvider>
    </ApolloProvider>
  );
}

export default App;
