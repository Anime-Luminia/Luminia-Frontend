import { API_URL } from './env';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://luminia.kr',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
