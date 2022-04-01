import { useMemo } from 'react';

import { dateDiff, getTextForTimeDifference } from '../../utils/date';

import type { HomePageTransaction } from './__generated__/operations';
import {
  DataTimestamp,
  DataBox,
  DataItem,
  DataTitle,
  TxType,
  TransactionAddress,
  TransactionRecipientLabel,
  TransactionRecipientLink,
  TransactionTypeColumn,
  TransactionHashColumn,
  TransactionRecipientsColumn,
  TransactionRecipientsWrapper,
  TransactionsDataBoxRow,
  TransactionRowColumn,
} from './components';

type Props = {
  transactions: HomePageTransaction[];
};

type Ouputs = HomePageTransaction['outputs'];

export function RecentTransactions({ transactions }: Props) {
  const sortedTransactions = transactions
    .sort((t1, t2) =>
      new Date(t1.status!.time).getTime() - new Date(t2.status!.time).getTime() <= 0 ? 1 : -1
    )
    .slice(0, 5);

  return (
    <DataItem>
      <DataTitle>Recent Transactions</DataTitle>
      <DataBox>
        {sortedTransactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </DataBox>
    </DataItem>
  );
}

function TransactionRow({ transaction }: { transaction: HomePageTransaction }) {
  const difference = useMemo(
    () => dateDiff(new Date(), new Date(transaction.status!.time)),
    [transaction]
  );
  const timestamp = useMemo(() => getTextForTimeDifference(difference), [difference]);

  return (
    <TransactionsDataBoxRow key={transaction.id}>
      <TransactionRowColumn>
        <TransactionTypeColumn>
          <TxType>{transaction.isScript ? 'Script' : 'Create'}</TxType>
        </TransactionTypeColumn>
        <TransactionHashColumn>
          <TransactionAddress id="recent-transaction-link" to={`/transaction/${transaction.id}`}>
            {transaction.id}
          </TransactionAddress>
          <DataTimestamp>{timestamp}</DataTimestamp>
        </TransactionHashColumn>
      </TransactionRowColumn>
      <TransactionRecipientsColumn>
        <TransactionRecipientsWrapper>
          <TransactionRecipientLabel>From:</TransactionRecipientLabel>
          {transaction.inputs.map((input) =>
            input.__typename === 'InputCoin' ? (
              <TransactionRecipientLink to={`/address/${input.owner}`}>
                {input.owner}
              </TransactionRecipientLink>
            ) : (
              input.__typename
            )
          )}
        </TransactionRecipientsWrapper>
        <TransactionRecipientsWrapper>
          {transaction.outputs.map(
            (output) =>
              (output.__typename === 'ChangeOutput' ||
                output.__typename === 'CoinOutput' ||
                output.__typename === 'VariableOutput' ||
                output.__typename === 'WithdrawalOutput') && (
                <>
                  <TransactionRecipientLabel>To:</TransactionRecipientLabel>
                  {output.__typename}
                  <TransactionRecipientLink to={`/address/${output.to}`}>
                    {output.to}
                  </TransactionRecipientLink>
                </>
              )
          )}
        </TransactionRecipientsWrapper>
      </TransactionRecipientsColumn>
    </TransactionsDataBoxRow>
  );
}
