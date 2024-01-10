import type { Transaction, TransactionResult } from 'fuels';
import { Provider, TransactionResponse } from 'fuels';
import { useEffect, useState } from 'react';

import { useProviderUrl } from '../../utils/useProvider';

export const useTransaction = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction>();
  const [transactionResult, setTransactionResult] =
    useState<TransactionResult<'success' | 'failure'>>();
  const { providerUrl } = useProviderUrl();

  useEffect(() => {
    if (providerUrl && transactionId) {
      (async () => {
        const provider = await Provider.create(providerUrl);
        const tx = await provider.getTransaction(transactionId);
        if (!tx) return;
        setTransaction(tx);

        const txResp = await new TransactionResponse(transactionId, provider).waitForResult();
        setTransactionResult(txResp);
      })();
    }
  }, [providerUrl, transactionId]);

  return {
    transaction,
    transactionResult,
  };
};
