import { Header } from "../../components/Header";
import {
  AddressesCount,
  BlockDataContainer,
  BlockDataRow, BlockHash,
  BlockHeight, BlockHeightContainer, BlockNavigationButton, BlockNavigationIcon, BlockNumber,
  Container,
  Content, EtherscanBlockLink,
  ProducerLink,
  RowKeyColumn,
  RowValueColumn,
  Title, TransactionsCount
} from "./components";
import { useParams } from "react-router-dom";
import { ExternalLinkIcon } from "../../components/Icons";

export function BlockPage() {
  const { block } = useParams() as any

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>{`Block:  #${block}`}</Title>
          <BlockDataContainer>
            <BlockDataRow>
              <RowKeyColumn>Block height:</RowKeyColumn>
              <BlockHeightContainer>
                <BlockNavigationButton to={`/block/${parseInt(block) - 1}`}>
                  <BlockNavigationIcon rotate />
                </BlockNavigationButton>
                <BlockHeight>{block}</BlockHeight>
                <BlockNavigationButton to={`/block/${parseInt(block) + 1}`}>
                  <BlockNavigationIcon />
                </BlockNavigationButton>
              </BlockHeightContainer>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Block producer:</RowKeyColumn>
              <ProducerLink to="/address/0xc5d2460186f7233c927e7db2dcc703c0e500">0xc5d2460186f7233c927e7db2dcc703c0e500</ProducerLink>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Previous block hash:</RowKeyColumn>
              <BlockHash to="/">0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470</BlockHash>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Ethereum block number:</RowKeyColumn>
              <BlockNumber>
                564,829
                <EtherscanBlockLink href={`https://etherscan.io/block/${block}`} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon />
                </EtherscanBlockLink>
              </BlockNumber>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Number of addresses:</RowKeyColumn>
              <AddressesCount>3</AddressesCount>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Number of transactions:</RowKeyColumn>
              <TransactionsCount to={`/block/${block}/transactions`}>123</TransactionsCount>
            </BlockDataRow>
          </BlockDataContainer>
        </Content>
      </Container>
    </>
  )
}
