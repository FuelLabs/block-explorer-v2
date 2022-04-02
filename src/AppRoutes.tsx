import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const AddressPage = lazy(() => import('./pages/AddressPage'));
const BlockPage = lazy(() => import('./pages/BlockPage'));
const BlockTransactionsPage = lazy(() => import('./pages/BlockTransactionsPage'));
const ContractPage = lazy(() => import('./pages/ContractPage'));
const CreateTransactionPage = lazy(() => import('./pages/CreateTransactionPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const TransactionPage = lazy(() => import('./pages/TransactionPage'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/address/:address" element={<AddressPage />} />
      <Route path="/block/:block/transactions" element={<BlockTransactionsPage />} />
      <Route path="/block/:block" element={<BlockPage />} />
      <Route path="/transaction/:transaction" element={<TransactionPage />} />
      <Route path="/create-transaction/:transaction" element={<CreateTransactionPage />} />
      <Route path="/contract/:contract" element={<ContractPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
