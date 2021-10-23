import { Header } from "../../components/Header";
import {
  Container,
  Content,
  CopyButtonIcon,
  Tooltip,
  HeadlineAddress,
  HeadlineAddressButton,
  HeadlineAddressContainer,
  HeadlineAddressHeader,
  HeadlineCoinsContainer,
  HeadlineContainer,
  QRButtonIcon,
  TableContainer,
  CoinsCounterLabel,
  CoinsCounter,
  TokenDropdownContainer,
  TokenButton,
  TokenButtonSymbol,
  TokenButtonAmount,
  TokenButtonSeparator,
  TokenButtonIconContainer,
  TokenDropdownIcon,
  TableHeadlineContainer,
  TableHeadlinerContentItem,
  TableHeadlineTitle,
  TableHeadlineDisclaimer,
  HeadlineHighlighedDisclaimer,
  Table,
  TableHeadRow,
  TableRow,
  TableHeadCell,
  TableCell,
  TxHash,
  TxRecipient,
  BoldText,
  TransactionValue,
  CoinLink,
  TableNavigationButtons,
  TableNavigationNumberButton,
  TableNavigationTextButton,
  TableNavigationNumbersContainer,
  TableWrapper,
  TableNextNavigationTextButton
} from "./components";
import { useParams } from 'react-router-dom'
import { useState } from "react";
import { QRModal } from "../../components/Modals/QRModal";
import { Transactions } from './constants';

export function AddressPage() {
  const { address } = useParams() as any
  const [copyTooltip] = useState('Copy address')
  const [modal, setModal] = useState(false)

  function onClose() {
    setModal(false)
  }

  function showModal() {
    setModal(true)
  }

  function onClickCopy() {
    navigator.clipboard.writeText(address)
  }

  return (
    <>
      {modal && <QRModal onClose={onClose} address={address} />}
      <Header />
      <Container>
        <Content>
          <HeadlineContainer>
            <HeadlineAddressContainer>
              <HeadlineAddressHeader>
                {`Address:  `}
                <HeadlineAddress>{address}</HeadlineAddress>
              </HeadlineAddressHeader>
              <HeadlineAddressButton onClick={() => { onClickCopy() }}>
                <CopyButtonIcon />
                <Tooltip>{copyTooltip}</Tooltip>
              </HeadlineAddressButton>
              <HeadlineAddressButton onClick={showModal}>
                <QRButtonIcon />
                <Tooltip>Click to copy QR code</Tooltip>
              </HeadlineAddressButton>
            </HeadlineAddressContainer>
            <HeadlineCoinsContainer>
              <CoinsCounterLabel>
                Coins:
                <CoinsCounter>3</CoinsCounter>
              </CoinsCounterLabel>
              <TokenDropdownContainer>
                <TokenButton>
                  <TokenButtonSymbol>ETH:</TokenButtonSymbol>
                  <TokenButtonAmount>435.3</TokenButtonAmount>
                  <TokenButtonSeparator></TokenButtonSeparator>
                  <TokenButtonIconContainer>
                    <TokenDropdownIcon />
                  </TokenButtonIconContainer>
                </TokenButton>
              </TokenDropdownContainer>
            </HeadlineCoinsContainer>
          </HeadlineContainer>
          <TransactionsTable />
        </Content>
      </Container>
    </>
  )
}

export function TransactionsTable() {
  function trimAddress(address: string) {
    if (!address) { return '' }

    return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`
  }

  return (
    <TableContainer>
      <TableHeadlineContainer>
        <TableHeadlineTitle>Transactions</TableHeadlineTitle>
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
                  <TxRecipient key={idx} to={`/address/${subtransaction.from}`}>{trimAddress(subtransaction.from)}</TxRecipient>
                ))}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subtransaction, idx) => subtransaction.to ? (
                  <TxRecipient key={idx} to={`/address/${subtransaction.to}`}>
                    {trimAddress(subtransaction.from)}
                  </TxRecipient>
                ) : (
                  <BoldText>N/A</BoldText>
                ))}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subTransaction, idx) => (
                  <TransactionValue key={idx}>{subTransaction.value ? subTransaction.value : 'N/A'}</TransactionValue>
                ))}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subTransaction, idx) => (
                  subTransaction.coin ? (
                    <CoinLink key={idx} to={`/coin/${subTransaction.coin}`}>{subTransaction.coin ? subTransaction.coin : 'N/A'}</CoinLink>
                  ) : (
                    <BoldText>N/A</BoldText>
                  )
                ))}
              </TableCell>
              <TableCell>
                {transaction.subTransactions.map((subTransaction, idx) => (
                  <TransactionValue key={idx}>{subTransaction.fee ? `$${subTransaction.fee.toFixed(2)}` : ''}</TransactionValue>
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
  const pages = [1, 2, 3, 4]
  const [selectedPage, selectPage] = useState(1)

  function onSelectPage(idx: number) {
    selectPage(idx)
  }

  function onClickPrevPage() {
    selectPage(prevPage => prevPage - 1)
  }

  function onClickNextPage() {
    selectPage(prevPage => prevPage + 1)
  }

  function onClickLastPage() {
    selectPage(pages[pages.length - 1])
  }

  function onClickFirstPage() {
    selectPage(1)
  }

  return (
    <TableNavigationButtons>
      <TableNavigationTextButton disabled={selectedPage === 1} onClick={onClickFirstPage}>First</TableNavigationTextButton>
      <TableNextNavigationTextButton disabled={selectedPage === 1} onClick={onClickPrevPage}>Previous</TableNextNavigationTextButton>
      <TableNavigationNumbersContainer>
        {pages.map((pageIdx) => (
          <TableNavigationNumberButton key={pageIdx} isSelected={pageIdx === selectedPage} onClick={() => { onSelectPage(pageIdx) }}>
            {pageIdx}
          </TableNavigationNumberButton>))}
      </TableNavigationNumbersContainer>
      <TableNextNavigationTextButton disabled={selectedPage === pages[pages.length - 1]} onClick={onClickNextPage}>Next</TableNextNavigationTextButton>
      <TableNavigationTextButton disabled={selectedPage === pages[pages.length - 1]} onClick={onClickLastPage}>Last</TableNavigationTextButton>
    </TableNavigationButtons>
  )
}
