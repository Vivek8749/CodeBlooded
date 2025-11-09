import { PublicRoutes } from "./PublicRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

interface AppRoutesProps {
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Main Routes Component
 * Combines public and protected routes
 */
export function AppRoutes({ isDark, toggleTheme }: AppRoutesProps) {
  return (
    <>
      {/* Public Routes */}
      <PublicRoutes isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Protected Routes */}
      <ProtectedRoutes isDark={isDark} toggleTheme={toggleTheme} />
    </>
  );
}

// Re-export route configuration for convenience
export {
  ROUTES,
  ROUTE_METADATA,
  isProtectedRoute,
  getRouteMetadata,
} from "./RouteConfig";
