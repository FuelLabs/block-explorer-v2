import { OutputType } from 'fuels';

export const trimAddress = (address: string) => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`;
};

export const getOutputTypeText = (outputType: OutputType) => {
  switch (outputType) {
    case OutputType.Change:
      return 'Change';
    case OutputType.Coin:
      return 'Coin';
    case OutputType.Contract:
      return 'Contract';
    case OutputType.ContractCreated:
      return 'ContractCreated';
    case OutputType.Message:
      return 'Message';
    case OutputType.Variable:
      return 'Variable';
    default:
      return 'Unknown';
  }
};
