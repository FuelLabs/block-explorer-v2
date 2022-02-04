import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
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
  CoinsCounterLabel,
  CoinsCounter,
  TokenDropdownContainer,
  TokenButton,
  TokenButtonSymbol,
  TokenButtonAmount,
  TokenButtonSeparator,
  TokenButtonIconContainer,
  TokenDropdownIcon,
  TableHeadlineDisclaimer,
  HeadlineHighlighedDisclaimer,
  TxHash,
  TxRecipient,
  TransactionValue,
  CoinLink,
  TableNavigationButtons,
  TableNavigationNumberButton,
  TableNavigationTextButton,
  TableNavigationNumbersContainer,
  TableNextNavigationTextButton,
} from "./components";
import { QRModal } from "../../components/Modals/QRModal";
import * as TableUI from "../../components/Table/components";
import { dateDiffRelative, getTextForRelativeTimeDifference } from "../../utils/date";
import { AddressPageTransaction, useAddressPageQuery } from "./__generated__/operations";

export function AddressPage() {
  const { address } = useParams() as any;
  const [copyTooltip] = useState("Copy address");
  const [modal, setModal] = useState(false);
  const { loading, data } = useAddressPageQuery({
    variables: { first: 10, owner: address },
  });
  const transactions = useMemo<AddressPageTransaction[]>(() => {
    return data?.transactionsByOwner!.edges!.map((edge) => edge!.node) ?? [];
  }, [data]);

  function onClose() {
    setModal(false);
  }

  function showModal() {
    setModal(true);
  }

  function onClickCopy() {
    navigator.clipboard.writeText(address);
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <Content>
            <HeadlineContainer>
              <HeadlineAddressContainer>
                <HeadlineAddressHeader>
                  {`Address:  `}
                  <HeadlineAddress>{address}</HeadlineAddress>
                </HeadlineAddressHeader>
              </HeadlineAddressContainer>
            </HeadlineContainer>
          </Content>
        </Container>
      </>
    );
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
              <HeadlineAddressButton
                onClick={() => {
                  onClickCopy();
                }}
              >
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
                  <TokenButtonAmount>0</TokenButtonAmount>
                  <TokenButtonSeparator></TokenButtonSeparator>
                  <TokenButtonIconContainer>
                    <TokenDropdownIcon />
                  </TokenButtonIconContainer>
                </TokenButton>
              </TokenDropdownContainer>
            </HeadlineCoinsContainer>
          </HeadlineContainer>
          <TransactionsTable transactions={transactions} />
        </Content>
      </Container>
    </>
  );
}

export function TransactionsTable({ transactions }: { transactions: AddressPageTransaction[] }) {
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
          <TableUI.TableHeadlineTitle>Transactions</TableUI.TableHeadlineTitle>
          <TableUI.TableHeadlinerContentItem>
            <TableHeadlineDisclaimer>
              {`Showing `}
              <HeadlineHighlighedDisclaimer>
                {transactions?.length || "0"}
              </HeadlineHighlighedDisclaimer>
              {` out of `}
              <HeadlineHighlighedDisclaimer>
                {transactions?.length || "0"}
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
              <TableUI.TableHeadCell>To</TableUI.TableHeadCell>
              <TableUI.TableHeadCell>Value</TableUI.TableHeadCell>
              <TableUI.TableHeadCell>Coin</TableUI.TableHeadCell>
              <TableUI.TableHeadCell>Fee (USD)</TableUI.TableHeadCell>
            </TableUI.TableHeadRow>
            {transactions.map((transaction) => (
              <TableUI.TableRow key={transaction.id}>
                <TableUI.TableCell>
                  <TxHash to={`/transaction/${transaction.id}`}>{transaction.id}</TxHash>
                </TableUI.TableCell>
                <TableUI.TableCell>{transaction.isScript ? "Script" : "Create"}</TableUI.TableCell>
                <TableUI.TableCell>
                  {transaction.status ? (
                    <>
                      {getTextForRelativeTimeDifference(
                        dateDiffRelative(new Date(), new Date(transaction.status.time)),
                      )}
                    </>
                  ) : null}
                </TableUI.TableCell>
                <TableUI.TableCell>
                  {transaction.inputs.map((input, idx) =>
                    (() => {
                      switch (input.__typename) {
                        case "InputCoin": {
                          return (
                            <TxRecipient key={idx} to={`/address/${input.owner}`}>
                              {trimAddress(input.owner)}
                            </TxRecipient>
                          );
                        }
                        case "InputContract": {
                          return (
                            <TxRecipient key={idx} to={`/address/${input.contractId}`}>
                              {trimAddress(input.contractId)}
                            </TxRecipient>
                          );
                        }
                        default: {
                          // @ts-ignore
                          return input.__typename;
                        }
                      }
                    })(),
                  )}
                </TableUI.TableCell>
                <TableUI.TableCell>
                  {transaction.outputs.length > 0
                    ? transaction.outputs.map((output, idx) =>
                        (() => {
                          if (output.__typename === "CoinOutput") {
                            return (
                              <TxRecipient key={idx} to={`/address/${output.to}`}>
                                {trimAddress(output.to)}
                              </TxRecipient>
                            );
                          }
                          return output.__typename;
                        })(),
                      )
                    : "N/A"}
                </TableUI.TableCell>
                <TableUI.TableCell>
                  {transaction.outputs.length > 0
                    ? transaction.outputs.map((output, idx) =>
                        (() => {
                          if (output.__typename === "CoinOutput") {
                            return <TransactionValue key={idx}>{output.amount}</TransactionValue>;
                          }
                          return `${output.__typename}`;
                        })(),
                      )
                    : "N/A"}
                </TableUI.TableCell>
                <TableUI.TableCell>
                  {transaction.outputs.map((output, idx) =>
                    (() => {
                      if (output.__typename === "CoinOutput") {
                        return (
                          <CoinLink key={idx} to={`/coin`}>
                            {output.color}
                          </CoinLink>
                        );
                      }
                      return output.__typename;
                    })(),
                  )}
                </TableUI.TableCell>
                <TableUI.TableCell>N/A</TableUI.TableCell>
              </TableUI.TableRow>
            ))}
          </TableUI.Table>
        </TableUI.TableWrapper>
      </TableUI.TableContainer>
    </>
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
