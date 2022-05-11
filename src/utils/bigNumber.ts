import type { BigNumberish } from '@ethersproject/bignumber';
import { commify, formatUnits, parseUnits } from '@ethersproject/units';

export const parseToFormattedNumber = (
  value: string | BigNumberish,
  unit: BigNumberish = 'kwei'
) => {
  const bigNumber = typeof value === 'string' ? parseUnits(value, 0) : value;

  return commify(formatUnits(bigNumber, unit));
};
