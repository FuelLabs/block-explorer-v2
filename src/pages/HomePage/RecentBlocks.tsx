import { useMemo, useState } from 'react';

import { dateDiff } from '../../utils/date';

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
  ProducerAddress,
  TxCount,
  BlockProducerText,
} from './components';

type Props = {
  blocks: HomePageBlock[];
};

export function RecentBlocks({ blocks }: Props) {
  const [now] = useState(new Date());

  return (
    <DataItem>
      <DataTitle>Recent Blocks</DataTitle>
      <DataBox>
        {blocks.map((block) => (
          <RecentBlockRow key={block.id}>
            <RecentBlockColumn1>
              <BlockNumber id="recent-block-link" to={`/block/${block.height}`}>
                {block.height}
              </BlockNumber>
              <BlockTimestamp date1={now} date2={new Date(block.time)} />
            </RecentBlockColumn1>
            <RecentBlockColumn2>
              <BlockProducerText>
                {`Producer: `}
                <ProducerAddress id="recent-block-producer-link" to={`/address/${block.producer}`}>
                  {block.producer}
                </ProducerAddress>
              </BlockProducerText>
              <TxCount
                id="recent-block-transactions-link"
                to={`/block/${block.height}/transactions`}
              >{`${block.transactions?.length} txn(s)`}</TxCount>
            </RecentBlockColumn2>
          </RecentBlockRow>
        ))}
      </DataBox>
    </DataItem>
  );
}

function BlockTimestamp({ date1, date2 }: { date1: Date; date2: Date }) {
  const difference = useMemo(() => dateDiff(date1, date2), [date1, date2]);
  // eslint-disable-next-line consistent-return
  const text = useMemo(() => {
    if (difference?.hours > 0) return `${difference.hours} hours ago`;
    if (difference?.minutes > 0) return `${difference.minutes} minutes ago`;
    if (difference?.seconds > 0) return `${difference.seconds} seconds ago`;
  }, [difference]);

  return <DataTimestamp>{text}</DataTimestamp>;
}
