import { Provider, TransactionType, InputType, OutputType } from "fuels";
import { BigNumber } from "@ethersproject/bignumber";
import { hexlify } from "@ethersproject/bytes";

const genBytes32 = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

function thousandSeparator(number : any) {
  var parts = number.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}
/**
 * Helper function to send transactions to the Fuel Node
 */
async function run() {
  async function getUnspentCoins(owner) {
    const result = await provider.operations.getCoinsByOwner({ owner, first: 9999 });

    const coins = result.coinsByOwner.edges
      .map((edge) => edge.node)
      .filter((coin) => coin.status === "UNSPENT");

    return coins.map((coin) => ({
      id: coin.id,
      color: coin.color,
      amount: thousandSeparator(BigNumber.from(coin.amount)),
      owner: coin.owner,
      maturity: BigNumber.from(coin.maturity),
      blockCreated: BigNumber.from(coin.blockCreated),
    }));
  }

  const provider = new Provider("http://127.0.0.1:4000/graphql");
  const from = "0x0101010101010101010101010101010101010101010101010101010101010101";
  const to = genBytes32();
  const amount = thousandSeparator(BigNumber.from(1));
  await provider.sendTransaction({
    type: TransactionType.Script,
    gasPrice: thousandSeparator(BigNumber.from(0)),
    gasLimit: thousandSeparator(BigNumber.from(1000000)),
    script: "0x24400000",
    scriptData: "0x",
    inputs: [
      {
        type: InputType.Coin,
        utxoId: (await getUnspentCoins(from))[0].id,
        owner: from,
        color: "0x0000000000000000000000000000000000000000000000000000000000000000",
        amount,
        witnessIndex: 0,
        maturity: 0,
        predicate: "0x",
        predicateData: "0x",
      },
    ],
    outputs: [
      {
        type: OutputType.Coin,
        to,
        color: "0x0000000000000000000000000000000000000000000000000000000000000000",
        amount,
      },
    ],
    witnesses: ["0x"],
  });
}

run();
