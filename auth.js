let auth0 = null;

const configureClient = async () => {
  const response = await fetch("/auth_config.json");
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: pharmai.us.auth0.com,
    client_id: tQtgm50zwKorzoDwVbqOzXq50V5DBMfx,
    redirect_uri: "https://pharmai3.vercel.app/dashboard.html",
  });
};

window.onload = async () => {
  await configureClient();

  // If returning from Auth0, handle the redirection.
  if (window.location.search.includes("code=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("dashboardBtn").style.display = "block";
  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("dashboardBtn").style.display = "none";
  }
};

const login = async () => {
  await auth0.loginWithRedirect();
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin,
  });
};
