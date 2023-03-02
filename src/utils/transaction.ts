// we will need this kind of info in the fuels-wallet txUtils as well

import type { BlockTransactionFragment } from '../pages/BlockTransactionsPage/__generated__/operations';

import { tai64toDate, dateDiff, dateDiffRelative, getTextForRelativeTimeDifference } from './date';

export function getTransactionDate(transaction: Pick<BlockTransactionFragment, 'status'>) {
  switch (transaction.status?.__typename) {
    case 'SubmittedStatus':
    case 'SuccessStatus':
    case 'FailureStatus':
      return tai64toDate(transaction.status?.time);
    default:
      return undefined;
  }
}

export function getTransactionDateDiff(transaction: BlockTransactionFragment) {
  const date = getTransactionDate(transaction);

  return date ? dateDiff(new Date(), date) : undefined;
}

export function getTransactionRelativeTimeDifference(
  transaction: Pick<BlockTransactionFragment, 'status'>
) {
  const date = getTransactionDate(transaction);

  return date ? getTextForRelativeTimeDifference(dateDiffRelative(new Date(), date)) : undefined;
}
