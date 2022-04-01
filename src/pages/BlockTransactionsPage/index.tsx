import { BigNumber } from '@ethersproject/bignumber';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
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
  TableWrapper,
} from '../../components/Table/components';
import { trimAddress } from '../../utils/address';
import { dateDiffRelative, getTextForRelativeTimeDifference } from '../../utils/date';
import { TableContainer } from '../AddressPage/components';

import type { BlockTransactionFragment } from './__generated__/operations';
import { useBlockTransactionsPageQuery } from './__generated__/operations';
import {
  CoinLink,
  Container,
  Content,
  HeadlineTransactionsNumber,
  Subtitle,
  Title,
  TxHashLink,
  TxRecipientLink,
  TxValue,
} from './components';

export default function BlockTransactionsPage() {
  const { block } = useParams() as any;
  const { data } = useBlockTransactionsPageQuery({
    variables: { height: BigNumber.from(block).toString() },
  });
  const bl = data?.block;

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

function Transactions({ transactions }: { transactions: BlockTransactionFragment[] }) {
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
                <TableCell>{transaction.isScript ? 'Script' : 'Create'}</TableCell>
                <TableCell>
                  {transaction.status ? (
                    <>
                      {getTextForRelativeTimeDifference(
                        dateDiffRelative(new Date(), new Date(transaction.status.time))
                      )}
                    </>
                  ) : null}
                </TableCell>
                <TableCell>
                  {transaction.inputs.map((input, idx) =>
                    (() => {
                      switch (input.__typename) {
                        case 'InputCoin': {
                          return (
                            <TxRecipientLink key={idx} to={`/address/${input.owner}`}>
                              {trimAddress(input.owner)}
                            </TxRecipientLink>
                          );
                        }
                        case 'InputContract': {
                          return (
                            <TxRecipientLink key={idx} to={`/address/${input.contract.id}`}>
                              {trimAddress(input.contract.id)}
                            </TxRecipientLink>
                          );
                        }
                        default: {
                          // @ts-ignore
                          return input.__typename;
                        }
                      }
                    })()
                  )}
                </TableCell>
                <TableCell>
                  {transaction.outputs.map((output, idx) =>
                    (() => {
                      if (output.__typename === 'CoinOutput') {
                        return (
                          <TxRecipientLink key={idx} to={`/address/${output.to}`}>
                            {trimAddress(output.to)}
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
                      if (output.__typename === 'CoinOutput') {
                        return <TxValue key={idx}>{output.amount}</TxValue>;
                      }
                      return `N/A ${output.__typename}`;
                    })()
                  )}
                </TableCell>
                <TableCell>
                  {transaction.outputs.map((output, idx) =>
                    (() => {
                      if (output.__typename === 'CoinOutput') {
                        return (
                          <CoinLink key={idx} to="/coin">
                            {output.assetId}
                          </CoinLink>
                        );
                      }
                      return 'N/A';
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
}
