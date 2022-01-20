import { Receipt, Status } from "../models";
import { Output } from "./output";
import { Input } from "./input";

export type Transaction = {
  id: string;
  inputColors: string[];
  inputContracts: string[];
  gasPrice: number;
  gasLimit: number;
  maturity: number;
  isScript: boolean;
  inputs: Input[];
  outputs: Output[];
  witnesses: string[];
  receiptsRoot: string;
  status: Status;
  receipts: Receipt[];
};
