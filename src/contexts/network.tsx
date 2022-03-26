import React, { useMemo } from "react";

import type { Chain } from "../api";
import { useChainQuery } from "../api";

export const ChainContext = React.createContext<{
  chains: Chain[];
  loading: boolean;
}>({
  chains: [],
  loading: false,
});

export function ChainProvider({ children }: { children: React.ReactNode }) {
  const { data, loading } = useChainQuery();
  const chains = useMemo<Chain[]>(
    () => (data?.chain ? [data.chain] : []),
    [data]
  );

  const value = useMemo(
    () => ({
      chains,
      loading,
    }),
    [chains, loading]
  );

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
}
