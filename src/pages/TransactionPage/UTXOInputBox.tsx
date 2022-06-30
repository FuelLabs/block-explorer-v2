import { graphql, useFragment } from 'react-relay';

import { trimAddress } from '../../utils';
import { parseToFormattedNumber } from '../../utils/bigNumber';
import { CopyButtonIcon, TableHeadlineAddressButton, Tooltip } from '../AddressPage/components';
import { UTXODetailsValue } from '../CreateTransactionPage/components';

import type { UTXOInputBox_input$key } from './__generated__/UTXOInputBox_input.graphql';
import {
  UTXOBoxContainer,
  UTXOHeadlineContainer,
  UTXOHeadlineColumn,
  UTXOTitle,
  HeadlineText,
  UTXODetailsContainer,
  UTXODetailsRow,
  UTXODetailsKey,
  UTXODetailsLink,
  UTXOHeadlineColumn2,
  UTXOHashOutputSkip,
} from './components';

export default function UTXOInputBox(props: {
  input: UTXOInputBox_input$key;
  expanded: boolean;
  idx: number;
}) {
  const { idx, expanded } = props;
  const input = useFragment(
    graphql`
      fragment UTXOInputBox_input on Input {
        __typename
        ... on InputCoin {
          utxoId
          owner
          amount
          assetId
          witnessIndex
          maturity
          predicate
          predicateData
        }
        ... on InputContract {
          utxoId
          balanceRoot
          stateRoot
          contract {
            id
          }
        }
      }
    `,
    props.input
  );

  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  switch (input.__typename) {
    case 'InputCoin': {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHashOutputSkip to="">{input.utxoId}</UTXOHashOutputSkip>
            </UTXOHeadlineColumn>
            <UTXOHeadlineColumn2>
              <HeadlineText>Value</HeadlineText>
              <HeadlineText>{parseToFormattedNumber(input.amount)}</HeadlineText>
            </UTXOHeadlineColumn2>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Owner:</UTXODetailsKey>
                <UTXODetailsLink to={`/address/${input.owner}`}>
                  {trimAddress(input.owner)}
                </UTXODetailsLink>
                <TableHeadlineAddressButton
                  onClick={() => {
                    onClickCopy(input.owner);
                  }}
                >
                  <CopyButtonIcon />
                  <Tooltip>Copy Address</Tooltip>
                </TableHeadlineAddressButton>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Amount:</UTXODetailsKey>
                {parseToFormattedNumber(input.amount)}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Asset ID:</UTXODetailsKey>
                <UTXOHashOutputSkip to="">{trimAddress(input.assetId)}</UTXOHashOutputSkip>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Predicate bytecode:</UTXODetailsKey>
                {input.predicate}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Predicate data:</UTXODetailsKey>
                {input.predicateData}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Predicate length:</UTXODetailsKey>
                {0}
                {/* {TBD} */}
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Witness Index:</UTXODetailsKey>
                {input.witnessIndex}
              </UTXODetailsRow>
            </UTXODetailsContainer>
          )}
        </UTXOBoxContainer>
      );
    }
    case 'InputContract': {
      return (
        <UTXOBoxContainer>
          <UTXOHeadlineContainer>
            <UTXOHeadlineColumn>
              <UTXOTitle>{`Input #${idx}`}</UTXOTitle>
              <UTXOHashOutputSkip to="">{input.utxoId}</UTXOHashOutputSkip>
            </UTXOHeadlineColumn>
          </UTXOHeadlineContainer>
          {expanded && (
            <UTXODetailsContainer>
              <UTXODetailsRow>
                <UTXODetailsKey>Contract Id:</UTXODetailsKey>
                <UTXOHashOutputSkip to="">{trimAddress(input.contract.id)}</UTXOHashOutputSkip>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>Balance Root:</UTXODetailsKey>
                <UTXODetailsValue>{trimAddress(input.balanceRoot)}</UTXODetailsValue>
              </UTXODetailsRow>
              <UTXODetailsRow>
                <UTXODetailsKey>State Root:</UTXODetailsKey>
                <UTXODetailsValue>{trimAddress(input.stateRoot)}</UTXODetailsValue>
              </UTXODetailsRow>
            </UTXODetailsContainer>
          )}
        </UTXOBoxContainer>
      );
    }
    default:
      return null;
  }
}
