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
      client_id: config.clientId,
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

  // Handle the redirect back from Auth0 after login
  if (window.location.search.includes("code=")) {
    try {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/"); // Clear the query parameters
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err.message);
    }
  }

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // User is authenticated, stay on dashboard if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("dashboardBtn").style.display = "block";
    } else {
      // Redirect to the dashboard if logged in
      window.location.href = '/dashboard.html';
    }
  } else {
    // User is not authenticated, stay on login page
    if (!window.location.pathname.includes('dashboard.html')) {
      document.getElementById("loginBtn").style.display = "block";
      document.getElementById("dashboardBtn").style.display = "none";
    }
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
      returnTo: window.location.origin, // Logout and return to the home page
    });
  } else {
    console.error("Auth0 client is not initialized.");
  }
};
