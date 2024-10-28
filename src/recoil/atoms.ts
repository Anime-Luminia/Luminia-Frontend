import { atom } from 'recoil';
import { snapshot_UNSTABLE } from 'recoil';

export const loggedInState = atom<boolean>({
  key: 'loggedInState',
  default: false,
});

export const darkModeState = atom<boolean>({
  key: 'darkModeState',
  default: false,
});

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
});

let currentAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  currentAccessToken = token;
};

export const getAccessToken = () => currentAccessToken;
