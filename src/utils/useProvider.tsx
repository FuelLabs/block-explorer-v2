/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApolloClient } from '@apollo/client';
import { useMemo } from 'react';

export const useProviderUrl = () => {
  const client = useApolloClient();

  const providerUrl = useMemo(() => {
    const linkUri = (client?.link as any)?.options?.uri;
    const providerUrl: string | undefined = typeof linkUri === 'function' ? linkUri() : linkUri;
    if (!providerUrl) return undefined;

    return providerUrl;
  }, [client]);

  return {
    providerUrl,
  };
};
