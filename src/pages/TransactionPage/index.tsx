import { formatUnits } from '@ethersproject/units';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { ExpandIcon, ShrinkIcon } from '../../components/Icons';
import { BASE_COIN_NAME } from '../../constants';
import { ChainContext } from '../../contexts/network';
import { trimAddress } from '../../utils';
import { DECIMAL_UNITS, parseToFormattedNumber } from '../../utils/bigNumber';
import { toPlainString } from '../../utils/number';
import { CopyButtonIcon, TableHeadlineAddressButton, Tooltip } from '../AddressPage/components';
import { UTXODetailsValue } from '../CreateTransactionPage/components';

import type { InputFragment, OutputFragment } from './__generated__/operations';
import { useTransactionPageQuery } from './__generated__/operations';
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
  UTXOContainer,
  DetailsButtonContainer,
  DetailsButton,
  UTXOBoxesContainer,
  UTXOBoxesColumn,
  UTXOBoxContainer,
  UTXOHeadlineContainer,
  UTXOHeadlineColumn,
  UTXOTitle,
  UTXOHash,
  HeadlineText,
  UTXODetailsContainer,
  UTXODetailsRow,
  UTXODetailsKey,
  UTXODetailsLink,
  UTXOSeparatorColumn,
  UTXOSeparatorArrow,
  ScriptsContainer,
  ScriptTitle,
  ScriptContainer,
  ScriptTabsContainer,
  ScriptTabButton,
  ScriptTextarea,
  UTXOHeadlineColumn2,
  ContractTextarea,
  UTXOHashOutputSkip,
} from './components';
import { calculateTransactionFee } from './utils/gas';

