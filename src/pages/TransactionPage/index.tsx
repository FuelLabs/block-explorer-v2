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
  ScriptPlaceholder,
  UTXOHeadlineColumn2,
} from "./components";
import { useParams } from "react-router-dom";
import { ExpandIcon, ShrinkIcon } from "../../components/Icons";
import { trimAddress } from "../../utils";
import { useQuery } from "@apollo/client";
import { queries } from "../../api";
import { CoinOutput, Output, Transaction } from "../../utils/model";
import { Input, InputCoin } from "../../utils/model/input";

export function TransactionPage() {
  const { transaction } = useParams() as any;
  const { data } = useQuery(queries.getTransaction, { variables: { id: transaction } });
  const tx: Transaction = data?.transaction;

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
            <TransactionDataRow>
              <RowKeyColumn>Status:</RowKeyColumn>
              <TransactionStatus>{tx.status.__typename.replace("Status", "")}</TransactionStatus>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Maturity:</RowKeyColumn>
              <RowValueColumn>{tx.maturity}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Price:</RowKeyColumn>
              <RowValueColumn>{`${tx.gasPrice} gwei`}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Limit:</RowKeyColumn>
              <RowValueColumn>{tx.gasLimit}</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Used:</RowKeyColumn>
              <RowValueColumn>TBD</RowValueColumn>
            </TransactionDataRow>
          </TransactionDataContainer>
          <UTXOComponent outputs={tx.outputs || []} inputs={tx.inputs || []} />
          <ScriptsComponent />
        </Content>
      </Container>
    </>
  );
}

function ScriptsComponent() {
  return (
    <ScriptsContainer>
      <ScriptTitle>Script Byte Code:</ScriptTitle>
      <ScriptComponent tabs={["Assembly", "Hex"]} />
      <ScriptTitle>Script Data:</ScriptTitle>
      <ScriptComponent tabs={["ABI Decoded", "Raw Hex"]} />
    </ScriptsContainer>
  );
}

function ScriptComponent({ tabs }: { tabs: string[] }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScriptContainer>
      <ScriptTabsContainer>
        {tabs.map((tabItem, idx) => (
          <ScriptTabButton
            isSelected={selectedTab === idx}
            onClick={() => {
              setSelectedTab(idx);
            }}
          >
            {tabItem}
          </ScriptTabButton>
        ))}
      </ScriptTabsContainer>
      <ScriptPlaceholder />
    </ScriptContainer>
  );
}

function UTXOComponent({ inputs, outputs }: { inputs: Input[]; outputs: Output[] }) {
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
            <UTXOOutputBox key={idx} output={output} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
      </UTXOBoxesContainer>
    </UTXOContainer>
  );
}

function UTXOInputBox({ input, expanded, idx }: { input: Input; expanded: boolean; idx: number }) {
  if (input.__typename === "InputCoin") {
    return (
      <UTXOBoxContainer>
        <UTXOHeadlineContainer>
          <UTXOHeadlineColumn>
            <UTXOTitle>{`Input #${idx + 1}`}</UTXOTitle>
            <UTXOHash to={`/transaction/${(input as InputCoin).utxoId}`}>
              {(input as InputCoin).utxoId}
            </UTXOHash>
          </UTXOHeadlineColumn>
          <UTXOHeadlineColumn2>
            <HeadlineText>TBD</HeadlineText>
            <HeadlineText>{(input as InputCoin).amount}</HeadlineText>
          </UTXOHeadlineColumn2>
        </UTXOHeadlineContainer>
        {expanded && (
          <UTXODetailsContainer>
            <UTXODetailsRow>
              <UTXODetailsKey>Owner:</UTXODetailsKey>
              <UTXODetailsLink to={`/address/${(input as InputCoin).utxoId}`}>
                {trimAddress((input as InputCoin).owner)}
              </UTXODetailsLink>
            </UTXODetailsRow>
            <UTXODetailsRow>
              <UTXODetailsKey>Amount:</UTXODetailsKey>
              {(input as InputCoin).amount}
            </UTXODetailsRow>
            <UTXODetailsRow>
              <UTXODetailsKey>Coin:</UTXODetailsKey>
              <UTXODetailsLink to={`/coin/${(input as InputCoin).color}`}>
                {trimAddress((input as InputCoin).color)}
              </UTXODetailsLink>
            </UTXODetailsRow>
            <UTXODetailsRow>
              <UTXODetailsKey>Predicate bytecode:</UTXODetailsKey>
              {(input as InputCoin).predicate}
            </UTXODetailsRow>
            <UTXODetailsRow>
              <UTXODetailsKey>Predicate data:</UTXODetailsKey>
              {(input as InputCoin).predicateData}
            </UTXODetailsRow>
            <UTXODetailsRow>
              <UTXODetailsKey>Predicate length:</UTXODetailsKey>
              TBD
            </UTXODetailsRow>
          </UTXODetailsContainer>
        )}
      </UTXOBoxContainer>
    );
  }
  return <>{input.__typename}</>;
}

function UTXOOutputBox({ output, expanded }: { output: Output; expanded: boolean }) {
  return (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>Output</UTXOTitle>
          <UTXOHash to={`/`}>TBD</UTXOHash>
        </UTXOHeadlineColumn>
        {output.__typename === "CoinOutput" && (
          <UTXOHeadlineColumn2>
            <HeadlineText>TBD</HeadlineText>
            <HeadlineText>{(output as CoinOutput).amount}</HeadlineText>
          </UTXOHeadlineColumn2>
        )}
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXODetailsRow>
            <UTXODetailsKey>To:</UTXODetailsKey>
            {(() => {
              if (output.__typename === "CoinOutput") {
                return (
                  <UTXODetailsLink to={`/address/${(output as CoinOutput).to}`}>
                    {trimAddress((output as CoinOutput).to)}
                  </UTXODetailsLink>
                );
              }
            })()}
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Amount:</UTXODetailsKey>
            {(() => {
              if (output.__typename === "CoinOutput") {
                return (output as CoinOutput).amount;
              }
            })()}
          </UTXODetailsRow>
          {/* <UTXODetailsRow>
            <UTXODetailsKey>Coin:</UTXODetailsKey>
            <UTXODetailsLink to={`/coin/${data.symbol}`}>{data.symbol}</UTXODetailsLink>
          </UTXODetailsRow> */}
          {/* <UTXODetailsRow>
            <UTXODetailsKey>Spent:</UTXODetailsKey>
            {data.spent}
          </UTXODetailsRow> */}
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  );
}
