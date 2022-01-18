export type Input = InputCoin | InputContract;

export type InputCoin = {
  __typename: string;
  utxoId: string;
  owner: string;
  amount: number;
  color: string;
  witnessIndex: number;
  maturity: number;
  predicate: string;
  predicateData: string;
};

export type InputContract = {
  __typename: string;
  utxoId: string;
  balanceRoot: string;
  stateRoot: string;
  contractId: string;
};