export default function TransactionPage() {
  const { transaction } = useParams() as any;
  const { data } = useTransactionPageQuery({ variables: { id: transaction } });
  const tx = data?.transaction;
  const { chains } = useContext(ChainContext);

  if (!tx) return null;

  const lastReceipt = tx.receipts?.[tx.receipts.length - 1];
  const gasPriceFactor = +(chains[0].consensusParameters?.gasPriceFactor || 0);
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
            <TitleTransaction>{transaction}</TitleTransaction>
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
          <UTXOComponent outputs={tx.outputs || []} inputs={tx.inputs || []} />
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

function UTXOComponent({
  inputs,
  outputs,
}: {
  inputs: InputFragment[];
  outputs: OutputFragment[];
}) {
  const [expanded, setExpanded] = useState(false);

  const onClickDetails = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  if (!outputs.length) return null;

  return (
    <UTXOContainer>
      <DetailsButtonContainer>
        <DetailsButton onClick={onClickDetails} isActive={expanded}>
          DETAILS
          {expanded ? <ShrinkIcon /> : <ExpandIcon />}
        </DetailsButton>
      </DetailsButtonContainer>
      <UTXOBoxesContainer>
        <UTXOBoxesColumn>
          {inputs.map((input, idx) => (
            <UTXOInputBox key={idx} idx={idx} input={input} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
        <UTXOSeparatorColumn>
          <UTXOSeparatorArrow />
        </UTXOSeparatorColumn>
        <UTXOBoxesColumn>
          {outputs.map((output, idx) => (
            <UTXOOutputBox key={idx} index={idx} output={output} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
      </UTXOBoxesContainer>
    </UTXOContainer>
  );
}

function UTXOInputBox({
  input,
  expanded,
  idx,
}: {
  input: InputFragment;
  expanded: boolean;
  idx: number;
}) {
  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  switch (input.__typename) {
    case 'InputCoin': {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHashOutputSkip to="">{input.utxoId}</UTXOHashOutputSkip>
            </UTXOHeadlineColumn>
            <UTXOHeadlineColumn2>
              <HeadlineText>Value</HeadlineText>
              <HeadlineText>{parseToFormattedNumber(input.amount)}</HeadlineText>
            </UTXOHeadlineColumn2>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Owner:</UTXODetailsKey>
                <UTXODetailsLink to={`/address/${input.owner}`}>
                  {trimAddress(input.owner)}
                </UTXODetailsLink>
                <TableHeadlineAddressButton
                  onClick={() => {
                    onClickCopy(input.owner);
                  }}
                >
                  <CopyButtonIcon />
                  <Tooltip>Copy Address</Tooltip>
                </TableHeadlineAddressButton>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Amount:</UTXODetailsKey>
                {parseToFormattedNumber(input.amount)}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Asset ID:</UTXODetailsKey>
                <UTXOHashOutputSkip to="">{trimAddress(input.assetId)}</UTXOHashOutputSkip>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Predicate bytecode:</UTXODetailsKey>
                {input.predicate}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Predicate data:</UTXODetailsKey>
                {input.predicateData}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Predicate length:</UTXODetailsKey>
                {0}
                {/* {TBD} */}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Witness Index:</UTXODetailsKey>
                {input.witnessIndex}
              </UTXODetailsRow>
            </UTXODetailsContainer>
          )}
        </UTXOBoxContainer>
      );
    }
    case 'InputContract': {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHashOutputSkip to="">{input.utxoId}</UTXOHashOutputSkip>
            </UTXOHeadlineColumn>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Contract Id:</UTXODetailsKey>
                <UTXOHashOutputSkip to="">{trimAddress(input.contract.id)}</UTXOHashOutputSkip>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Balance Root:</UTXODetailsKey>
                <UTXODetailsValue>{trimAddress(input.balanceRoot)}</UTXODetailsValue>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>State Root:</UTXODetailsKey>
                <UTXODetailsValue>{trimAddress(input.stateRoot)}</UTXODetailsValue>
              </UTXODetailsRow>
            </UTXODetailsContainer>
          )}
        </UTXOBoxContainer>
      );
    }
    default:
      return null;
  }
}

function UTXOOutput({ output }: { output: OutputFragment }) {
  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  switch (output.__typename) {
    case 'ContractCreated': {
      return (
        <UTXODetailsRow>
          <UTXODetailsKey>Contract Id:</UTXODetailsKey>
          <UTXOHashOutputSkip to="">{output.contract.id}</UTXOHashOutputSkip>
        </UTXODetailsRow>
      );
    }
    case 'ContractOutput': {
      return (
        <>
          <UTXODetailsRow>
            <UTXODetailsKey>Balance Root:</UTXODetailsKey>
            <UTXODetailsValue>{trimAddress(output.balanceRoot)}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>State Root:</UTXODetailsKey>
            <UTXODetailsValue>{trimAddress(output.stateRoot)}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Input index:</UTXODetailsKey>
            <UTXODetailsValue>{output.inputIndex}</UTXODetailsValue>
          </UTXODetailsRow>
        </>
      );
    }
    case 'CoinOutput':
    case 'ChangeOutput': {
      return (
        <>
          <UTXODetailsRow>
            <UTXODetailsKey>To:</UTXODetailsKey>
            <UTXODetailsLink to={`/address/${output.to}`}>{trimAddress(output.to)}</UTXODetailsLink>
            <TableHeadlineAddressButton
              onClick={() => {
                onClickCopy(output.to);
              }}
            >
              <CopyButtonIcon />
              <Tooltip>Copy Address</Tooltip>
            </TableHeadlineAddressButton>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Amount:</UTXODetailsKey>
            <UTXODetailsValue>{parseToFormattedNumber(output.amount)}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Asset ID:</UTXODetailsKey>
            <UTXOHashOutputSkip to="">{trimAddress(output.assetId)}</UTXOHashOutputSkip>
          </UTXODetailsRow>
        </>
      );
    }
    default:
      return null;
  }
}

function UTXOOutputBox({
  output,
  expanded,
  index,
}: {
  output: OutputFragment;
  expanded: boolean;
  index: number;
}) {
  return (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>Output #{index}</UTXOTitle>
          <UTXOHashOutputSkip to="">{output.__typename}</UTXOHashOutputSkip>
        </UTXOHeadlineColumn>
        {output.__typename === 'CoinOutput' && (
          <UTXOHeadlineColumn2>
            <HeadlineText>Amount</HeadlineText>
            <HeadlineText>{parseToFormattedNumber(output.amount)}</HeadlineText>
          </UTXOHeadlineColumn2>
        )}
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXOOutput output={output} />
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  );
}
