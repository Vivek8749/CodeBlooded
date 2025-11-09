/**
 * Route Configuration
 * Central place to manage all route paths in the application
 */

export const ROUTES = {
  // Public Routes
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",

  // Protected Routes
  DASHBOARD: "/dashboard",
  USER_DASHBOARD: (userId: string) => `/user/${userId}/dashboard`,

  // Food Routes
  FOOD_SEARCH: "/food-search",
  FOOD_DETAIL: "/food-detail",
  FOOD_DETAIL_ID: (foodId: string) => `/food-detail/${foodId}`,

  // Ride Routes
  RIDE_SEARCH: "/ride-search",
  RIDE_DETAIL: "/ride-detail",
  RIDE_DETAIL_ID: (rideId: string) => `/ride-detail/${rideId}`,
} as const;

/**
 * Route Metadata
 * Useful for breadcrumbs, page titles, etc.
 */
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: "Riden'Byte - Get Started",
    description: "Food and Ride Sharing Platform",
    isPublic: true,
  },
  [ROUTES.LOGIN]: {
    title: "Login - Riden'Byte",
    description: "Sign in to your account",
    isPublic: true,
  },
  [ROUTES.SIGNUP]: {
    title: "Sign Up - Riden'Byte",
    description: "Create a new account",
    isPublic: true,
  },
  [ROUTES.DASHBOARD]: {
    title: "Dashboard - Riden'Byte",
    description: "Your personal dashboard",
    isPublic: false,
  },
  [ROUTES.FOOD_SEARCH]: {
    title: "Food Search - Riden'Byte",
    description: "Search for food orders",
    isPublic: false,
  },
  [ROUTES.FOOD_DETAIL]: {
    title: "Food Details - Riden'Byte",
    description: "View food order details",
    isPublic: false,
  },
  [ROUTES.RIDE_SEARCH]: {
    title: "Ride Search - Riden'Byte",
    description: "Search for available rides",
    isPublic: false,
  },
  [ROUTES.RIDE_DETAIL]: {
    title: "Ride Details - Riden'Byte",
    description: "View ride details",
    isPublic: false,
  },
} as const;

/**
 * Helper function to check if a route requires authentication
 */
export function isProtectedRoute(path: string): boolean {
  const publicPaths: string[] = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP];
  return !publicPaths.includes(path);
}

/**
 * Helper function to get route metadata
 */
export function getRouteMetadata(path: string) {
  return (
    ROUTE_METADATA[path as keyof typeof ROUTE_METADATA] || {
      title: "Riden'Byte",
      description: "Food and Ride Sharing Platform",
      isPublic: false,
    }
  );
}
