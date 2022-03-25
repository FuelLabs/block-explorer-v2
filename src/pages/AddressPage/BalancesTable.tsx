// import { useState } from "react";
import {
  TableHeadlineDisclaimer,
  HeadlineHighlighedDisclaimer,
  // TableNavigationButtons,
  // TableNavigationNumberButton,
  // TableNavigationTextButton,
  // TableNavigationNumbersContainer,
  // TableNextNavigationTextButton,
} from "./components";
import * as TableUI from "../../components/Table/components";
import { CoinQuantity } from "fuels";

export default function BalancesTable({ balances }: { balances: CoinQuantity[] }) {
  function trimAddress(address: string) {
    if (!address) {
      return "";
    }

    return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`;
  }

  return (
    <>
      <TableUI.TableContainer>
        <TableUI.TableHeadlineContainer>
          <TableUI.TableHeadlineTitle>Balances</TableUI.TableHeadlineTitle>
          <TableUI.TableHeadlinerContentItem>
            <TableHeadlineDisclaimer>
              {`Showing `}
              <HeadlineHighlighedDisclaimer>{balances?.length || "0"}</HeadlineHighlighedDisclaimer>
              {` out of `}
              <HeadlineHighlighedDisclaimer>{balances?.length || "0"}</HeadlineHighlighedDisclaimer>
              {` balances`}
            </TableHeadlineDisclaimer>
          </TableUI.TableHeadlinerContentItem>
        </TableUI.TableHeadlineContainer>
        <TableUI.TableWrapper>
          <TableUI.Table>
            <TableUI.TableHeadRow>
              <TableUI.TableHeadCell>Color</TableUI.TableHeadCell>
              <TableUI.TableHeadCell>Amount</TableUI.TableHeadCell>
            </TableUI.TableHeadRow>
            {balances.map((balance) => (
              <TableUI.TableRow key={balance.assetId}>
                <TableUI.TableCell>{trimAddress(balance.assetId)}</TableUI.TableCell>
                <TableUI.TableCell>{balance.amount.toString()}</TableUI.TableCell>
              </TableUI.TableRow>
            ))}
          </TableUI.Table>
        </TableUI.TableWrapper>
      </TableUI.TableContainer>
    </>
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
