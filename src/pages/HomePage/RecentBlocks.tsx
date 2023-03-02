import { Signer } from 'fuels';
import { useMemo, useState } from 'react';

import { dateDiff, getTextForTimeDifference, tai64toDate } from '../../utils/date';

import type { HomePageBlock } from './__generated__/operations';
import {
  BlockNumber,
  RecentBlockColumn1,
  RecentBlockColumn2,
  RecentBlockRow,
  DataBox,
  DataItem,
  DataTimestamp,
  DataTitle,
  TxCount,
  BlockProducerText,
  ProducerAddress,
} from './components';

type Props = {
  blocks: HomePageBlock[];
};

export function RecentBlocks({ blocks }: Props) {
  return (
    <DataItem>
      <DataTitle>Recent Blocks</DataTitle>
      <DataBox>
        {blocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </DataBox>
    </DataItem>
  );
}

function BlockItem({ block }: { block: HomePageBlock }) {
  const headerId = block?.header?.id;
  const consensusSignature = useMemo(() => {
    switch (block?.consensus.__typename) {
      case 'PoAConsensus':
        return block?.consensus?.signature;
      default:
        return '';
    }
  }, [block?.consensus]);

  const producerAddress = useMemo(() => {
    if (headerId && consensusSignature) {
      return Signer.recoverAddress(headerId, consensusSignature).toString();
    }

    return '';
  }, [headerId, consensusSignature]);

  return (
    <RecentBlockRow key={block.id}>
      <RecentBlockColumn1>
        <BlockNumber id="recent-block-link" to={`/block/${block.header.height}`}>
          {block.header.height}
        </BlockNumber>
        <BlockTimestamp blockDate={tai64toDate(block.header.time)} />
      </RecentBlockColumn1>
      <RecentBlockColumn2>
        <BlockProducerText>
          {`Producer: `}
          <ProducerAddress id="recent-block-producer-link" to={`/address/${producerAddress}`}>
            {producerAddress}
          </ProducerAddress>
        </BlockProducerText>
        <TxCount
          id="recent-block-transactions-link"
          to={`/block/${block.header.height}/transactions`}
        >{`${block.transactions?.length} txn(s)`}</TxCount>
      </RecentBlockColumn2>
    </RecentBlockRow>
  );
}

function BlockTimestamp({ blockDate }: { blockDate: Date }) {
  const textDifference = useMemo(
    () => getTextForTimeDifference(dateDiff(new Date(), blockDate)),
    [blockDate]
  );

  return <DataTimestamp>{textDifference}</DataTimestamp>;
}
