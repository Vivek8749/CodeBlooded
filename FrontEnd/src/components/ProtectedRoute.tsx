import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getToken("token");
  const location = useLocation();

  useEffect(() => {
    console.log("🔒 ProtectedRoute check:");
    console.log("- Location:", location.pathname);
    console.log("- Has token:", !!token);
    console.log("- Will redirect:", !token);
  }, [location.pathname, token]);

  if (!token) {
    console.log("❌ No token found, redirecting to login");
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("✅ Token found, rendering protected content");
  return <>{children}</>;
}
