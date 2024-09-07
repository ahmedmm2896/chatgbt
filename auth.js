let auth0 = null;

const configureClient = async () => {
  try {
    const response = await fetch("/auth_config.json");

    if (!response.ok) {
      throw new Error(`Could not fetch auth_config.json: ${response.statusText}`);
    }

    const config = await response.json();

    auth0 = await createAuth0Client({
      domain: "pharmai.us.auth0.com",
      client_id: "tQtgm50zwKorzoDwVbqOzXq50V5DBMfx",
      redirect_uri: window.location.origin + "/dashboard.html",
    });

  } catch (err) {
    console.error("Error configuring Auth0 client:", err.message);
  }
};

window.onload = async () => {
  await configureClient();

  if (!auth0) {
    console.error("Auth0 client is not initialized.");
    return;
  }

  // If returning from Auth0, handle the redirection.
  if (window.location.search.includes("code=")) {
    try {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err.message);
    }
  }

  // Check if the user is authenticated
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // The user is authenticated, redirect them to the dashboard
    window.location.href = '/dashboard.html';
  } else {
    // The user is not authenticated, show the login button
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("dashboardBtn").style.display = "none";
  }
};

const login = async () => {
  if (auth0) {
    try {
      await auth0.loginWithRedirect();
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  } else {
    console.error("Auth0 client is not initialized.");
  }
};

const logout = () => {
  if (auth0) {
    auth0.logout({
      returnTo: window.location.origin,
    });
  } else {
    console.error("Auth0 client is not initialized.");
  }
};
