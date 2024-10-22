import { atom } from 'recoil';

export const loggedInState = atom<boolean>({
  key: 'loggedInState',
  default: false,
});

export const darkModeState = atom<boolean>({
  key: 'darkModeState',
  default: false,
});
