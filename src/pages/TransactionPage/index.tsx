import { useState } from "react";
import { Header } from "../../components/Header";
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
} from "./components";
import { useParams } from "react-router-dom";
import { ExpandIcon, ShrinkIcon } from "../../components/Icons";
import { trimAddress } from "../../utils";
import { InputFragment, OutputFragment, useTransactionPageQuery } from "./__generated__/operations";
import { UTXODetailsValue } from "../CreateTransactionPage/components";

export function TransactionPage() {
  const { transaction } = useParams() as any;
  const { data } = useTransactionPageQuery({ variables: { id: transaction } });
  const tx = data?.transaction;

  if (!tx) return <></>;

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
              <RowValueColumn>{tx.isScript ? "Script" : "Create"}</RowValueColumn>
            </TransactionDataRow>
            {tx.status ? (
              <TransactionDataRow>
                <RowKeyColumn>Status:</RowKeyColumn>
                <TransactionStatus>{tx.status.__typename.replace("Status", "")}</TransactionStatus>
              </TransactionDataRow>
            ) : null}
            <TransactionDataRow>
              <RowKeyColumn>Maturity:</RowKeyColumn>
              <RowValueColumn>{tx.maturity}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Price:</RowKeyColumn>
              <RowValueColumn>{tx.gasPrice}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Limit:</RowKeyColumn>
              <RowValueColumn>{tx.gasLimit}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Used:</RowKeyColumn>
              <RowValueColumn>0</RowValueColumn>
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
        <ContractTextarea readOnly={true} value={witness} />
      </UTXODetailsContainer>
    </UTXOBoxContainer>
  ));
}

function ScriptsComponent({ tx }: { tx: any }) {
  return (
    <ScriptsContainer>
      <ScriptTitle>Script Byte Code:</ScriptTitle>
      <ScriptComponent tabs={["Assembly", "Hex"]} contents={["", tx.script]} />
      <ScriptTitle>Script Data:</ScriptTitle>
      <ScriptComponent tabs={["ABI Decoded", "Raw Hex"]} contents={["", tx.scriptData]} />
    </ScriptsContainer>
  );
}

function ScriptComponent({ tabs, contents }: { tabs: string[]; contents: string[] }) {
  const [selectedTab, setSelectedTab] = useState(1);

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
      <ScriptTextarea readOnly={true} value={contents[selectedTab]} />
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

  function onClickDetails() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

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
  switch (input.__typename) {
    case "InputCoin": {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHash to={`/transaction/${input.utxoId}`}>{input.utxoId}</UTXOHash>
            </UTXOHeadlineColumn>
            <UTXOHeadlineColumn2>
              <HeadlineText>Value</HeadlineText>
              <HeadlineText>{input.amount}</HeadlineText>
            </UTXOHeadlineColumn2>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Owner:</UTXODetailsKey>
                <UTXODetailsLink to={`/address/${input.utxoId}`}>
                  {trimAddress(input.owner)}
                </UTXODetailsLink>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Amount:</UTXODetailsKey>
                {input.amount}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Coin:</UTXODetailsKey>
                <UTXODetailsLink to={`/coin/${input.assetId}`}>
                  {trimAddress(input.assetId)}
                </UTXODetailsLink>
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
    case "InputContract": {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHash to={`/transaction/${input.utxoId}`}>{input.utxoId}</UTXOHash>
            </UTXOHeadlineColumn>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Contract Id:</UTXODetailsKey>
                <UTXODetailsLink to={`/contract/${input.contract.id}`}>
                  {trimAddress(input.contract.id)}
                </UTXODetailsLink>
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
  switch (output.__typename) {
    case "ContractCreated": {
      return (
        <UTXODetailsRow>
          <UTXODetailsKey>Contract Id:</UTXODetailsKey>
          <UTXODetailsLink to={`/contract/${output.contract.id}`}>
            {output.contract.id}
          </UTXODetailsLink>
        </UTXODetailsRow>
      );
    }
    case "ContractOutput": {
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
    case "CoinOutput":
    case "ChangeOutput": {
      return (
        <>
          <UTXODetailsRow>
            <UTXODetailsKey>To:</UTXODetailsKey>
            <UTXODetailsLink to={`/address/${output.to}`}>{trimAddress(output.to)}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Amount:</UTXODetailsKey>
            <UTXODetailsValue>{output.amount}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Coin:</UTXODetailsKey>
            <UTXODetailsLink to={`/coin/${output.assetId}`}>
              {trimAddress(output.assetId)}
            </UTXODetailsLink>
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
          <UTXOHash to={`/`}>{output.__typename}</UTXOHash>
        </UTXOHeadlineColumn>
        {output.__typename === "CoinOutput" && (
          <UTXOHeadlineColumn2>
            <HeadlineText>Amount</HeadlineText>
            <HeadlineText>{output.amount}</HeadlineText>
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
