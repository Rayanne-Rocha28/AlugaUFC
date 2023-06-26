function isAuthenticated() {
  return !!localStorage.getItem("access_token");
}

function getAuthUser() {
  return JSON.parse(localStorage.getItem("user_payload"));
}

function logoutUser() {
  return Promise.all([
    localStorage.removeItem("user_payload"),
    localStorage.removeItem("access_token"),
  ]);
}

export { isAuthenticated, getAuthUser, logoutUser };
