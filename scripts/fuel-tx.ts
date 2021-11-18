import { Provider, TransactionType, InputType, OutputType } from '@fuel-ts/fuels'
import { BigNumber } from '@ethersproject/bignumber';

/**
 * Helper function to send transactions to the Fuel Node
 */
async function run() {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  await provider.sendTransaction({
    type: TransactionType.Script,
    gasPrice: 0,
    gasLimit: 1000000,
    maturity: 0,
    script: '0x',
    scriptData: '0x',
    inputs: [
      {
        type: InputType.Coin,
        data: {
          utxoID: '0x0000000000000000000000000000000000000000000000000000000000000000',
          owner: '0x0000000000000000000000000000000000000000000000000000000000000000',
          amount: BigNumber.from('10'),
          color: "0x0000000000000000000000000000000000000000000000000000000000000000",
          witnessIndex: BigNumber.from(0),
          maturity: BigNumber.from(0),
          predicateLength: BigNumber.from(0),
          predicateDataLength: BigNumber.from(0),
          predicate: "0x",
          predicateData: "0x",
        },
      },
    ],
    outputs: [{
      type: OutputType.Coin,
      data: {
        amount: BigNumber.from('10'),
        to: '0x0000000000000000000000000000000000000000000000000000000000000000',
        color: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    }],
    witnesses: [],
  });
}

run();
