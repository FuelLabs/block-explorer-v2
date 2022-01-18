import { useMemo } from "react";
import { Header } from "../../components/Header";
import {
  AddressesCount,
  BlockDataContainer,
  BlockDataRow,
  BlockHash,
  BlockHeight,
  BlockHeightContainer,
  BlockNavigationButton,
  BlockNavigationIcon,
  BlockNumber,
  Container,
  Content,
  EtherscanBlockLink,
  ProducerLink,
  RowKeyColumn,
  Title,
  TransactionsCount
} from "./components";
import { useParams } from "react-router-dom";
import { ExternalLinkIcon } from "../../components/Icons";
import { useQuery } from "@apollo/client";
import { queries } from "../../api";
import { Block } from "../../utils/models";

export function BlockPage() {
  const { block } = useParams() as any;

  const { data, loading } = useQuery(queries.getBlockByHeight, {
    variables: { height: parseInt(block) }
  });
  const previousBlockQuery = useQuery(queries.getPreviousBlockByHeight, {
    variables: { height: parseInt(block) - 1 }
  });

  const bl = useMemo<Block>(() => {
    return data?.block;
  }, [data]);
  const prevBl = useMemo<Block>(() => {
    return previousBlockQuery.data?.block;
  }, [previousBlockQuery.data]);

  if (loading)
    return (
      <>
        <Header />
        <Container>
          <Content>
            <Title>{`Block:  #${block}`}</Title>
            Loading
          </Content>
        </Container>
      </>
    );

  if (!bl)
    return (
      <>
        <Header />
        <Container>
          <Content>
            <Title>{`Block:  #${block}`}</Title>
            Not found
          </Content>
        </Container>
      </>
    );

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
                <BlockHeight>{bl.height}</BlockHeight>
                <BlockNavigationButton to={`/block/${parseInt(block) + 1}`}>
                  <BlockNavigationIcon />
                </BlockNavigationButton>
              </BlockHeightContainer>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Block producer:</RowKeyColumn>
              <ProducerLink to="/address/0xc5d2460186f7233c927e7db2dcc703c0e500">
                {bl.producer}
              </ProducerLink>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Previous block hash:</RowKeyColumn>
              <BlockHash to={`/block/${prevBl?.height}`}>{prevBl?.id}</BlockHash>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Ethereum block number:</RowKeyColumn>
              <BlockNumber>
                TBD
                <EtherscanBlockLink
                  href={`https://etherscan.io/block/${block}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLinkIcon />
                </EtherscanBlockLink>
              </BlockNumber>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Number of addresses:</RowKeyColumn>
              <AddressesCount>TBD</AddressesCount>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Number of transactions:</RowKeyColumn>
              <TransactionsCount to={`/block/${block}/transactions`}>
                {bl.transactions?.length}
              </TransactionsCount>
            </BlockDataRow>
          </BlockDataContainer>
        </Content>
      </Container>
    </>
  );
}
