import type { Transaction, TransactionResult } from 'fuels';
import { DECIMAL_UNITS, TransactionResponse } from 'fuels';
import { useEffect, useState } from 'react';

import { useProvider } from '../../utils/useProvider';

export const useTransaction = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction>();
  const [transactionResult, setTransactionResult] =
    useState<TransactionResult<'success' | 'failure'>>();
  const { provider } = useProvider();

  useEffect(() => {
    if (provider && transactionId) {
      (async () => {
        const tx = await provider.getTransaction(transactionId);
        if (!tx) return;
        setTransaction(tx);

        const txResp = await new TransactionResponse(transactionId, provider).waitForResult();
        setTransactionResult(txResp);
      })();
    }
  }, [provider, transactionId]);

  return {
    transaction,
    transactionResult,
  };
};
