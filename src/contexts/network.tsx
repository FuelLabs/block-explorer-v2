import { default as React, useMemo } from "react";
import { Chain, useChainQuery } from "../api";

export const ChainContext = React.createContext<{
  chains: Chain[];
  loading: boolean;
}>({
  chains: [],
  loading: false,
});

export const ChainProvider: React.FC = ({ children }) => {
  const { data, loading } = useChainQuery();
  const chains = useMemo<Chain[]>(() => {
    return data?.chain ? [data.chain] : [];
  }, [data]);

  return (
    <ChainContext.Provider
      value={{
        chains,
        loading,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};
