import { useState } from 'react';
import { graphql, useFragment } from 'react-relay';

import { ExpandIcon, ShrinkIcon } from '../../components/Icons';

import UTXOInputBox from './UTXOInputBox';
import UTXOOutputBox from './UTXOOutputBox';
import type { UTXOComponent_transaction$key } from './__generated__/UTXOComponent_transaction.graphql';
import {
  UTXOContainer,
  DetailsButtonContainer,
  DetailsButton,
  UTXOBoxesContainer,
  UTXOBoxesColumn,
  UTXOSeparatorColumn,
  UTXOSeparatorArrow,
} from './components';

export default function UTXOComponent(props: { transaction: UTXOComponent_transaction$key }) {
  const { inputs, outputs } = useFragment(
    graphql`
      fragment UTXOComponent_transaction on Transaction {
        inputs {
          ...UTXOInputBox_input
        }
        outputs {
          ...UTXOOutputBox_output
        }
      }
    `,
    props.transaction
  );
  const [expanded, setExpanded] = useState(false);

  const onClickDetails = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

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
