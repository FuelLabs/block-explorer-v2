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
import { CoinLinkSkip, ContractLinkSkip, CopyButtonIcon, HeadlineAddressButton, TableContainer, TableHeadlineAddressButton, Tooltip, TransactionFromAddressWrapper, TxRecipient } from '../AddressPage/components';

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
  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

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
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
}
