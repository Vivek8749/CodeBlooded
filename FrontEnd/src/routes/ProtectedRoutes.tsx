import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Dashboard } from "../components/Dashboard";
import { FoodSearch } from "../components/FoodSearch";
import { RideSearch } from "../components/RideSearch";
import { FoodDetail } from "../components/FoodDetail";
import { RideDetail } from "../components/RideDetail";

interface ProtectedRoutesProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function ProtectedRoutes({ isDark, toggleTheme }: ProtectedRoutesProps) {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Main Dashboard - /user/:id/dashboard */}
      <Route
        path="/user/:id/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateToFood={() => navigate("/food-search")}
              onNavigateToRide={() => navigate("/ride-search")}
            />
          </ProtectedRoute>
        }
      />

      {/* Legacy Dashboard Route - for backward compatibility */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateToFood={() => navigate("/food-search")}
              onNavigateToRide={() => navigate("/ride-search")}
            />
          </ProtectedRoute>
        }
      />

      {/* Food Search Page */}
      <Route
        path="/food-search"
        element={
          <ProtectedRoute>
            <FoodSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/dashboard")}
              onNavigateToDetail={() => navigate("/food-detail")}
            />
          </ProtectedRoute>
        }
      />

      {/* Ride Search Page */}
      <Route
        path="/ride-search"
        element={
          <ProtectedRoute>
            <RideSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/dashboard")}
              onNavigateToDetail={() => navigate("/ride-detail")}
            />
          </ProtectedRoute>
        }
      />

      {/* Food Detail Page */}
      <Route
        path="/food-detail"
        element={
          <ProtectedRoute>
            <FoodDetail
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/food-search")}
            />
          </ProtectedRoute>
        }
      />

      {/* Ride Detail Page */}
      <Route
        path="/ride-detail"
        element={
          <ProtectedRoute>
            <RideDetail
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/ride-search")}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
