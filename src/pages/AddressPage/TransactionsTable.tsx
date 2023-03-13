import * as TableUI from '../../components/Table/components';
import { trimAddress } from '../../utils';
// import { dateDiffRelative, getTextForRelativeTimeDifference } from '../../utils/date';

import type { AddressPageTransaction } from './__generated__/operations';
import {
  TableHeadlineDisclaimer,
  HeadlineHighlighedDisclaimer,
  TxHash,
  TxRecipient,
  TransactionFromAddressWrapper,
  ContractLinkSkip,
} from './components';

export default function TransactionsTable({
  transactions,
}: {
  transactions: AddressPageTransaction[];
}) {
  return (
    <TableUI.TableContainer>
      <TableUI.TableHeadlineContainer>
        <TableUI.TableHeadlineTitle>Transactions</TableUI.TableHeadlineTitle>
        <TableUI.TableHeadlinerContentItem>
          <TableHeadlineDisclaimer>
            {`Showing `}
            <HeadlineHighlighedDisclaimer>
              {transactions?.length || '0'}
            </HeadlineHighlighedDisclaimer>
            {` out of `}
            <HeadlineHighlighedDisclaimer>
              {transactions?.length || '0'}
            </HeadlineHighlighedDisclaimer>
            {` transactions`}
          </TableHeadlineDisclaimer>
        </TableUI.TableHeadlinerContentItem>
      </TableUI.TableHeadlineContainer>
      <TableUI.TableWrapper>
        <TableUI.Table>
          <TableUI.TableHeadRow>
            <TableUI.TableHeadCell>Tx Hash</TableUI.TableHeadCell>
            <TableUI.TableHeadCell>Type</TableUI.TableHeadCell>
            {/* <TableUI.TableHeadCell>Age</TableUI.TableHeadCell> */}
            <TableUI.TableHeadCell>From</TableUI.TableHeadCell>
          </TableUI.TableHeadRow>
          {transactions.map((transaction) => (
            <TableUI.TableRow key={transaction.id}>
              <TableUI.TableCell>
                <TxHash to={`/transaction/${transaction.id}`}>{transaction.id}</TxHash>
              </TableUI.TableCell>
              <TableUI.TableCell>{transaction.isScript ? 'Script' : 'Create'}</TableUI.TableCell>
              {/* <TableUI.TableCell>
                {transaction.status ? (
                  <>
                    {getTextForRelativeTimeDifference(
                      dateDiffRelative(new Date(), new Date(transaction.status.time))
                    )}
                  </>
                ) : null}
              </TableUI.TableCell> */}
              <TableUI.TableCell>
                {transaction.inputs?.map((input, idx) =>
                  (() => {
                    switch (input.__typename) {
                      case 'InputCoin': {
                        return (
                          <TransactionFromAddressWrapper key={idx}>
                            <TxRecipient to={`/address/${input.owner}`}>
                              {trimAddress(input.owner)}
                            </TxRecipient>
                          </TransactionFromAddressWrapper>
                        );
                      }
                      case 'InputContract': {
                        return (
                          <ContractLinkSkip key={idx} to="">
                            {trimAddress(input.contract.id)}
                          </ContractLinkSkip>
                        );
                      }
                      default: {
                        // @ts-ignore
                        return input.__typename;
                      }
                    }
                  })()
                )}
              </TableUI.TableCell>
            </TableUI.TableRow>
          ))}
        </TableUI.Table>
      </TableUI.TableWrapper>
    </TableUI.TableContainer>
  );
}
