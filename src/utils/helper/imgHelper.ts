import { getAppEnvConfig } from '/@/utils/env';

const { VITE_GLOB_API_URL } = getAppEnvConfig();

export function handleAvatar(url: string) {
  return url ? `${VITE_GLOB_API_URL}/${url}` : 'avatar.jpg';
}
