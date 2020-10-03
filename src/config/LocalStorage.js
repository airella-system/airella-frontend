export const setRefreshToken = refreshToken => {
  localStorage.refreshToken = refreshToken;
}

export const getRefreshToken = () => {
  return localStorage.refreshToken;
}