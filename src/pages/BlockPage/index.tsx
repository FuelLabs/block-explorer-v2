import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from 'fuels';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';

import { useBlockPageQuery } from './__generated__/operations';
import {
  BlockDataContainer,
  BlockDataRow,
  BlockHash,
  BlockHeight,
  BlockHeightContainer,
  BlockNavigationButton,
  BlockNavigationIcon,
  Container,
  Content,
  ProducerLink,
  RowKeyColumn,
  Title,
  TransactionsCount,
} from './components';

export default function BlockPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { block } = useParams() as any;

  const { data, loading } = useBlockPageQuery({
    variables: {
      height: BigNumber.from(block).toString(),
      previousHeight: BigNumber.from(block).sub(1).toString(),
    },
  });

  const bl = data?.block;
  const prevBl = data?.previousBlock;

  const headerId = bl?.header?.id;
  const consensusSignature = useMemo(() => {
    switch (bl?.consensus.__typename) {
      case 'PoAConsensus':
        return bl?.consensus?.signature;
      default:
        return '';
    }
  }, [bl?.consensus]);

  const producerAddress = useMemo(() => {
    if (headerId && consensusSignature) {
      return Signer.recoverAddress(headerId, consensusSignature).toString();
    }

    return '';
  }, [headerId, consensusSignature]);

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
              <ProducerLink to={`/address/${producerAddress}`}>{producerAddress}</ProducerLink>
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
