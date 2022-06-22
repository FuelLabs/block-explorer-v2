import { arrayify } from '@ethersproject/bytes';

export type CalculateGasUsedParams = {
  bytePrice: number;
  rawPayload: string;
  witnesses: string[];
  gasPriceFactor: number;
  gasPrice: number;
  gasUsed: number;
};

export const calculateTransactionFee = ({
  bytePrice,
  rawPayload,
  witnesses,
  gasPriceFactor,
  gasPrice,
  gasUsed,
}: CalculateGasUsedParams) => {
  const processedByte =
    bytePrice *
    (arrayify(rawPayload).length - witnesses.reduce((t, w) => t + arrayify(w).length, 0));
  const gasUsedAmount = gasPrice * gasUsed;

  return Math.ceil(processedByte / gasPriceFactor) + Math.ceil(gasUsedAmount / gasPriceFactor);
};
