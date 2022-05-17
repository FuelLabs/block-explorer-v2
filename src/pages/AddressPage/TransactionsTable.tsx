// import { useState } from "react";
import * as TableUI from '../../components/Table/components';
import { parseToFormattedNumber } from '../../utils/bigNumber';
import { dateDiffRelative, getTextForRelativeTimeDifference } from '../../utils/date';
import { UTXOHashOutputSkip } from '../TransactionPage/components';

import type { AddressPageTransaction } from './__generated__/operations';
import {
  TableHeadlineDisclaimer,
  HeadlineHighlighedDisclaimer,
  TxHash,
  TxRecipient,
  TransactionValue,
  CoinLink,
  CoinLinkSkip,
  CopyButtonIcon,
  Tooltip,
  HeadlineAddressButton,
  TransactionFromAddressWrapper,
  TableHeadlineAddressButton,
  ContractLinkSkip,
  // TableNavigationButtons,
  // TableNavigationNumberButton,
  // TableNavigationTextButton,
  // TableNavigationNumbersContainer,
  // TableNextNavigationTextButton,
} from './components';

export default function TransactionsTable({
  transactions,
}: {
  transactions: AddressPageTransaction[];
}) {
  function trimAddress(address: string) {
    if (!address) {
      return '';
    }

    return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`;
  }

  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

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
            <TableUI.TableHeadCell>Age</TableUI.TableHeadCell>
            <TableUI.TableHeadCell>From</TableUI.TableHeadCell>
          </TableUI.TableHeadRow>
          {transactions.map((transaction) => (
            <TableUI.TableRow key={transaction.id}>
              <TableUI.TableCell>
                <TxHash to={`/transaction/${transaction.id}`}>{transaction.id}</TxHash>
              </TableUI.TableCell>
              <TableUI.TableCell>{transaction.isScript ? 'Script' : 'Create'}</TableUI.TableCell>
              <TableUI.TableCell>
                {transaction.status ? (
                  <>
                    {getTextForRelativeTimeDifference(
                      dateDiffRelative(new Date(), new Date(transaction.status.time))
                    )}
                  </>
                ) : null}
              </TableUI.TableCell>
              <TableUI.TableCell>
                {transaction.inputs.map((input, idx) =>
                  (() => {
                    switch (input.__typename) {
                      case 'InputCoin': {
                        return (
                          <TransactionFromAddressWrapper key={idx}>
                            <TxRecipient  to={`/address/${input.owner}`}>
                              {trimAddress(input.owner)}
                            </TxRecipient>
                            <TableHeadlineAddressButton
                              onClick={() => {
                                onClickCopy(input.owner);
                              }}
                            >
                              <CopyButtonIcon />
                              <Tooltip>Copy Address</Tooltip>
                            </TableHeadlineAddressButton>
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

// function TableNavigation() {
//   const pages = [1, 2, 3, 4];
//   const [selectedPage, selectPage] = useState(1);

//   function onSelectPage(idx: number) {
//     selectPage(idx);
//   }

//   function onClickPrevPage() {
//     selectPage((prevPage) => prevPage - 1);
//   }

//   function onClickNextPage() {
//     selectPage((prevPage) => prevPage + 1);
//   }

//   function onClickLastPage() {
//     selectPage(pages[pages.length - 1]);
//   }

//   function onClickFirstPage() {
//     selectPage(1);
//   }

//   return (
//     <TableNavigationButtons>
//       <TableNavigationTextButton disabled={selectedPage === 1} onClick={onClickFirstPage}>
//         First
//       </TableNavigationTextButton>
//       <TableNextNavigationTextButton disabled={selectedPage === 1} onClick={onClickPrevPage}>
//         Previous
//       </TableNextNavigationTextButton>
//       <TableNavigationNumbersContainer>
//         {pages.map((pageIdx) => (
//           <TableNavigationNumberButton
//             key={pageIdx}
//             isSelected={pageIdx === selectedPage}
//             onClick={() => {
//               onSelectPage(pageIdx);
//             }}
//           >
//             {pageIdx}
//           </TableNavigationNumberButton>
//         ))}
//       </TableNavigationNumbersContainer>
//       <TableNextNavigationTextButton
//         disabled={selectedPage === pages[pages.length - 1]}
//         onClick={onClickNextPage}
//       >
//         Next
//       </TableNextNavigationTextButton>
//       <TableNavigationTextButton
//         disabled={selectedPage === pages[pages.length - 1]}
//         onClick={onClickLastPage}
//       >
//         Last
//       </TableNavigationTextButton>
//     </TableNavigationButtons>
//   );
// }
