/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApolloClient } from '@apollo/client';
import { Provider } from 'fuels';
import { useMemo } from 'react';

export const useProvider = () => {
  const client = useApolloClient();

  const provider = useMemo(() => {
    const linkUri = (client?.link as any)?.options?.uri;
    const providerUrl: string | undefined = typeof linkUri === 'function' ? linkUri() : linkUri;
    if (!providerUrl) return undefined;

    return new Provider(providerUrl);
  }, [client]);

  return {
    provider,
  };
};
