import { useMemo, useState } from 'react';

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
  DataHeader,
  DataPagination,
  DataPaginationText,
  DataPaginationTextCurrentPage,
  ArrowRightIcon,
  ArrowLeftIcon,
  IconButtonLeft,
  IconButtonRight,
  DataPaginationTextWrapper,
} from './components';

type Props = {
  transactions: HomePageTransaction[];
};

type Ouputs = HomePageTransaction['outputs'];

export function RecentTransactions({ transactions }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 5;
  const totalPages = Math.ceil(transactions.length / PAGE_LIMIT);

  const sortedTransactions = transactions
    .sort((t1, t2) =>
      new Date(t1.status!.time).getTime() - new Date(t2.status!.time).getTime() <= 0 ? 1 : -1
    )
    .slice(PAGE_LIMIT * (currentPage - 1), PAGE_LIMIT * currentPage);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <DataItem>
      <DataHeader>
        <DataTitle>Recent Transactions</DataTitle>
        <DataPagination>
          <IconButtonLeft
            isDisabled={isFirstPage}
            onClick={isFirstPage ? undefined : () => setCurrentPage(currentPage - 1)}
          >
            <ArrowLeftIcon />
          </IconButtonLeft>
          <DataPaginationTextWrapper>
            <DataPaginationTextCurrentPage>{currentPage}</DataPaginationTextCurrentPage>
            <DataPaginationText>&nbsp;/ {totalPages}</DataPaginationText>
          </DataPaginationTextWrapper>
          <IconButtonRight
            isDisabled={isLastPage}
            onClick={isLastPage ? undefined : () => setCurrentPage(currentPage + 1)}
          >
            <ArrowRightIcon />
          </IconButtonRight>
        </DataPagination>
      </DataHeader>
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
          {transaction.inputs.map(
            (input) =>
              input.__typename === 'InputCoin' && (
                <>
                  <TransactionRecipientLabel>From:</TransactionRecipientLabel>
                  {input.__typename}
                  <TransactionRecipientLink to={`/address/${input.owner}`}>
                    {input.owner}
                  </TransactionRecipientLink>
                </>
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
