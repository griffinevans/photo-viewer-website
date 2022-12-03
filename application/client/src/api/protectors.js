export async function queryLogin() {
  let response = await fetch("/users/isLoggedIn")
  let loggedIn = await response.json();
  return loggedIn;
}
