export const trimAddress = (address: string) => {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 6)}...${address.slice(-6, address.length - 1)}`;
};
