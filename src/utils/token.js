export function getAccessToken() {
  return localStorage.getItem('q_access_token')
}

export function setAccessToken(accessToken) {
  localStorage.setItem('q_access_token', accessToken);
}
