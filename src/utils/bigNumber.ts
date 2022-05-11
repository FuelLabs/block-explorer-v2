import type { BigNumberish } from '@ethersproject/bignumber';
import { commify, formatUnits, parseUnits } from '@ethersproject/units';

export const DECIMAL_UNITS = 3;
export const parseToFormattedNumber = (
  value: string | BigNumberish,
  unit: BigNumberish = DECIMAL_UNITS
) => commify(formatUnits(value, unit));
