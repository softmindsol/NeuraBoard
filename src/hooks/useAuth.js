import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/axiosInstance";
import { AUTH_ENDPOINTS } from "@/api/endpoints";
import { setAccessToken, setRefreshToken } from "@/utils/tokenUtils";

// Signup mutation
export const useSignup = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.post(AUTH_ENDPOINTS.REGISTER, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Store tokens
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken);
      }
      if (data.data?.refreshToken) {
        setRefreshToken(data.data.refreshToken);
      }
    },
  });
};

// Login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.post(AUTH_ENDPOINTS.LOGIN, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Store tokens
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken);
      }
      if (data.data?.refreshToken) {
        setRefreshToken(data.data.refreshToken);
      }
    },
  });
};

// Verify OTP mutation
export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.post(AUTH_ENDPOINTS.VERIFY_OTP, data);
      return response.data;
    },
  });
};

// Resend OTP mutation
export const useResendOTP = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.post(AUTH_ENDPOINTS.RESEND_OTP, data);
      return response.data;
    },
  });
};

// Forgot Password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
      return response.data;
    },
  });
};

// Reset Password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);
      return response.data;
    },
  });
};
