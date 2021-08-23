import { useState } from 'react';
import { Header } from "../../components/Header";
import {
  Container, BaseLink,
  Content, RowKeyColumn, RowValueColumn,
  Title, TitleTransaction, TransactionDataContainer, TransactionDataRow, TransactionStatus, UTXOContainer, DetailsButtonContainer, DetailsButton, UTXOBoxesContainer, UTXOBoxesColumn, UTXOBoxContainer, UTXOHeadlineContainer, UTXOHeadlineColumn, UTXOTitle, UTXOHash, HeadlineText, UTXODetailsContainer, UTXODetailsRow, UTXODetailsKey, UTXODetailsLink, UTXOSeparatorColumn, UTXOSeparatorArrow, ScriptsContainer, ScriptTitle, ScriptContainer, ScriptTabsContainer, ScriptTabButton, ScriptPlaceholder
} from "./components";
import { useParams } from "react-router-dom";
import { ExpandIcon, ShrinkIcon } from "../../components/Icons";
import { trimAddress } from '../../utils';

export function TransactionPage() {
  const { transaction } = useParams() as any


  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>
            Transaction:
            <TitleTransaction>{transaction}</TitleTransaction>
          </Title>
          <TransactionDataContainer>
            <TransactionDataRow>
              <RowKeyColumn>Type:</RowKeyColumn>
              <RowValueColumn>Script</RowValueColumn>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Status:</RowKeyColumn>
              <TransactionStatus>Success</TransactionStatus>
            </TransactionDataRow>
            <TransactionDataRow>
              <RowKeyColumn>Maturity:</RowKeyColumn>
              <BaseLink to="/">24</BaseLink>
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
          </TransactionDataContainer>
          <UTXOComponent />
          <ScriptsComponent />
        </Content>
      </Container>
    </>
  )
}

function ScriptsComponent() {
  return (
    <ScriptsContainer>
      <ScriptTitle>Script Byte Code:</ScriptTitle>
      <ScriptComponent tabs={['Assembly', 'Hex']} />
      <ScriptTitle>Script Data:</ScriptTitle>
      <ScriptComponent tabs={['ABI Decoded', 'Raw Hex']} />
    </ScriptsContainer>
  )
}

function ScriptComponent({ tabs }: { tabs: string[] }) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <ScriptContainer>
      <ScriptTabsContainer>
        {tabs.map((tabItem, idx) => (
          <ScriptTabButton isSelected={selectedTab === idx} onClick={() => { setSelectedTab(idx) }}>{tabItem}</ScriptTabButton>
        ))}
      </ScriptTabsContainer>
      <ScriptPlaceholder />
    </ScriptContainer>
  )
}

function UTXOComponent() {
  const [expanded, setExpanded] = useState(false);

  function onClickDetails() {
    setExpanded(prevExpanded => !prevExpanded)
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
  )
}

interface UTXOInputData {
  title: string,
  hash: string,
  coin?: {
    symbol: string,
    amount: number,
  },
  owner: string,
  symbol: string,
  amount: number,
  data: string,
  length: number
}

const Inputs: UTXOInputData[] = [{
  title: 'Input #1',
  hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  owner: '0xc5d2460186f7233c927e7db2dcc703c0e500',
  symbol: 'DAI',
  amount: 500,
  data: '22 bytes',
  length: 12,
}, {
  title: 'Input #2',
  hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  coin: {
    symbol: 'DAI',
    amount: 5000000.33,
  },
  owner: '0xc5d2460186f7233c927e7db2dcc703c0e500',
  symbol: 'DAI',
  amount: 500,
  data: '22 bytes',
  length: 12,
}]

interface UTXOInputProps {
  data: UTXOInputData,
  expanded: boolean,
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
        {data.coin && (
          <UTXOHeadlineColumn>
            <HeadlineText>{data.coin.symbol}</HeadlineText>
            <HeadlineText>{data.coin.amount.toLocaleString('en')}</HeadlineText>
          </UTXOHeadlineColumn>
        )}
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXODetailsRow>
            <UTXODetailsKey>Owner:</UTXODetailsKey>
            <UTXODetailsLink to={`/address/${data.owner}`}>{trimAddress(data.owner)}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Amount:</UTXODetailsKey>
            {data.amount}
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Coin:</UTXODetailsKey>
            <UTXODetailsLink to={`/coin/${data.symbol}`}>{data.symbol}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Predicate bytecode:</UTXODetailsKey>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Predicate data:</UTXODetailsKey>
            {data.data}
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Predicate length:</UTXODetailsKey>
            {data.length}
          </UTXODetailsRow>
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  )
}

interface UTXOOutputData {
  title: string,
  hash: string,
  coin?: {
    symbol: string,
    amount: number,
  },
  to: string,
  symbol: string,
  amount: number,
  spent: string,
}

const Outputs: UTXOOutputData[] = [{
  title: 'Output #1',
  hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  coin: {
    symbol: 'DAI',
    amount: 2000000,
  },
  to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
  symbol: 'DAI',
  amount: 500,
  spent: "No"
}, {
  title: 'Output #2',
  hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  coin: {
    symbol: 'DAI',
    amount: 3000000,
  },
  to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
  symbol: 'DAI',
  amount: 500,
  spent: "Yes"
}]

interface UTXOOutputProps {
  data: UTXOOutputData,
  expanded: boolean,
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
        {data.coin && (
          <UTXOHeadlineColumn>
            <HeadlineText>{data.coin.symbol}</HeadlineText>
            <HeadlineText>{data.coin.amount.toLocaleString('en')}</HeadlineText>
          </UTXOHeadlineColumn>
        )}
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXODetailsRow>
            <UTXODetailsKey>To:</UTXODetailsKey>
            <UTXODetailsLink to={`/address/${data.to}`}>{trimAddress(data.to)}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Amount:</UTXODetailsKey>
            {data.amount}
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Coin:</UTXODetailsKey>
            <UTXODetailsLink to={`/coin/${data.symbol}`}>{data.symbol}</UTXODetailsLink>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Spent:</UTXODetailsKey>
            {data.spent}
          </UTXODetailsRow>
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  )
}