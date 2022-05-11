import type { BigNumberish } from '@ethersproject/bignumber';
import { commify, formatUnits, parseUnits } from '@ethersproject/units';

export const parseToFormattedNumber = (
  value: string | BigNumberish,
  unit: BigNumberish = 3
) => commify(formatUnits(value, unit));
