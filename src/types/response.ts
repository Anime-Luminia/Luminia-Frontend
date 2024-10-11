export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  code?: string;
  response?: T;
}
