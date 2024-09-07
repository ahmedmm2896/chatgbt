let auth0 = null;

const configureClient = async () => {
  try {
    const response = await fetch("/auth_config.json");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch auth_config.json: ${response.statusText}`);
    }

    const config = await response.json();

    // Initialize Auth0 client
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId,
      redirect_uri: window.location.origin + "/dashboard.html", // Update to match your redirect path
    });
    
  } catch (err) {
    console.error("Error configuring Auth0 client:", err.message);
  }
};

// Handle page load and authentication
window.onload = async () => {
  await configureClient();

  if (!auth0) {
    console.error("Auth0 client is not initialized.");
    return;
  }

  // Handle redirect callback after Auth0 login
  if (window.location.search.includes("code=")) {
    try {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/dashboard.html"); // Ensure this redirects to the dashboard
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err.message);
    }
  }

  // Check if the user is authenticated
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("dashboardBtn").style.display = "block";
    window.location.href = "/dashboard.html"; // Ensure redirection to dashboard
  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("dashboardBtn").style.display = "none";
  }
};

// Trigger login
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

// Trigger logout
const logout = () => {
  if (auth0) {
    auth0.logout({
      returnTo: window.location.origin,
    });
  } else {
    console.error("Auth0 client is not initialized.");
  }
};
