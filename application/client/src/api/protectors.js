export async function queryLogin() {
  let response = await fetch("/api/users/isLoggedIn")
  let loggedIn = await response.json();
  return loggedIn;
}
