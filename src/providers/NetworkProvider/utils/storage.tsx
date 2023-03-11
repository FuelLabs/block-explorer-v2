import { PROVIDER_URL_STORAGE_KEY, PROVIDER_VERSION_STORAGE_KEY } from '../../../constants';

export function getProviderUrl() {
  // Get from local storage by key
  const item = localStorage.getItem(PROVIDER_URL_STORAGE_KEY);
  // Parse stored json or if none return initialValue
  return item || null;
}

export function setProviderUrl(url: string) {
  localStorage.setItem(PROVIDER_URL_STORAGE_KEY, url);
  window.location.reload();
}

export function removeProviderUrl() {
  localStorage.removeItem(PROVIDER_URL_STORAGE_KEY);
  window.location.reload();
}

export function getNetworkVersion() {
  return localStorage.getItem(PROVIDER_VERSION_STORAGE_KEY);
}

export function setNetworkVersion(version: string) {
  localStorage.setItem(PROVIDER_VERSION_STORAGE_KEY, version);
}
