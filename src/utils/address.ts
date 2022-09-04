import { Address } from 'fuels';

export const trimAddress = (address: string) => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`;
};

export const getB56Address = (address: string) => {
  try {
    return Address.fromString(address).toB256();
  } catch (e) {
    return address;
  }
};

export const getValidTransactionId = (txId: string) => (txId.startsWith('0x') ? txId : '0x');
