import { formatUnits } from '@ethersproject/units';
import { Suspense, useContext, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { BASE_COIN_NAME } from '../../constants';
import { ChainContext } from '../../contexts/network';
import { DECIMAL_UNITS, parseToFormattedNumber } from '../../utils/bigNumber';
import { toPlainString } from '../../utils/number';

import UTXOComponent from './UTXOComponent';
import type { TransactionPageQuery } from './__generated__/TransactionPageQuery.graphql';
import {
  Container,
  Content,
  RowKeyColumn,
  RowValueColumn,
  Title,
  TitleTransaction,
  TransactionDataContainer,
  TransactionDataRow,
  TransactionStatus,
  UTXOBoxContainer,
  UTXOHeadlineContainer,
  UTXOHeadlineColumn,
  UTXOTitle,
  UTXODetailsContainer,
  ScriptsContainer,
  ScriptTitle,
  ScriptContainer,
  ScriptTabsContainer,
  ScriptTabButton,
  ScriptTextarea,
  ContractTextarea,
} from './components';
import { calculateTransactionFee } from './utils/gas';

export default function TransactionPage() {
  const { transaction: transactionId } = useParams<'transaction'>();
  const { transaction: tx } = useLazyLoadQuery<TransactionPageQuery>(
    graphql`
      query TransactionPageQuery($id: TransactionId!) {
        transaction(id: $id) {
          ...UTXOComponent_transaction
          id
          inputContracts {
            id
            bytecode
          }
          staticContracts {
            id
            bytecode
          }
          inputAssetIds
          gasPrice
          gasLimit
          maturity
          isScript
          receiptsRoot
          script
          scriptData
          witnesses
          bytecodeWitnessIndex
          bytePrice
          rawPayload
          receipts {
            gasUsed
          }
          status {
            __typename
            ... on SubmittedStatus {
              time
            }
            ... on SuccessStatus {
              time
            }
            ... on FailureStatus {
              time
            }
          }
        }
      }
    `,
    {
      id: transactionId,
    },
    { fetchPolicy: 'store-and-network', UNSTABLE_renderPolicy: 'full' }
  );
  if (!tx) {
    throw new Error(`Transaction ${transactionId} not found`);
  }
  const { chains } = useContext(ChainContext);

  const lastReceipt = tx.receipts?.[tx.receipts.length - 1];
  const gasPriceFactor = +(chains[0].consensusParameters?.gasPriceFactor || 1);
  const transactionFee = calculateTransactionFee({
    bytePrice: +tx.bytePrice,
    rawPayload: tx.rawPayload,
    witnesses: tx.witnesses,
    gasPriceFactor,
    gasPrice: +tx.gasPrice,
    gasUsed: +(lastReceipt?.gasUsed || 0),
  });

  const gasPriceDecimal = +formatUnits(tx.gasPrice, DECIMAL_UNITS);
  const gasPriceInEth = gasPriceDecimal / gasPriceFactor;

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>
            <span>Transaction:</span>
            <TitleTransaction>{transactionId}</TitleTransaction>
          </Title>
          <TransactionDataContainer>
            <TransactionDataRow>
              <RowKeyColumn>Type:</RowKeyColumn>
              <RowValueColumn>{tx.isScript ? 'Script' : 'Create'}</RowValueColumn>
            </TransactionDataRow>
            {tx.status ? (
              <TransactionDataRow>
                <RowKeyColumn>Status:</RowKeyColumn>
                <TransactionStatus>{tx.status.__typename.replace('Status', '')}</TransactionStatus>
              </TransactionDataRow>
            ) : null}
            {/* <TransactionDataRow>
              <RowKeyColumn>Maturity:</RowKeyColumn>
              <RowValueColumn>{tx.maturity}</RowValueColumn>
            </TransactionDataRow> */}
            <TransactionDataRow>
              <RowKeyColumn>Gas Price:</RowKeyColumn>
              <RowValueColumn>
                {toPlainString(gasPriceInEth)} {BASE_COIN_NAME}
              </RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Limit:</RowKeyColumn>
              <RowValueColumn>{tx.gasLimit}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Used:</RowKeyColumn>
              <RowValueColumn>{lastReceipt?.gasUsed}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Transaction fee:</RowKeyColumn>
              <RowValueColumn>
                {parseToFormattedNumber(transactionFee)} {BASE_COIN_NAME}
              </RowValueColumn>
            </TransactionDataRow>
          </TransactionDataContainer>
          <Suspense
            // TODO: Add a cool loading indicator
            fallback={<div>Loading UTXO data...</div>}
          >
            <UTXOComponent transaction={tx} />
          </Suspense>
          {tx.isScript ? <ScriptsComponent tx={tx} /> : <ContractComponent tx={tx} />}
        </Content>
      </Container>
    </>
  );
}

function ContractComponent({ tx }: { tx: any }) {
  return tx.witnesses.map((witness: string, index: number) => (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>Witness #{index}</UTXOTitle>
        </UTXOHeadlineColumn>
      </UTXOHeadlineContainer>
      <UTXODetailsContainer>
        <ContractTextarea readOnly value={witness} />
      </UTXODetailsContainer>
    </UTXOBoxContainer>
  ));
}

function ScriptsComponent({ tx }: { tx: any }) {
  return (
    <ScriptsContainer>
      <ScriptTitle>Script Byte Code:</ScriptTitle>
      {/* <ScriptComponent tabs={['Assembly', 'Hex']} contents={['', tx.script]} /> */}
      <ScriptComponent tabs={['Hex']} contents={[tx.script]} />
      <ScriptTitle>Script Data:</ScriptTitle>
      {/* <ScriptComponent tabs={['ABI Decoded', 'Raw Hex']} contents={['', tx.scriptData]} /> */}
      <ScriptComponent tabs={['Raw Hex']} contents={[tx.scriptData]} />
    </ScriptsContainer>
  );
}

function ScriptComponent({ tabs, contents }: { tabs: string[]; contents: string[] }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScriptContainer>
      <ScriptTabsContainer>
        {tabs.map((tabItem, idx) => (
          <ScriptTabButton
            key={idx}
            isSelected={selectedTab === idx}
            onClick={() => {
              setSelectedTab(idx);
            }}
          >
            {tabItem}
          </ScriptTabButton>
        ))}
      </ScriptTabsContainer>
      <ScriptTextarea readOnly value={contents[selectedTab]} />
    </ScriptContainer>
  );
}
