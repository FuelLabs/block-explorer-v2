import { graphql, useFragment } from 'react-relay';

import { trimAddress } from '../../utils';
import { parseToFormattedNumber } from '../../utils/bigNumber';
import { CopyButtonIcon, TableHeadlineAddressButton, Tooltip } from '../AddressPage/components';
import { UTXODetailsValue } from '../CreateTransactionPage/components';

import type {
  UTXOOutputBox_output$data,
  UTXOOutputBox_output$key,
} from './__generated__/UTXOOutputBox_output.graphql';
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

function UTXOOutput({ output }: { output: UTXOOutputBox_output$data }) {
  const onClickCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  switch (output.__typename) {
    case 'ContractCreated': {
      return (
        <UTXODetailsRow>
          <UTXODetailsKey>Contract Id:</UTXODetailsKey>
          <UTXOHashOutputSkip to="">{output.contract.id}</UTXOHashOutputSkip>
        </UTXODetailsRow>
      );
    }
    case 'ContractOutput': {
      return (
        <>
          <UTXODetailsRow>
            <UTXODetailsKey>Balance Root:</UTXODetailsKey>
            <UTXODetailsValue>{trimAddress(output.balanceRoot)}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>State Root:</UTXODetailsKey>
            <UTXODetailsValue>{trimAddress(output.stateRoot)}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Input index:</UTXODetailsKey>
            <UTXODetailsValue>{output.inputIndex}</UTXODetailsValue>
          </UTXODetailsRow>
        </>
      );
    }
    case 'CoinOutput':
    case 'ChangeOutput': {
      return (
        <>
          <UTXODetailsRow>
            <UTXODetailsKey>To:</UTXODetailsKey>
            <UTXODetailsLink to={`/address/${output.to}`}>{trimAddress(output.to)}</UTXODetailsLink>
            <TableHeadlineAddressButton
              onClick={() => {
                onClickCopy(output.to);
              }}
            >
              <CopyButtonIcon />
              <Tooltip>Copy Address</Tooltip>
            </TableHeadlineAddressButton>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Amount:</UTXODetailsKey>
            <UTXODetailsValue>{parseToFormattedNumber(output.amount)}</UTXODetailsValue>
          </UTXODetailsRow>
          <UTXODetailsRow>
            <UTXODetailsKey>Asset ID:</UTXODetailsKey>
            <UTXOHashOutputSkip to="">{trimAddress(output.assetId)}</UTXOHashOutputSkip>
          </UTXODetailsRow>
        </>
      );
    }
    default:
      return null;
  }
}

export default function UTXOOutputBox(props: {
  output: UTXOOutputBox_output$key;
  expanded: boolean;
  index: number;
}) {
  const { expanded, index } = props;
  const output = useFragment(
    graphql`
      fragment UTXOOutputBox_output on Output {
        __typename
        ... on CoinOutput {
          to
          amount
          assetId
        }
        ... on ContractOutput {
          inputIndex
          balanceRoot
          stateRoot
        }
        ... on WithdrawalOutput {
          to
          amount
          assetId
        }
        ... on ChangeOutput {
          to
          amount
          assetId
        }
        ... on VariableOutput {
          to
          amount
          assetId
        }
        ... on ContractCreated {
          contract {
            id
          }
        }
      }
    `,
    props.output
  );
  return (
    <UTXOBoxContainer>
      <UTXOHeadlineContainer>
        <UTXOHeadlineColumn>
          <UTXOTitle>Output #{index}</UTXOTitle>
          <UTXOHashOutputSkip to="">{output.__typename}</UTXOHashOutputSkip>
        </UTXOHeadlineColumn>
        {output.__typename === 'CoinOutput' && (
          <UTXOHeadlineColumn2>
            <HeadlineText>Amount</HeadlineText>
            <HeadlineText>{parseToFormattedNumber(output.amount)}</HeadlineText>
          </UTXOHeadlineColumn2>
        )}
      </UTXOHeadlineContainer>
      {expanded && (
        <UTXODetailsContainer>
          <UTXOOutput output={output} />
        </UTXODetailsContainer>
      )}
    </UTXOBoxContainer>
  );
}
