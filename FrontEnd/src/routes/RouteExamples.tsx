/**
 * Route Usage Examples
 * This file demonstrates how to use the route system in the application
 */

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { useAppNavigation } from "../utils/navigation";

// ============================================
// Example 1: Basic Navigation with Constants
// ============================================

function ExampleBasicNavigation() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const goToSignup = () => {
    navigate(ROUTES.SIGNUP);
  };

  const goToHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div>
      <button onClick={goToLogin}>Go to Login</button>
      <button onClick={goToSignup}>Go to Signup</button>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}

// ============================================
// Example 2: Dynamic Routes with Parameters
// ============================================

function ExampleDynamicRoutes() {
  const navigate = useNavigate();
  const userId = "12345";
  const rideId = "ride-abc";
  const foodId = "food-xyz";

  const goToUserDashboard = () => {
    // Using the route helper function
    navigate(ROUTES.USER_DASHBOARD(userId));
    // This navigates to: /user/12345/dashboard
  };

  const goToRideDetail = () => {
    navigate(ROUTES.RIDE_DETAIL_ID(rideId));
    // This navigates to: /ride-detail/ride-abc
  };

  const goToFoodDetail = () => {
    navigate(ROUTES.FOOD_DETAIL_ID(foodId));
    // This navigates to: /food-detail/food-xyz
  };

  return (
    <div>
      <button onClick={goToUserDashboard}>Go to My Dashboard</button>
      <button onClick={goToRideDetail}>View Ride</button>
      <button onClick={goToFoodDetail}>View Food</button>
    </div>
  );
}

// ============================================
// Example 3: Using Navigation Utilities
// ============================================

function ExampleNavigationUtils() {
  const navigation = useAppNavigation();

  const handleLoginSuccess = (userId: string) => {
    // Handles login and navigates to user dashboard
    navigation.onLogin(userId);
  };

  const handleSignupSuccess = (userId: string) => {
    // Handles signup and navigates to user dashboard
    navigation.onSignUp(userId);
  };

  const handleLogout = () => {
    // Clears tokens and navigates to login
    navigation.onLogout();
  };

  return (
    <div>
      <button onClick={() => handleLoginSuccess("user123")}>
        Complete Login
      </button>
      <button onClick={() => handleSignupSuccess("user123")}>
        Complete Signup
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// ============================================
// Example 4: Programmatic Navigation
// ============================================

function ExampleProgrammaticNavigation() {
  const navigate = useNavigate();

  const searchRidesAndNavigate = async () => {
    // Do some async work (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate after completion
    navigate(ROUTES.RIDE_SEARCH);
  };

  const navigateWithState = () => {
    // Navigate with state (useful for passing data)
    navigate(ROUTES.RIDE_DETAIL, {
      state: { from: "search", filters: { origin: "Campus" } },
    });
  };

  const navigateWithReplace = () => {
    // Replace current entry in history stack
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div>
      <button onClick={searchRidesAndNavigate}>Search and Navigate</button>
      <button onClick={navigateWithState}>Navigate with State</button>
      <button onClick={navigateWithReplace}>Navigate with Replace</button>
    </div>
  );
}

// ============================================
// Example 5: Conditional Navigation
// ============================================

function ExampleConditionalNavigation() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleProtectedAction = () => {
    if (isAuthenticated) {
      // User is logged in, proceed to dashboard
      navigate(ROUTES.DASHBOARD);
    } else {
      // User not logged in, redirect to login
      navigate(ROUTES.LOGIN);
    }
  };

  const handleRoleBasedNavigation = (userRole: string) => {
    if (userRole === "admin") {
      navigate(ROUTES.DASHBOARD);
    } else if (userRole === "student") {
      navigate(ROUTES.RIDE_SEARCH);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div>
      <button onClick={handleProtectedAction}>Go to Protected Route</button>
      <button onClick={() => handleRoleBasedNavigation("student")}>
        Navigate Based on Role
      </button>
    </div>
  );
}

// ============================================
// Example 6: Navigation with Query Parameters
// ============================================

function ExampleQueryParameters() {
  const navigate = useNavigate();

  const searchWithFilters = () => {
    const params = new URLSearchParams({
      origin: "Campus",
      destination: "Mall",
      date: "2025-11-10",
      minSeats: "2",
    });

    navigate(`${ROUTES.RIDE_SEARCH}?${params.toString()}`);
    // Navigates to: /ride-search?origin=Campus&destination=Mall&date=2025-11-10&minSeats=2
  };

  const searchFoodByCategory = (category: string) => {
    navigate(`${ROUTES.FOOD_SEARCH}?category=${category}`);
  };

  return (
    <div>
      <button onClick={searchWithFilters}>Search Rides with Filters</button>
      <button onClick={() => searchFoodByCategory("pizza")}>
        Search Pizza
      </button>
    </div>
  );
}

// ============================================
// Example 7: Back Navigation
// ============================================

function ExampleBackNavigation() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back one page
  };

  const goForward = () => {
    navigate(1); // Go forward one page
  };

  const goBackMultiple = () => {
    navigate(-2); // Go back two pages
  };

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goForward}>Go Forward</button>
      <button onClick={goBackMultiple}>Go Back 2 Pages</button>
    </div>
  );
}

