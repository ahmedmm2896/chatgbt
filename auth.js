let auth0 = null;

const configureClient = async () => {
  try {
    const response = await fetch("/auth_config.json");

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Could not fetch auth_config.json: ${response.statusText}`);
    }

    const config = await response.json();

    auth0 = await createAuth0Client({
      domain: config.domain, // Use the domain from the config file
      client_id: config.client_id, // Use the client ID from the config file
      redirect_uri: window.location.origin + "/dashboard.html",  // Ensure this matches your Auth0 settings
    });

    console.log("Auth0 client initialized:", auth0);
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

  // Check if returning from Auth0 authentication
  if (window.location.search.includes("code=")) {
    try {
      console.log("Handling Auth0 redirect...");
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/dashboard.html"); // Ensure proper redirection
    } catch (err) {
      console.error("Error handling Auth0 redirect:", err.message);
    }
  }

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // User is authenticated, show dashboard button
    console.log("User is authenticated");
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("dashboardBtn").style.display = "block";
  } else {
    // User is not authenticated, show login button
    console.log("User is not authenticated");
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("dashboardBtn").style.display = "none";
  }
};

const login = async () => {
  if (auth0) {
    try {
      console.log("Redirecting to Auth0 login...");
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
      returnTo: window.location.origin, // Change this to the appropriate return URL after logout
    });
  } else {
    console.error("Auth0 client is not initialized.");
  }
};
