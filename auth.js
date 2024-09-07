let auth0 = null;

const configureClient = async () => {
  try {
    const response = await fetch("/auth_config.json");

    if (!response.ok) {
      throw new Error(`Could not fetch auth_config.json: ${response.statusText}`);
    }

    const config = await response.json();

    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.client_id,
      cacheLocation: 'localstorage',  // Important for persisting login state
      useRefreshTokens: true, // To maintain session across browser refreshes
      redirect_uri: window.location.origin + "/dashboard.html"
    });
  } catch (err) {
    console.error("Error configuring Auth0 client:", err.message);
  }
};

const checkAuthentication = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  
  if (isAuthenticated) {
    // User is authenticated, so no need to stay on login page
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("dashboardBtn").style.display = "block";
  } else {
    // User is not authenticated, redirect to login page
    window.location.href = 'login.html';
  }
};

window.onload = async () => {
  await configureClient();

  if (!auth0) {
    console.error("Auth0 client is not initialized.");
    return;
  }

  // Check if returning from Auth0
  if (window.location.search.includes("code=") && auth0) {
    try {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/dashboard.html");
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err.message);
    }
  }

  await checkAuthentication();
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
      returnTo: window.location.origin + '/login.html',  // Redirect to login after logout
    });
  } else {
    console.error("Auth0 client is not initialized.");
  }
};
