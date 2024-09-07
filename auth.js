let auth0 = null;  // Auth0 client object

const configureClient = async () => {
  try {
    // Fetch configuration for Auth0
    const response = await fetch("/auth_config.json");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch auth_config.json: ${response.statusText}`);
    }

    const config = await response.json();

    // Initialize the Auth0 client
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId,
      redirect_uri: window.location.origin + "/dashboard.html", // Update this to match your actual URL
    });

  } catch (err) {
    console.error("Error configuring Auth0 client:", err);
  }
};

window.onload = async () => {
  await configureClient();

  if (!auth0) {
    console.error("Auth0 client is not initialized.");
    return;
  }

  // If returning from Auth0 after a redirect
  if (window.location.search.includes("code=")) {
    try {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/dashboard.html");
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err);
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

// Trigger login
const login = async () => {
  if (auth0) {
    try {
      await auth0.loginWithRedirect();
    } catch (err) {
      console.error("Login failed:", err);
    }
  } else {
    console.error("Auth0 client is not initialized.");
  }
};

// Trigger logout
const logout = () => {
  if (auth0) {
    auth0.logout({
      returnTo: window.location.origin,  // Update this if you want a different logout URL
    });
  } else {
    console.error("Auth0 client is not initialized.");
  }
};
