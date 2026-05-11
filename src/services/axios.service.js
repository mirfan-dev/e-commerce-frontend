import axios from "axios";
import { BASE_URL } from "./helper.service";
import { doLogoutFromLocalStorage, getRefreshTokenFromLocalStorage, getTokenFromLocalStorage } from "../auth/auth.helper";
import { refreshToken } from "./user.service";



export const publicAxios = axios.create({
  baseURL: BASE_URL
})

export const privateAxios = axios.create({
  baseURL: BASE_URL
})


privateAxios.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Reuse refreshToken function
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshTokenData = getRefreshTokenFromLocalStorage();
      
      if (!refreshTokenData) {
        doLogoutFromLocalStorage();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      return refreshToken({ refreshToken: refreshTokenData })
        .then(() => {
          const newToken = getTokenFromLocalStorage();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return privateAxios(originalRequest);
        })
        .catch((refreshError) => {
          doLogoutFromLocalStorage();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        });
    }
    
    return Promise.reject(error);
  }
);

