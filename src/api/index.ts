import gql from "graphql-tag";

export const queries = {
  getChain: gql`{
    chain {
      name
      baseChainHeight
      peerCount
    }
  }`,
  getHomeTransactions: gql`
    query GetHomeTransactions($count: Int) {
      transactions(last: $count) {
        edges {
          node {
            id
            inputContracts
            inputColors
            gasPrice
            gasLimit
            maturity
            isScript 
            receiptsRoot
            witnesses
            outputs {
              __typename
              ... on CoinOutput {
                to
                amount
                color
              }
              ... on ContractOutput {
                inputIndex
                balanceRoot
                stateRoot
              }
              ... on WithdrawalOutput {
                to
                amount
                color
              }
              ... on ChangeOutput {
                to
                amount
                color
              }
              ... on VariableOutput {
                to
                amount
                color
              }
              ... on ContractCreated {
                contractId
              }
            }
            inputs {
              __typename
              ... on InputCoin {
                owner
              }
              ... on InputContract {
                contractId
              }
            }
            status {
              ... on SubmittedStatus {
                time
              }
              ... on SuccessStatus {
                time
              }
              ... on FailureStatus {
                time
              }
            }
          }
        }
      }
    }`
  ,
  getHomeBlocks: gql`
    query GetHomeBlocks($count: Int) { 
      blocks(last: $count) {
        edges {
          cursor
          node {
            id
            height
            time
            producer
            transactions {
              id
            }
          }
        }
      }
    }`
  , 
  getTransaction: gql`
    query GetTransaction($id: String) {
      transaction(id: $id) {
        id
          inputContracts
          inputColors
          gasPrice
          gasLimit
          maturity
          isScript 
          receiptsRoot
          witnesses
          outputs {
            __typename
            ... on CoinOutput {
              to
              amount
              color
            }
            ... on ContractOutput {
              inputIndex
              balanceRoot
              stateRoot
            }
            ... on WithdrawalOutput {
              to
              amount
              color
            }
            ... on ChangeOutput {
              to
              amount
              color
            }
            ... on VariableOutput {
              to
              amount
              color
            }
            ... on ContractCreated {
              contractId
            }
          }
          inputs {
            __typename
            ... on InputCoin {
              utxoId
              owner
              amount
              color
              witnessIndex
              maturity
              predicate
              predicateData
            }
            ... on InputContract {
              utxoId
              balanceRoot
              stateRoot
              contractId
            }
          }
          status {
            ... on SubmittedStatus {
              time
            }
            ... on SuccessStatus {
              time
            }
            ... on FailureStatus {
              time
            }
          }
      } 
    }
  `,
  getBlock: gql`
    query GetBlock($id: String) { 
      block(id: $id) {
        id
        height
        time
        producer
        transactions {
          id
          inputColors
          inputContracts
          gasPrice
          gasLimit
          maturity
          isScript
          witnesses
          receiptsRoot
        }
      }
    }`
  ,
  getBlockByHeight: gql`
    query GetBlockByHeight($height: Int) { 
      block(height: $height) {
        id
        height
        time
        producer
        transactions {
          id
          inputContracts
          inputColors
          gasPrice
          gasLimit
          maturity
          isScript 
          receiptsRoot
          witnesses
          outputs {
            __typename
            ... on CoinOutput {
              to
              amount
              color
            }
            ... on ContractOutput {
              inputIndex
              balanceRoot
              stateRoot
            }
            ... on WithdrawalOutput {
              to
              amount
              color
            }
            ... on ChangeOutput {
              to
              amount
              color
            }
            ... on VariableOutput {
              to
              amount
              color
            }
            ... on ContractCreated {
              contractId
            }
          }
          inputs {
            __typename
            ... on InputCoin {
              owner
            }
            ... on InputContract {
              contractId
            }
          }
          status {
            ... on SubmittedStatus {
              time
            }
            ... on SuccessStatus {
              time
            }
            ... on FailureStatus {
              time
            }
          }
        }
      }
    }`
  ,
  getPreviousBlockByHeight: gql`
    query GetPreviousBlockByHeight($height: Int) { 
      block(height: $height) {
        id
        height
        time
      }
    }`
  ,
};
