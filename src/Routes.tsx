import { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const AddressPage = lazy(() => import("./pages/AddressPage"));
const BlockPage = lazy(() => import("./pages/BlockPage"));
const BlockTransactionsPage = lazy(
  () => import("./pages/BlockTransactionsPage")
);
const ContractPage = lazy(() => import("./pages/ContractPage"));
const CreateTransactionPage = lazy(
  () => import("./pages/CreateTransactionPage")
);
const HomePage = lazy(() => import("./pages/HomePage"));
const TransactionPage = lazy(() => import("./pages/TransactionPage"));

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/address/:address" component={AddressPage} />
      <Route
        path="/block/:block/transactions"
        component={BlockTransactionsPage}
      />
      <Route path="/block/:block" component={BlockPage} />
      <Route path="/transaction/:transaction" component={TransactionPage} />
      <Route
        path="/create-transaction/:transaction"
        component={CreateTransactionPage}
      />
      <Route path="/contract/:contract" component={ContractPage} />
      <Redirect to="/" />
    </Switch>
  );
}
