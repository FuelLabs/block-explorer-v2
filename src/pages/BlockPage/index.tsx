import { BigNumber } from '@ethersproject/bignumber';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { ExternalLinkIcon } from '../../components/Icons';

import { useBlockPageQuery } from './__generated__/operations';
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
  TransactionsCount,
} from './components';

export default function BlockPage() {
  const { block } = useParams() as any;

  const { data, loading } = useBlockPageQuery({
    variables: {
      height: BigNumber.from(block).toString(),
      previousHeight: BigNumber.from(block).sub(1).toString(),
    },
  });

  const bl = data?.block;
  const prevBl = data?.previousBlock;

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
                <BlockNavigationButton to={`/block/${parseInt(block, 10) - 1}`}>
                  <BlockNavigationIcon rotate />
                </BlockNavigationButton>
                <BlockHeight>{bl.header.height}</BlockHeight>
                <BlockNavigationButton to={`/block/${parseInt(block, 10) + 1}`}>
                  <BlockNavigationIcon />
                </BlockNavigationButton>
              </BlockHeightContainer>
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Block producer:</RowKeyColumn>
              {/* <ProducerLink to="/address/0xc5d2460186f7233c927e7db2dcc703c0e500">
                {bl.producer}
              </ProducerLink> */}
            </BlockDataRow>
            <BlockDataRow>
              <RowKeyColumn>Previous block hash:</RowKeyColumn>
              <BlockHash to={`/block/${prevBl?.header.height}`}>{prevBl?.id}</BlockHash>
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
