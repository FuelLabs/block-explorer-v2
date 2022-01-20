import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import {
  CoinDetailsContainer,
  CoinDetailsRow,
  CoinIcon,
  KeyLabel,
  KeyValue,
  CoinName,
  CoinSymbolContainer,
  Container,
  Content,
  Title,
  ContractLink,
  TableHeadlineDisclaimer,
  TableTabsContainer,
  TableTabButton,
} from "./components";
import {
  TableContainer,
  TableHeadlineContainer,
  TableHeadlinerContentItem,
  Table,
  HeadlineHighlighedDisclaimer,
  TableHeadRow,
  TableHeadCell,
  TableCell,
  TableRow,
  TransactionValue,
  TxHash,
  TableNavigationButtons,
  TableNavigationNumbersContainer,
  TableNavigationNumberButton,
  TableNavigationTextButton,
  TxRecipient,
  BoldText,
  CoinLink,
  TableWrapper,
  TableNextNavigationTextButton,
} from "../AddressPage/components";
import { Transactions } from "../AddressPage/constants";

export function CoinPage() {
  const { coin } = useParams() as any;

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>
            Token:
            <CoinSymbolContainer>
              <CoinIcon />
            </CoinSymbolContainer>
            <CoinName>{coin}</CoinName>
          </Title>
          <CoinDetailsContainer>
            <CoinDetailsRow>
              <KeyLabel>Format:</KeyLabel>
              <KeyValue>ERC-777</KeyValue>
            </CoinDetailsRow>
            <CoinDetailsRow>
              <KeyLabel>Max Supply:</KeyLabel>
              <KeyValue>
                {Number(10000000).toLocaleString("en", { minimumFractionDigits: 2 })}
              </KeyValue>
            </CoinDetailsRow>
            <CoinDetailsRow>
              <KeyLabel>Total Supply in Fuel:</KeyLabel>
              <KeyValue>14%</KeyValue>
            </CoinDetailsRow>
            <CoinDetailsRow>
              <KeyLabel>Holders in Fuel:</KeyLabel>
              <KeyValue>50</KeyValue>
            </CoinDetailsRow>
            <CoinDetailsRow>
              <KeyLabel>Decimals:</KeyLabel>
              <KeyValue>18</KeyValue>
            </CoinDetailsRow>
            <CoinDetailsRow>
              <KeyLabel>Contract:</KeyLabel>
              <KeyValue>
                <ContractLink to={`/contract/0xc5d2460186f7233c927e7db2dcc703c0e500}`}>
                  0xc5d2460186f7233c927e7db2dcc703c0e500
                </ContractLink>
              </KeyValue>
            </CoinDetailsRow>
          </CoinDetailsContainer>
          <TransactionsTable />
        </Content>
      </Container>
    </>
  );
}

export function TransactionsTable() {
  function trimAddress(address: string) {
    if (!address) {
      return "";
    }

    return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`;
  }

  return (
    <TableContainer>
      <TableTabsContainer>
        <TableTabButton isSelected>Transactions</TableTabButton>
        <TableTabButton>Info</TableTabButton>
      </TableTabsContainer>
      <TableHeadlineContainer>
        <TableHeadlinerContentItem>
          <TableHeadlineDisclaimer>
            {`Showing `}
            <HeadlineHighlighedDisclaimer>3</HeadlineHighlighedDisclaimer>
            {` out of `}
            <HeadlineHighlighedDisclaimer>3</HeadlineHighlighedDisclaimer>
            {` transactions`}
          </TableHeadlineDisclaimer>
          <TableNavigation />
        </TableHeadlinerContentItem>
      </TableHeadlineContainer>
      <TableWrapper>
        <Table>
          <TableHeadRow>
            <TableHeadCell>Tx Hash</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Age</TableHeadCell>
            <TableHeadCell>From</TableHeadCell>
            <TableHeadCell>To</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Coin</TableHeadCell>
            <TableHeadCell>Fee (USD)</TableHeadCell>
          </TableHeadRow>
          {Transactions.map((transaction, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <TxHash to={`/transaction/${transaction.hash}`}>{transaction.hash}</TxHash>
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.timestamp}</TableCell>
              <TableCell>
                {transaction.subTransactions.map((subtransaction, idx) => (
                  <TxRecipient key={idx} to={`/address/${subtransaction.from}`}>
                    {trimAddress(subtransaction.from)}
                  </TxRecipient>
                ))}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subtransaction, idx) =>
                  subtransaction.to ? (
                    <TxRecipient key={idx} to={`/address/${subtransaction.to}`}>
                      {trimAddress(subtransaction.from)}
                    </TxRecipient>
                  ) : (
                    <BoldText>N/A</BoldText>
                  ),
                )}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subTransaction, idx) => (
                  <TransactionValue key={idx}>
                    {subTransaction.value ? subTransaction.value : "N/A"}
                  </TransactionValue>
                ))}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subTransaction, idx) =>
                  subTransaction.coin ? (
                    <CoinLink key={idx} to={`/coin/${subTransaction.coin}`}>
                      {subTransaction.coin ? subTransaction.coin : "N/A"}
                    </CoinLink>
                  ) : (
                    <BoldText>N/A</BoldText>
                  ),
                )}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subTransaction, idx) => (
                  <TransactionValue key={idx}>
                    {subTransaction.fee ? `$${subTransaction.fee.toFixed(2)}` : ""}
                  </TransactionValue>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableWrapper>
    </TableContainer>
  );
}

function TableNavigation() {
  const pages = [1, 2, 3, 4];
  const [selectedPage, selectPage] = useState(1);

  function onSelectPage(idx: number) {
    selectPage(idx);
  }

  function onClickPrevPage() {
    selectPage((prevPage) => prevPage - 1);
  }

  function onClickNextPage() {
    selectPage((prevPage) => prevPage + 1);
  }

  function onClickLastPage() {
    selectPage(pages[pages.length - 1]);
  }

  function onClickFirstPage() {
    selectPage(1);
  }

  return (
    <TableNavigationButtons>
      <TableNavigationTextButton disabled={selectedPage === 1} onClick={onClickFirstPage}>
        First
      </TableNavigationTextButton>
      <TableNextNavigationTextButton disabled={selectedPage === 1} onClick={onClickPrevPage}>
        Previous
      </TableNextNavigationTextButton>
      <TableNavigationNumbersContainer>
        {pages.map((pageIdx) => (
          <TableNavigationNumberButton
            key={pageIdx}
            isSelected={pageIdx === selectedPage}
            onClick={() => {
              onSelectPage(pageIdx);
            }}
          >
            {pageIdx}
          </TableNavigationNumberButton>
        ))}
      </TableNavigationNumbersContainer>
      <TableNextNavigationTextButton
        disabled={selectedPage === pages[pages.length - 1]}
        onClick={onClickNextPage}
      >
        Next
      </TableNextNavigationTextButton>
      <TableNavigationTextButton
        disabled={selectedPage === pages[pages.length - 1]}
        onClick={onClickLastPage}
      >
        Last
      </TableNavigationTextButton>
    </TableNavigationButtons>
  );
}
