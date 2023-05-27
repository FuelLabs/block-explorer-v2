/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Input, Output } from 'fuels';
import { bn, DECIMAL_UNITS, InputType, OutputType, TransactionType } from 'fuels';
import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { ExpandIcon, ShrinkIcon } from '../../components/Icons';
import { BASE_COIN_NAME } from '../../constants';
import { ChainContext } from '../../contexts/network';
import { getOutputTypeText, trimAddress } from '../../utils';
import { tai64toDayjs } from '../../utils/date';
import { toPlainString } from '../../utils/number';
import { CopyButtonIcon, TableHeadlineAddressButton, Tooltip } from '../AddressPage/components';
import { UTXODetailsValue } from '../CreateTransactionPage/components';

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
  HeadlineText,
  UTXODetailsContainer,
  UTXODetailsRow,
  UTXODetailsKey,
  UTXODetailsLink,
  UTXOSeparatorColumn,
  UTXOSeparatorArrow,
  UTXOHeadlineColumn2,
  ContractTextarea,
  UTXOHashOutputSkip,
} from './components';
import { useTransaction } from './useTransaction';

export default function TransactionPage() {
  const { transaction: transactionId } = useParams() as any;
  const { chains } = useContext(ChainContext);
  const { transaction, transactionResult } = useTransaction(transactionId);
  const txDate = useMemo(() => {
    const dateT = transactionResult?.time;
    if (dateT) {
      const dateDayJS = tai64toDayjs(dateT);
      return `${dateDayJS.fromNow()} (${dateDayJS.format('MMMM-DD-YYYY HH:mm:ss A')})`;
    }
    return '';
  }, [transactionResult?.time]);

  if (!transaction) return null;

  const gasPriceFactor = +(chains[0].consensusParameters?.gasPriceFactor || 1);
  const gasPriceDecimal = parseFloat(
    transaction.gasPrice?.format({ precision: DECIMAL_UNITS }) || '0'
  );
  const gasPriceInEth = gasPriceDecimal / gasPriceFactor;

  const isScript = transaction.type === TransactionType.Script;
  const isCreate = transaction.type === TransactionType.Create;
  const isMint = transaction.type === TransactionType.Mint;

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
              <RowValueColumn>
                {isScript && 'Script'}
                {isCreate && 'Create'}
                {isMint && 'Mint'}
              </RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Status:</RowKeyColumn>
              <TransactionStatus>
                {transactionResult?.status ? transactionResult?.status.type : 'Pending'}
              </TransactionStatus>
            </TransactionDataRow>
            {/* <TransactionDataRow>
              <RowKeyColumn>Maturity:</RowKeyColumn>
              <RowValueColumn>{tx.maturity}</RowValueColumn>
            </TransactionDataRow> */}
            {Boolean(gasPriceInEth) && (
              <TransactionDataRow>
                <RowKeyColumn>Gas Price:</RowKeyColumn>
                <RowValueColumn>
                  {toPlainString(gasPriceInEth)} {BASE_COIN_NAME}
                </RowValueColumn>
              </TransactionDataRow>
            )}
            {Boolean(transaction.gasLimit) && (
              <TransactionDataRow>
                <RowKeyColumn>Gas Limit:</RowKeyColumn>
                <RowValueColumn>{transaction.gasLimit?.toString(10)}</RowValueColumn>
              </TransactionDataRow>
            )}
            {Boolean(transactionResult?.gasUsed?.toNumber()) && (
              <TransactionDataRow>
                <RowKeyColumn>Gas Used:</RowKeyColumn>
                <RowValueColumn>{transactionResult?.gasUsed.toString(10)}</RowValueColumn>
              </TransactionDataRow>
            )}
            {Boolean(txDate) && (
              <TransactionDataRow>
                <RowKeyColumn>Timestamp:</RowKeyColumn>
                <RowValueColumn>{txDate}</RowValueColumn>
              </TransactionDataRow>
            )}
            {Boolean(transactionResult?.fee?.toNumber()) && (
              <TransactionDataRow>
                <RowKeyColumn>Transaction fee:</RowKeyColumn>
                <RowValueColumn>
                  {transactionResult?.fee?.format({ precision: DECIMAL_UNITS })} {BASE_COIN_NAME}
                </RowValueColumn>
              </TransactionDataRow>
            )}
          </TransactionDataContainer>
          <UTXOComponent outputs={transaction.outputs || []} inputs={transaction.inputs || []} />
          <ScriptsComponent tx={transaction} />
          <ContractComponent tx={transaction} />
        </Content>
      </Container>
    </>
  );
}

