import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useRecoilState } from 'recoil';
import { accessTokenState, loggedInState } from '../recoil/atoms';
import { AxiosError } from 'axios';
import { api } from './axios';

const useLogout = () => {
  const navigate = useNavigate();
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetLoggedIn = useResetRecoilState(loggedInState);
  const [accessToken] = useRecoilState(accessTokenState);

  return async () => {
    try {
      await api.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      resetAccessToken();
      resetLoggedIn();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error('Failed to logout:', axiosError);

      resetAccessToken();
      resetLoggedIn();
      navigate('/login');
    }
  };
};

export default useLogout;
