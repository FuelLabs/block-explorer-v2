import { Header } from "../../components/Header";
import {
  DataTimestamp,
  BlockNumber,
  Container,
  Content,
  DataBox,
  DataContainer,
  DataItem,
  DataTitle,
  Input,
  InputContainer, ProducerAddress, DataLabel,
  SearchIcon, TxCount, TxType, TransactionAddress, TransactionRecipientRow, TransactionRecipientLabel, TransactionRecipientLink, TransactionTypeColumn, TransactionHashColumn, TransactionRecipientsColumn, TransactionRecipientsWrapper, TransactionsDataBoxRow, BlocksDataBoxRow, BlockNumberColumn, BlockProducerColumn
} from "./components";
import { Transactions } from './constants';

function RecentBlocks() {
  return <DataItem>
    <DataTitle>Recent Blocks</DataTitle>
    <DataBox>
      {Array(5).fill(0).map(() => (
        <BlocksDataBoxRow>
          <BlockNumberColumn>
            <BlockNumber to={`/block/5033`}>5033</BlockNumber>
            <DataTimestamp>34 secs ago</DataTimestamp>
          </BlockNumberColumn>
          <BlockProducerColumn>
            <DataLabel>
              {`Producer: `}
              <ProducerAddress to={`/address/0xc5d2460186f7233c927e7db2dcc703c0e500`}>0xc5d2…c0e500</ProducerAddress>
            </DataLabel>
            <TxCount to={`/block/${5033}/transactions`}>100 Tx's</TxCount>
          </BlockProducerColumn>
        </BlocksDataBoxRow>
      ))}
    </DataBox>
  </DataItem>;
}

function RecentTransactions() {
  return (
    <DataItem>
      <DataTitle>Recent Transactions</DataTitle>
      <DataBox>
        {Transactions.map((transaction, idx) => (
          <TransactionsDataBoxRow key={idx}>
            <TransactionTypeColumn>
              <TxType>{transaction.type}</TxType>
            </TransactionTypeColumn>
            <TransactionHashColumn>
              <TransactionAddress to={`/transaction/${transaction.txHash}`}>{`${transaction.txHash.slice(0, 12)}...`}</TransactionAddress>
              <DataTimestamp>{transaction.timestamp}</DataTimestamp>
            </TransactionHashColumn>
            <TransactionRecipientsColumn>
              <TransactionRecipientsWrapper>
                <TransactionRecipientLabel>From:</TransactionRecipientLabel>
                {transaction.recipients.map((recipient, idx) => (
                  <TransactionRecipientRow>
                    <TransactionRecipientLink key={idx} to={`/address/${recipient.from}`}>
                      {`${recipient.from.slice(0, 6)}...${recipient.from.slice(-6, recipient.from.length - 1)}`}
                    </TransactionRecipientLink>
                  </TransactionRecipientRow>
                ))}
              </TransactionRecipientsWrapper>
              {transaction.recipients.filter(recipient => !!recipient.to).length > 0 && (
                <TransactionRecipientsWrapper>
                  <TransactionRecipientLabel>To:</TransactionRecipientLabel>
                  {transaction.recipients.map((recipient, idx) => (
                    <TransactionRecipientRow>
                      {recipient.to && (
                        <TransactionRecipientLink key={idx} to={`/address/${recipient.to}`}>
                          {`${recipient.to.slice(0, 6)}...${recipient.to.slice(-6, recipient.to.length - 1)}`}
                        </TransactionRecipientLink>
                      )}
                    </TransactionRecipientRow>
                  ))}
                </TransactionRecipientsWrapper>
              )}
            </TransactionRecipientsColumn>
          </TransactionsDataBoxRow>
        ))}
      </DataBox>
    </DataItem>
  );
}

export function Homepage() {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <InputContainer>
            <Input placeholder="Search an address, transaction or block" />
            <SearchIcon />
          </InputContainer>
          <DataContainer>
            <RecentBlocks />
            <RecentTransactions />
          </DataContainer>
        </Content>
      </Container>
    </>
  )
}
