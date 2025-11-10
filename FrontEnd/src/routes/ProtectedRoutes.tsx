import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Dashboard } from "../components/Dashboard";
import { FoodSearch } from "../components/FoodSearch";
import { RideSearch } from "../components/RideSearch";
import { FoodDetail } from "../components/FoodDetail";
import { RideDetail } from "../components/RideDetail";
import { CreateRide } from "../components/CreateRide";
import { CreateFoodOrder } from "../components/CreateFoodOrder";

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
              onNavigateToFood={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/food/search`);
              }}
              onNavigateToRide={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/rides/search`);
              }}
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

      {/* Ride Routes - Nested under /user/:id/rides/ */}
      {/* Search/Browse Rides */}
      <Route
        path="/user/:id/rides/search"
        element={
          <ProtectedRoute>
            <RideSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/dashboard`);
              }}
              onNavigateToDetail={(rideId?: string) => {
                const userId = window.location.pathname.split("/")[2];
                if (rideId) {
                  navigate(`/user/${userId}/rides/${rideId}`);
                }
              }}
              onNavigateToCreateRide={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/rides/create`);
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* View Specific Ride Details */}
      <Route
        path="/user/:id/rides/:rideId"
        element={
          <ProtectedRoute>
            <RideDetail
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/rides/search`);
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* Create New Ride */}
      <Route
        path="/user/:id/rides/create"
        element={
          <ProtectedRoute>
            <CreateRide
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/rides/search`);
              }}
              onNavigateToDashboard={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/dashboard`);
              }}
              onNavigateToRideSearch={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/rides/search`);
              }}
              onNavigateToFoodSearch={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/food/search`);
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* Food Routes - Nested under /user/:id/food/ */}
      <Route
        path="/user/:id/food/search"
        element={
          <ProtectedRoute>
            <FoodSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/dashboard`);
              }}
              onNavigateToDetail={(foodOrderId?: string) => {
                const userId = window.location.pathname.split("/")[2];
                if (foodOrderId) {
                  navigate(`/user/${userId}/food/${foodOrderId}`);
                }
              }}
              onNavigateToCreateFood={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/food/create`);
              }}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/:id/food/:foodOrderId"
        element={
          <ProtectedRoute>
            <FoodDetail
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/food/search`);
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* Create New Food Order */}
      <Route
        path="/user/:id/food/create"
        element={
          <ProtectedRoute>
            <CreateFoodOrder
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/food/search`);
              }}
              onNavigateToDashboard={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/dashboard`);
              }}
              onNavigateToRideSearch={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/rides/search`);
              }}
              onNavigateToFoodSearch={() => {
                const userId = window.location.pathname.split("/")[2];
                navigate(`/user/${userId}/food/search`);
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* Legacy Routes - for backward compatibility */}
      <Route
        path="/food-search"
        element={
          <ProtectedRoute>
            <FoodSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/dashboard")}
              onNavigateToDetail={() => navigate("/food-detail")}
              onNavigateToCreateFood={() => navigate("/create-food")}
            />
          </ProtectedRoute>
        }
      />

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

      {/* Create New Food Order - Legacy Route */}
      <Route
        path="/create-food"
        element={
          <ProtectedRoute>
            <CreateFoodOrder
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/food-search")}
              onNavigateToDashboard={() => navigate("/dashboard")}
              onNavigateToRideSearch={() => navigate("/ride-search")}
              onNavigateToFoodSearch={() => navigate("/food-search")}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ride-search"
        element={
          <ProtectedRoute>
            <RideSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/dashboard")}
              onNavigateToDetail={() => navigate("/ride-detail")}
              onNavigateToCreateRide={() => navigate("/create-ride")}
            />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/create-ride"
        element={
          <ProtectedRoute>
            <CreateRide
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/ride-search")}
              onNavigateToDashboard={() => navigate("/dashboard")}
              onNavigateToRideSearch={() => navigate("/ride-search")}
              onNavigateToFoodSearch={() => navigate("/food-search")}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
