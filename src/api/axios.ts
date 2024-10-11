import { API_URL } from "@/utils/env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => {
    // ApiResult 형태로 응답을 처리
    const { success, message, code, response: data } = response.data;

    // 성공적인 응답 처리
    if (!success) {
      // 실패시 에러 처리
      console.error(`Error ${code}: ${message}`);
      return Promise.reject(new Error(message));
    }

    // 성공적인 데이터 반환
    return data;
  },
  error => {
    // 에러 응답 처리
    console.error('API request failed:', error);
    return Promise.reject(error);
  }
);
