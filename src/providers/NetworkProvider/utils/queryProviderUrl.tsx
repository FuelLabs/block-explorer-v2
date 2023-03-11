export function getQueryProviderUrl() {
  const { location } = window;
  const queryParams = new URLSearchParams(location.search);
  const providerUrl = queryParams.get('providerUrl');
  return providerUrl;
}
