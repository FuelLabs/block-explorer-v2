import { arrayify } from '@ethersproject/bytes';

export type CalculateGasUsedParams = {
  rawPayload: string;
  witnesses: string[];
  gasPriceFactor: number;
  gasPrice: number;
  gasUsed: number;
};

export const calculateTransactionFee = ({
  rawPayload,
  witnesses,
  gasPriceFactor,
  gasPrice,
  gasUsed,
}: CalculateGasUsedParams) => {
  const gasUsedAmount = gasPrice * gasUsed;

  return Math.ceil(gasUsedAmount / gasPriceFactor);
};
