import { useMemo, useState, Fragment } from 'react';

import type { PageInfo } from '../../api/__generated__/types';
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
  loading: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  pageInfo?: PageInfo;
  currentPage: number;
};

type Ouputs = HomePageTransaction['outputs'];
const PAGE_LIMIT = 5;

export function RecentTransactions({
  transactions,
  loading,
  onNextPage,
  onPrevPage,
  pageInfo,
  currentPage,
}: Props) {
  const sortedTransactions = transactions.sort((t1, t2) =>
    new Date(t1.status!.time).getTime() - new Date(t2.status!.time).getTime() <= 0 ? 1 : -1
  );

  const isPrevPageClickable = currentPage > 1 && pageInfo?.hasPreviousPage && !loading;
  const isNextPageClickable = pageInfo?.hasNextPage && !loading;

  return (
    <DataItem>
      <DataHeader>
        <DataTitle>Recent Transactions</DataTitle>
        <DataPagination>
          <IconButtonLeft
            isDisabled={!isPrevPageClickable}
            onClick={isPrevPageClickable ? onPrevPage : undefined}
          >
            <ArrowLeftIcon />
          </IconButtonLeft>
          <DataPaginationTextWrapper>
            <DataPaginationTextCurrentPage>{currentPage}</DataPaginationTextCurrentPage>
          </DataPaginationTextWrapper>
          <IconButtonRight
            isDisabled={!isNextPageClickable}
            onClick={isNextPageClickable ? onNextPage : undefined}
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
                <Fragment key={input.owner}>
                  <TransactionRecipientLabel>From:</TransactionRecipientLabel>
                  {input.__typename}
                  <TransactionRecipientLink to={`/address/${input.owner}`}>
                    {input.owner}
                  </TransactionRecipientLink>
                </Fragment>
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
                <Fragment key={output.assetId + output.to}>
                  <TransactionRecipientLabel>To:</TransactionRecipientLabel>
                  {output.__typename}
                  <TransactionRecipientLink to={`/address/${output.to}`}>
                    {output.to}
                  </TransactionRecipientLink>
                </Fragment>
              )
          )}
        </TransactionRecipientsWrapper>
      </TransactionRecipientsColumn>
    </TransactionsDataBoxRow>
  );
}