// ============================================
// Example 8: Checking Current Route
// ============================================

function ExampleRouteChecking() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const isOnLoginPage = currentPath === ROUTES.LOGIN;
  const isOnDashboard = currentPath === ROUTES.DASHBOARD;

  // Check if on a protected route
  const isProtectedPage = ![ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP].includes(
    currentPath
  );

  return (
    <div>
      <p>Current Path: {currentPath}</p>
      <p>On Login Page: {isOnLoginPage ? "Yes" : "No"}</p>
      <p>On Dashboard: {isOnDashboard ? "Yes" : "No"}</p>
      <p>Protected Page: {isProtectedPage ? "Yes" : "No"}</p>
    </div>
  );
}

// ============================================
// Example 9: Link Component Usage
// ============================================

import { Link } from "react-router-dom";

function ExampleLinkUsage() {
  const userId = "12345";

  return (
    <nav>
      {/* Basic link */}
      <Link to={ROUTES.HOME}>Home</Link>

      {/* Link with dynamic parameter */}
      <Link to={ROUTES.USER_DASHBOARD(userId)}>My Dashboard</Link>

      {/* Link with className */}
      <Link to={ROUTES.RIDE_SEARCH} className="nav-link">
        Find Rides
      </Link>

      {/* Link with state */}
      <Link to={ROUTES.FOOD_SEARCH} state={{ from: "home" }}>
        Order Food
      </Link>
    </nav>
  );
}

// ============================================
// Example 10: useLocation Hook
// ============================================

import { useLocation } from "react-router-dom";

function ExampleUseLocation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Access current pathname
  const currentPath = location.pathname;

  // Access state passed during navigation
  const stateData = location.state as { from?: string };

  // Access query parameters
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");

  const navigateBackToOrigin = () => {
    if (stateData?.from) {
      navigate(stateData.from);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div>
      <p>Current Path: {currentPath}</p>
      <p>Came From: {stateData?.from || "Unknown"}</p>
      <p>Origin Parameter: {origin || "Not set"}</p>
      <button onClick={navigateBackToOrigin}>Go Back to Origin</button>
    </div>
  );
}

export {
  ExampleBasicNavigation,
  ExampleDynamicRoutes,
  ExampleNavigationUtils,
  ExampleProgrammaticNavigation,
  ExampleConditionalNavigation,
  ExampleQueryParameters,
  ExampleBackNavigation,
  ExampleRouteChecking,
  ExampleLinkUsage,
  ExampleUseLocation,
};
