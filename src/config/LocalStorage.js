export const setRefreshToken = refreshToken => {
  localStorage.refreshToken = refreshToken;
}

export const clearRefreshToken = refreshToken => {
  localStorage.removeItem("refreshToken");
}

export const getRefreshToken = () => {
  return localStorage.refreshToken;
}

