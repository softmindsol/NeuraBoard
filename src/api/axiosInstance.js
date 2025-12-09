import axios from "axios";
import { getAccessToken, removeTokens } from "@/utils/tokenUtils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance for unauthenticated requests (login, signup, etc.)
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance for authenticated requests
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for authenticated API
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeTokens();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
