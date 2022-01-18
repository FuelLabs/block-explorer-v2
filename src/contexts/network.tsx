import { useQuery } from "@apollo/client";
import { default as React, useMemo } from "react";
import { queries } from "../api";

import type { Chain } from "../utils/models";

export const ChainContext = React.createContext<{
  chains: Chain[];
  loading: boolean;
}>({
  chains: [],
  loading: false,
});

export const ChainProvider: React.FC = ({ children }) => {
  const { data, loading } = useQuery(queries.getChain);
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
