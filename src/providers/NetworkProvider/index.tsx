import { useEffect } from 'react';
import urlJoin from 'url-join';

import { httplink } from '../../client';

import { useNetworkInformationQuery } from './__generated__/operations';
import { getQueryProviderUrl } from './utils/queryProviderUrl';
import { getProviderUrl, setNetworkVersion, setProviderUrl } from './utils/storage';

const { location } = window;
const { REACT_APP_REPOSITORY_NAME } = process.env;
const repositoryName = REACT_APP_REPOSITORY_NAME || '/';

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const { loading } = useNetworkInformationQuery({
    onCompleted: async (data) => {
      const versions: Record<string, string> = await fetch(
        urlJoin(repositoryName, '/protocol-versions.json')
      ).then((res) => res.json());
      const nodeVersion = data.nodeInfo.nodeVersion;
      const [, version] = nodeVersion.split('.');
      setNetworkVersion(nodeVersion);
      const compatibleVersion = Object.keys(versions).find((k) => Number(k) >= Number(version));
      if (compatibleVersion) {
        if (!location.pathname.includes(versions[compatibleVersion])) {
          const pathname = urlJoin(repositoryName, versions[compatibleVersion]);
          location.href = `${location.origin}${pathname}/${location.hash}`;
        }
      }
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });

  useEffect(() => {
    // If providerUrl is present remove from url and redirect to clean url
    const queryProviderUrl = getQueryProviderUrl();
    if (queryProviderUrl) {
      setProviderUrl(queryProviderUrl);
      location.href = location.href.replace(location.search, '');
    }
    httplink.options.uri = getProviderUrl() || httplink.options.uri;
  }, []);

  if (loading) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
