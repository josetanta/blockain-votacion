export function saveHashUser(token) {
  sessionStorage.setItem('token', String(token));
}

export function getHashUser() {
  return sessionStorage.getItem('token');
}

export function saveVoted(token) {
  sessionStorage.setItem('voted', String(token));
}

export function getVoted() {
  return sessionStorage.getItem('voted');
}
