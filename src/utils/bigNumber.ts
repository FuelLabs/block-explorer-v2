import type { BigNumberish } from '@ethersproject/bignumber';
import { commify, formatUnits, parseUnits } from '@ethersproject/units';

export const parseToFormattedNumber = (value: string | BigNumberish, unit?: BigNumberish) => {
  const bigNumber = typeof value === 'string' ? parseUnits(value, unit) : value;

  return commify(formatUnits(bigNumber, unit));
};
