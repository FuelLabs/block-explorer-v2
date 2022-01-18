import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { queries } from "../../api";
import { Header } from "../../components/Header";
import {
  Table,
  TableCell,
  TableCounterText,
  TableHeadCell,
  TableHeadlineContainer,
  TableHeadlinerContentItem,
  TableHeadlineTitle,
  TableHeadRow,
  TableRow,
  TableWrapper
} from "../../components/Table/components";
import { trimAddress } from "../../utils/address";
import { dateDiffRelative, getTextForRelativeTimeDifference } from "../../utils/date";
import { CoinOutput, Transaction } from "../../utils/model";
import { InputCoin, InputContract } from "../../utils/model/input";
import { Block } from "../../utils/models";
import { TableContainer } from "../AddressPage/components";
import {
  CoinLink,
  Container,
  Content,
  HeadlineTransactionsNumber,
  Subtitle,
  Title,
  TxHashLink,
  TxRecipientLink,
  TxValue
} from "./components";

export function BlockTransactionsPage() {
  const { block } = useParams() as any;
  const blockByHeightQuery = useQuery(queries.getBlockByHeight, {
    variables: { height: parseInt(block) }
  });
  const bl = useMemo<Block>(() => {
    return blockByHeightQuery?.data?.block;
  }, [blockByHeightQuery?.data]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>Transaction list</Title>
          <Subtitle>{`Block: #${block}`}</Subtitle>
          <Transactions transactions={bl?.transactions || []} />
        </Content>
      </Container>
    </>
  );
}

const Transactions: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  return (
    <TableContainer>
      <TableHeadlineContainer>
        <TableHeadlineTitle>Transactions</TableHeadlineTitle>
        <TableHeadlinerContentItem>
          <TableCounterText>
            {`Showing `}
            <HeadlineTransactionsNumber>1</HeadlineTransactionsNumber>
            {` out of `}
            <HeadlineTransactionsNumber>1</HeadlineTransactionsNumber>
            {` transactions`}
          </TableCounterText>
        </TableHeadlinerContentItem>
      </TableHeadlineContainer>
      <TableWrapper>
        <Table>
          <thead>
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
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <TxHashLink to={`/transaction/${transaction.id}`}>{transaction.id}</TxHashLink>
                </TableCell>
                <TableCell>{transaction.isScript ? "Script" : "Create"}</TableCell>
                <TableCell>
                  {getTextForRelativeTimeDifference(
                    dateDiffRelative(new Date(), new Date(transaction.status.time))
                  )}
                </TableCell>
                <TableCell>
                  {transaction.inputs.map((input, idx) =>
                    (() => {
                      if (input.__typename === "InputCoin") {
                        return (
                          <TxRecipientLink key={idx} to={`/address/${(input as InputCoin).owner}`}>
                            {trimAddress((input as InputCoin).owner)}
                          </TxRecipientLink>
                        );
                      }
                      if (input.__typename === "InputContract") {
                        return (
                          <TxRecipientLink
                            key={idx}
                            to={`/address/${(input as InputContract).contractId}`}
                          >
                            {trimAddress((input as InputContract).contractId)}
                          </TxRecipientLink>
                        );
                      }
                      return input.__typename;
                    })()
                  )}
                </TableCell>
                <TableCell>
                  {transaction.outputs.map((output, idx) =>
                    (() => {
                      if (output.__typename === "CoinOutput") {
                        return (
                          <TxRecipientLink key={idx} to={`/address/${(output as CoinOutput).to}`}>
                            {trimAddress((output as CoinOutput).to)}
                          </TxRecipientLink>
                        );
                      }
                      return output.__typename;
                    })()
                  )}
                </TableCell>
                <TableCell>
                  {transaction.outputs.map((output, idx) =>
                    (() => {
                      if (output.__typename === "CoinOutput") {
                        return <TxValue key={idx}>{(output as CoinOutput).amount}</TxValue>;
                      }
                      return `N/A ${output.__typename}`;
                    })()
                  )}
                </TableCell>
                <TableCell>
                  {transaction.outputs.map((output, idx) =>
                    (() => {
                      if (output.__typename === "CoinOutput") {
                        return (
                          <CoinLink key={idx} to={`/coin`}>
                            {(output as CoinOutput).color}
                          </CoinLink>
                        );
                      }
                      return "N/A";
                    })()
                  )}
                </TableCell>
                <TableCell bold>N/A</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};
