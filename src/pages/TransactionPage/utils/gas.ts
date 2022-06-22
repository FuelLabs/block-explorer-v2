import { arrayify } from '@ethersproject/bytes';

export type CalculateGasUsedParams = {
  bytePrice: number;
  rawPayload: string;
  witnesses: string[];
  gasPriceFactor: number;
  gasPrice: number;
  gasLimit: number;
};

export const calculateTransactionFee = ({
  bytePrice,
  rawPayload,
  witnesses,
  gasPriceFactor,
  gasPrice,
  gasLimit,
}: CalculateGasUsedParams) => {
  const processedByte =
    bytePrice *
    (arrayify(rawPayload).length - witnesses.reduce((t, w) => t + arrayify(w).length, 0));

  const gasLimitAmount = gasPrice * gasLimit;
  const calc =
    Math.ceil(processedByte / gasPriceFactor) + Math.ceil(gasLimitAmount / gasPriceFactor);

  return calc;
};
