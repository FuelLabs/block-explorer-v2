export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: string;
  HexString: string;
  HexString256: string;
  HexStringUtxoId: string;
  U64: string;
};

export type Block = {
  __typename: "Block";
  height: Scalars["U64"];
  id: Scalars["HexString256"];
  producer: Scalars["HexString256"];
  time: Scalars["DateTime"];
  transactions: Array<Transaction>;
};

export type BlockConnection = {
  __typename: "BlockConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BlockEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BlockEdge = {
  __typename: "BlockEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Block;
};

export type ChainInfo = {
  __typename: "ChainInfo";
  baseChainHeight: Scalars["U64"];
  latestBlock: Block;
  name: Scalars["String"];
  peerCount: Scalars["Int"];
};

export type ChangeOutput = {
  __typename: "ChangeOutput";
  amount: Scalars["Int"];
  color: Scalars["HexString256"];
  to: Scalars["HexString256"];
};

export type Coin = {
  __typename: "Coin";
  amount: Scalars["U64"];
  blockCreated: Scalars["U64"];
  color: Scalars["HexString256"];
  maturity: Scalars["U64"];
  owner: Scalars["HexString256"];
  status: CoinStatus | "%future added value";
  utxoId: Scalars["HexStringUtxoId"];
};

export type CoinConnection = {
  __typename: "CoinConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CoinEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CoinEdge = {
  __typename: "CoinEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Coin;
};

export type CoinFilterInput = {
  /** color of the coins */
  color?: InputMaybe<Scalars["HexString256"]>;
  /** address of the owner */
  owner: Scalars["HexString256"];
};

export type CoinOutput = {
  __typename: "CoinOutput";
  amount: Scalars["Int"];
  color: Scalars["HexString256"];
  to: Scalars["HexString256"];
};

export enum CoinStatus {
  Spent = "SPENT",
  Unspent = "UNSPENT",
}

export type ContractCreated = {
  __typename: "ContractCreated";
  contractId: Scalars["HexString256"];
};

export type ContractOutput = {
  __typename: "ContractOutput";
  balanceRoot: Scalars["HexString256"];
  inputIndex: Scalars["Int"];
  stateRoot: Scalars["HexString256"];
};

export type FailureStatus = {
  __typename: "FailureStatus";
  blockId: Scalars["HexString256"];
  programState?: Maybe<ProgramState>;
  reason: Scalars["String"];
  time: Scalars["DateTime"];
};

export type Input = InputCoin | InputContract | { __typename?: "%other" };

export type InputCoin = {
  __typename: "InputCoin";
  amount: Scalars["Int"];
  color: Scalars["HexString256"];
  maturity: Scalars["Int"];
  owner: Scalars["HexString256"];
  predicate: Scalars["HexString"];
  predicateData: Scalars["HexString"];
  utxoId: Scalars["HexStringUtxoId"];
  witnessIndex: Scalars["Int"];
};

export type InputContract = {
  __typename: "InputContract";
  balanceRoot: Scalars["HexString256"];
  contractId: Scalars["HexString256"];
  stateRoot: Scalars["HexString256"];
  utxoId: Scalars["HexStringUtxoId"];
};

export type Mutation = {
  __typename: "Mutation";
  /** dry-run the transaction using a fork of current state, no changes are committed. */
  dryRun: Array<Receipt>;
  endSession: Scalars["Boolean"];
  execute: Scalars["Boolean"];
  reset: Scalars["Boolean"];
  startSession: Scalars["ID"];
  /** Submits transaction to the pool */
  submit: Scalars["HexString256"];
};

export type MutationDryRunArgs = {
  tx: Scalars["HexString"];
};

export type MutationEndSessionArgs = {
  id: Scalars["ID"];
};

export type MutationExecuteArgs = {
  id: Scalars["ID"];
  op: Scalars["String"];
};

export type MutationResetArgs = {
  id: Scalars["ID"];
};

export type MutationSubmitArgs = {
  tx: Scalars["HexString"];
};

export type Output =
  | ChangeOutput
  | CoinOutput
  | ContractCreated
  | ContractOutput
  | VariableOutput
  | WithdrawalOutput
  | { __typename?: "%other" };

/** Information about pagination in a connection */
export type PageInfo = {
  __typename: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
};

export type ProgramState = {
  __typename: "ProgramState";
  data: Scalars["HexString"];
  returnType: ReturnType | "%future added value";
};

export type Query = {
  __typename: "Query";
  block?: Maybe<Block>;
  blocks: BlockConnection;
  chain: ChainInfo;
  coin?: Maybe<Coin>;
  coins: CoinConnection;
  coinsToSpend: Array<Coin>;
  /** Returns true when the GraphQL API is serving requests. */
  health: Scalars["Boolean"];
  memory: Scalars["String"];
  register: Scalars["U64"];
  transaction?: Maybe<Transaction>;
  transactions: TransactionConnection;
  transactionsByOwner: TransactionConnection;
  version: Scalars["String"];
};

