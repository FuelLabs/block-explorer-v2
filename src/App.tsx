import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';
import {Homepage} from "./pages/Homepage";
import {AddressPage} from "./pages/AddressPage";
import {BlockPage} from "./pages/BlockPage";
import {TransactionPage} from "./pages/TransactionPage";
import { BlockTransactionsPage } from './pages/BlockTransactionsPage';
import { CoinPage } from './pages/CoinPage';
import { CreateTransactionPage } from './pages/CreateTransactionPage';
import { ContractPage } from './pages/ContractPage';

function App() {
  return (
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
  );
}

export default App;
