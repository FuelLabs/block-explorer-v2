/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApolloClient } from '@apollo/client';
import { Provider } from 'fuels';
import { useMemo } from 'react';

export const useProvider = () => {
  const client = useApolloClient();

  const provider = useMemo(() => {
    const providerUrl: string | undefined = (client?.link as any)?.options?.uri;
    if (!providerUrl) return undefined;

    return new Provider(providerUrl);
  }, [client]);

  return {
    provider,
  };
};