function ContractComponent({ tx }: { tx: any }) {
  return (
    tx.witnesses?.map((witness: { data: string }, index: number) => (
      <UTXOBoxContainer key={witness.data}>
        <UTXOHeadlineContainer>
          <UTXOHeadlineColumn>
            <UTXOTitle>Witness #{index}</UTXOTitle>
          </UTXOHeadlineColumn>
        </UTXOHeadlineContainer>
        <UTXODetailsContainer>
          <ContractTextarea readOnly value={witness.data} />
        </UTXODetailsContainer>
      </UTXOBoxContainer>
    )) || null
  );
}

function ScriptsComponent({ tx }: { tx: any }) {
  return (
    <>
      {tx.script && (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>Script Byte Code:</UTXOTitle>
            </UTXOHeadlineColumn>
          </UTXOHeadlineContainer>
          <UTXODetailsContainer>
            <ContractTextarea readOnly value={tx.script} />
          </UTXODetailsContainer>
        </UTXOBoxContainer>
      )}
      {tx.scriptData && (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>Script Data:</UTXOTitle>
            </UTXOHeadlineColumn>
          </UTXOHeadlineContainer>
          <UTXODetailsContainer>
            <ContractTextarea readOnly value={tx.scriptData} />
          </UTXODetailsContainer>
        </UTXOBoxContainer>
      )}
    </>
  );
}

// function ScriptComponent({ tabs, contents }: { tabs: string[]; contents: string[] }) {
//   const [selectedTab, setSelectedTab] = useState(0);
//   return (
//     <ScriptContainer>
//       <ScriptTabsContainer>
//         {tabs?.map((tabItem, idx) => (
//           <ScriptTabButton
//             key={idx}
//             isSelected={selectedTab === idx}
//             onClick={() => {
//               setSelectedTab(idx);
//             }}
//           >
//             {tabItem}
//           </ScriptTabButton>
//         ))}
//       </ScriptTabsContainer>
//       <ScriptTextarea readOnly value={contents[selectedTab]} />
//     </ScriptContainer>
//   );
// }

function UTXOComponent({ inputs, outputs }: { inputs: Input[]; outputs: Output[] }) {
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
          {inputs?.map((input, idx) => (
            <UTXOInputBox key={idx} idx={idx} input={input} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
        <UTXOSeparatorColumn>
          <UTXOSeparatorArrow />
        </UTXOSeparatorColumn>
        <UTXOBoxesColumn>
          {outputs?.map((output, idx) => (
            <UTXOOutputBox key={idx} index={idx} output={output} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
      </UTXOBoxesContainer>
    </UTXOContainer>
  );
}

function UTXOInputBox({ input, expanded, idx }: { input: Input; expanded: boolean; idx: number }) {
  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  switch (input.type) {
    case InputType.Coin: {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHashOutputSkip to="">{input.utxoID.transactionId}</UTXOHashOutputSkip>
            </UTXOHeadlineColumn>
            <UTXOHeadlineColumn2>
              <HeadlineText>Value</HeadlineText>
              <HeadlineText>{bn(input.amount).format({ precision: DECIMAL_UNITS })}</HeadlineText>
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
                {bn(input.amount).format({ precision: DECIMAL_UNITS })}
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
    case InputType.Contract: {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHashOutputSkip to="">{input.utxoID.transactionId}</UTXOHashOutputSkip>
            </UTXOHeadlineColumn>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Contract Id:</UTXODetailsKey>
                <UTXOHashOutputSkip to="">{trimAddress(input.contractID)}</UTXOHashOutputSkip>
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

function UTXOOutput({ output }: { output: Output }) {
  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  switch (output.type) {
    case OutputType.ContractCreated: {
      return (
        <UTXODetailsRow>
          <UTXODetailsKey>Contract Id:</UTXODetailsKey>
          <UTXOHashOutputSkip to="">{output.contractId}</UTXOHashOutputSkip>
        </UTXODetailsRow>
      );
    }
    case OutputType.Contract: {
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
    case OutputType.Coin:
    case OutputType.Change: {
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
            <UTXODetailsValue>
              {bn(output.amount).format({ precision: DECIMAL_UNITS })}
            </UTXODetailsValue>
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
  output: Output;
  expanded: boolean;
  index: number;
}) {
  return (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>Output #{index}</UTXOTitle>
          <UTXOHashOutputSkip to="">{getOutputTypeText(output.type)}</UTXOHashOutputSkip>
          {/* <UTXOHashOutputSkip to="">{output.__typename}</UTXOHashOutputSkip> */}
        </UTXOHeadlineColumn>
        {output.type === OutputType.Coin && (
          <UTXOHeadlineColumn2>
            <HeadlineText>Amount</HeadlineText>
            <HeadlineText>{bn(output.amount).format({ precision: DECIMAL_UNITS })}</HeadlineText>
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
