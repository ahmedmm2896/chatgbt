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

  // Handle redirection back from Auth0 after login
  if (window.location.search.includes("code=") && auth0) {
    try {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/dashboard.html"); // Ensure correct state
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err.message);
    }
  }

  // Check if the user is authenticated
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

// Check for authentication status in the dashboard
const checkAuthStatus = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  if (!isAuthenticated) {
    window.location.href = "/login.html";  // Redirect to login if not authenticated
  }
};
