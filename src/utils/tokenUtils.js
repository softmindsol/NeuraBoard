export const decodeJWTPayload = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.warn("Failed to decode JWT token:", error.message);
    return null;
  }
};

export const isJWTExpired = (token) => {
  const payload = decodeJWTPayload(token);

  if (!payload || !payload.exp) {
    return true; // Treat invalid tokens as expired
  }

  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

export const getJWTExpiry = (token) => {
  const payload = decodeJWTPayload(token);

  if (!payload || !payload.exp) {
    return null;
  }

  return new Date(payload.exp * 1000);
};

export const getTimeUntilJWTExpiry = (token) => {
  const expiryDate = getJWTExpiry(token);

  if (!expiryDate) {
    return 0;
  }

  return expiryDate.getTime() - Date.now();
};

export const isValidAuthToken = (token) => {
  if (!token) return false;

  const payload = decodeJWTPayload(token);
  if (!payload) return false;

  return !isJWTExpired(token);
};

// Token Storage Management
const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const hasValidToken = () => {
  const token = getAccessToken();
  return isValidAuthToken(token);
};
