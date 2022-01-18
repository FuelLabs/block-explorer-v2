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
  UTXODetailsContainer,
  UTXODetailsRow,
  UTXODetailsKey,
  UTXODetailsLink,
  UTXOSeparatorColumn,
  UTXOSeparatorArrow,
  RowValueLink,
  WrapText,
  WitnessContainer,
  WitnessIndex,
  WitnessIconContainer,
  WitnessAddress,
  UTXODetailsValue,
  WitnessIcon
} from "./components";
import { useParams } from "react-router-dom";
import { ExpandIcon, ShrinkIcon } from "../../components/Icons";

export function CreateTransactionPage() {
  const { transaction } = useParams() as any;

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
              <RowValueColumn>Create</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Maturity:</RowKeyColumn>
              <RowValueColumn>24</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Price:</RowKeyColumn>
              <RowValueColumn>34 gwei</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Limit:</RowKeyColumn>
              <RowValueColumn>32</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Gas Used:</RowKeyColumn>
              <RowValueColumn>23</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Static Contracts (1):</RowKeyColumn>
              <RowValueColumn>
                <RowValueLink to="/contract/0xc5d2460186f7233c927e7db2dcc703c0e500">
                  0xc5d2460186f7233c927e7db2dcc703c0e500
                </RowValueLink>
              </RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Bytecode Length:</RowKeyColumn>
              <RowValueColumn>32 Bytes</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Salt:</RowKeyColumn>
              <RowValueColumn>
                <WrapText>
                  07739c9276903c4c1d305bb27b6a133a8328a4350c2222589d32889b74202c1d
                </WrapText>
              </RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Witnesses (3):</RowKeyColumn>
              <RowValueColumn>
                <WitnessContainer>
                  <WitnessIndex>[0]</WitnessIndex>
                  <WitnessIconContainer>
                    <WitnessIcon />
                  </WitnessIconContainer>
                  <WitnessAddress>0xc5d2460186f7233c927e7db2dcc703c0e500</WitnessAddress>
                </WitnessContainer>
                <WitnessContainer>
                  <WitnessIndex>[1]</WitnessIndex>
                  <WitnessIconContainer>
                    <WitnessIcon />
                  </WitnessIconContainer>
                  <WitnessAddress>0xc5d2460186f7233c927e7db2dcc703c0e500</WitnessAddress>
                </WitnessContainer>
                <WitnessContainer>
                  <WitnessIndex>[2]</WitnessIndex>
                  <WitnessIconContainer>
                    <WitnessIcon />
                  </WitnessIconContainer>
                  <WitnessAddress>0xc5d2460186f7233c927e7db2dcc703c0e500</WitnessAddress>
                </WitnessContainer>
              </RowValueColumn>
            </TransactionDataRow>
          </TransactionDataContainer>
          <UTXOComponent />
        </Content>
      </Container>
    </>
  );
}

function UTXOComponent() {
  const [expanded, setExpanded] = useState(false);

  function onClickDetails() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

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
          {Inputs.map((inputItem, idx) => (
            <UTXOInputBox key={idx} data={inputItem} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
        <UTXOSeparatorColumn>
          <UTXOSeparatorArrow />
        </UTXOSeparatorColumn>
        <UTXOBoxesColumn>
          {Outputs.map((outputItem, idx) => (
            <UTXOOutputBox key={idx} data={outputItem} expanded={expanded} />
          ))}
        </UTXOBoxesColumn>
      </UTXOBoxesContainer>
    </UTXOContainer>
  );
}

interface UTXOInputData {
  title: string;
  hash: string;
  contractId: string;
  balanceRoot: string;
  stateRoot: string;
}

const Inputs: UTXOInputData[] = [
  {
    title: "Input #1",
    hash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    contractId: "0xc5d2460186f7233c927e7db2dcc703c0e500",
    balanceRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500",
    stateRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500"
  }
];

interface UTXOInputProps {
  data: UTXOInputData;
  expanded: boolean;
}

function UTXOInputBox(props: UTXOInputProps) {
  const { data, expanded } = props;

  return (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>{data.title}</UTXOTitle>
          <UTXOHash to={`/transaction/${data.hash}`}>{data.hash}</UTXOHash>
        </UTXOHeadlineColumn>
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXODetailsRow>
            <UTXODetailsKey>ContractID:</UTXODetailsKey>
            <UTXODetailsLink to={`/contract/${data.contractId}`}>{data.contractId}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Balance Root:</UTXODetailsKey>
            <UTXODetailsValue>{data.balanceRoot}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>State Root:</UTXODetailsKey>
            <UTXODetailsValue>{data.stateRoot}</UTXODetailsValue>
          </UTXODetailsRow>
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  );
}

interface UTXOOutputData {
  title: string;
  hash: string;
  contractId: string;
  balanceRoot: string;
  stateRoot: string;
}

const Outputs: UTXOOutputData[] = [
  {
    title: "Input #1",
    hash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    contractId: "0xc5d2460186f7233c927e7db2dcc703c0e500",
    balanceRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500",
    stateRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500"
  }
];

interface UTXOOutputProps {
  data: UTXOOutputData;
  expanded: boolean;
}

function UTXOOutputBox(props: UTXOOutputProps) {
  const { data, expanded } = props;

  return (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>{data.title}</UTXOTitle>
          <UTXOHash to={`/transaction/${data.hash}`}>{data.hash}</UTXOHash>
        </UTXOHeadlineColumn>
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXODetailsRow>
            <UTXODetailsKey>ContractID:</UTXODetailsKey>
            <UTXODetailsLink to={`/contract/${data.contractId}`}>{data.contractId}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Balance Root:</UTXODetailsKey>
            <UTXODetailsValue>{data.balanceRoot}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>State Root:</UTXODetailsKey>
            <UTXODetailsValue>{data.stateRoot}</UTXODetailsValue>
          </UTXODetailsRow>
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  );
}