export type QueryBlockArgs = {
  height?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["HexString256"]>;
};

export type QueryBlocksArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryCoinArgs = {
  utxoId: Scalars["HexStringUtxoId"];
};

export type QueryCoinsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  filter: CoinFilterInput;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryCoinsToSpendArgs = {
  maxInputs?: InputMaybe<Scalars["Int"]>;
  owner: Scalars["HexString256"];
  spendQuery: Array<SpendQueryElementInput>;
};

export type QueryMemoryArgs = {
  id: Scalars["ID"];
  size: Scalars["U64"];
  start: Scalars["U64"];
};

export type QueryRegisterArgs = {
  id: Scalars["ID"];
  register: Scalars["U64"];
};

export type QueryTransactionArgs = {
  id: Scalars["HexString256"];
};

export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryTransactionsByOwnerArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  owner: Scalars["HexString256"];
};

export type Receipt = {
  __typename: "Receipt";
  a?: Maybe<Scalars["U64"]>;
  amount?: Maybe<Scalars["U64"]>;
  b?: Maybe<Scalars["U64"]>;
  color?: Maybe<Scalars["HexString256"]>;
  data?: Maybe<Scalars["HexString"]>;
  digest?: Maybe<Scalars["HexString256"]>;
  gas?: Maybe<Scalars["U64"]>;
  gasUsed?: Maybe<Scalars["U64"]>;
  id?: Maybe<Scalars["HexString256"]>;
  is?: Maybe<Scalars["U64"]>;
  len?: Maybe<Scalars["U64"]>;
  pc?: Maybe<Scalars["U64"]>;
  ptr?: Maybe<Scalars["U64"]>;
  ra?: Maybe<Scalars["U64"]>;
  rawPayload: Scalars["HexString"];
  rb?: Maybe<Scalars["U64"]>;
  rc?: Maybe<Scalars["U64"]>;
  rd?: Maybe<Scalars["U64"]>;
  reason?: Maybe<Scalars["U64"]>;
  receiptType: ReceiptType | "%future added value";
  result?: Maybe<Scalars["U64"]>;
  to?: Maybe<Scalars["HexString256"]>;
  toAddress?: Maybe<Scalars["HexString256"]>;
  val?: Maybe<Scalars["U64"]>;
};

export enum ReceiptType {
  Call = "CALL",
  Log = "LOG",
  LogData = "LOG_DATA",
  Panic = "PANIC",
  Return = "RETURN",
  ReturnData = "RETURN_DATA",
  Revert = "REVERT",
  ScriptResult = "SCRIPT_RESULT",
  Transfer = "TRANSFER",
  TransferOut = "TRANSFER_OUT",
}

export enum ReturnType {
  Return = "RETURN",
  ReturnData = "RETURN_DATA",
  Revert = "REVERT",
}

export type SpendQueryElementInput = {
  /** address of the owner */
  amount: Scalars["U64"];
  /** color of the coins */
  color: Scalars["HexString256"];
};

export type SubmittedStatus = {
  __typename: "SubmittedStatus";
  time: Scalars["DateTime"];
};

export type SuccessStatus = {
  __typename: "SuccessStatus";
  blockId: Scalars["HexString256"];
  programState: ProgramState;
  time: Scalars["DateTime"];
};

export type Transaction = {
  __typename: "Transaction";
  bytecodeWitnessIndex?: Maybe<Scalars["Int"]>;
  gasLimit: Scalars["Int"];
  gasPrice: Scalars["Int"];
  id: Scalars["HexString256"];
  inputColors: Array<Scalars["HexString256"]>;
  inputContracts: Array<Scalars["HexString256"]>;
  inputs: Array<Input>;
  isScript: Scalars["Boolean"];
  maturity: Scalars["Int"];
  outputs: Array<Output>;
  /** Return the transaction bytes using canonical encoding */
  rawPayload: Scalars["HexString"];
  receipts?: Maybe<Array<Receipt>>;
  receiptsRoot?: Maybe<Scalars["HexString256"]>;
  salt?: Maybe<Scalars["HexString256"]>;
  script?: Maybe<Scalars["HexString"]>;
  scriptData?: Maybe<Scalars["HexString"]>;
  staticContracts?: Maybe<Array<Scalars["HexString256"]>>;
  status?: Maybe<TransactionStatus>;
  witnesses: Array<Scalars["HexString"]>;
};

export type TransactionConnection = {
  __typename: "TransactionConnection";
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TransactionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TransactionEdge = {
  __typename: "TransactionEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node: Transaction;
};

export type TransactionStatus =
  | FailureStatus
  | SubmittedStatus
  | SuccessStatus
  | { __typename?: "%other" };

export type VariableOutput = {
  __typename: "VariableOutput";
  amount: Scalars["Int"];
  color: Scalars["HexString256"];
  to: Scalars["HexString256"];
};

export type WithdrawalOutput = {
  __typename: "WithdrawalOutput";
  amount: Scalars["Int"];
  color: Scalars["HexString256"];
  to: Scalars["HexString256"];
};
