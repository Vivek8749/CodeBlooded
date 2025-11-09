import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { FoodSearch } from "./components/FoodSearch";
import { RideSearch } from "./components/RideSearch";
import { FoodDetail } from "./components/FoodDetail";
import { RideDetail } from "./components/RideDetail";

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="size-full">
      <Routes>
        <Route
          path="/"
          element={
            <GetStarted
              onNavigateToLogin={() => navigate("/login")}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onNavigateBack={() => navigate("/")}
              onNavigateToDashboard={() => navigate("/dashboard")}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup onNavigateBack={() => navigate("/")} isDark={isDark} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateToFood={() => navigate("/food-search")}
              onNavigateToRide={() => navigate("/ride-search")}
            />
          }
        />
        <Route
          path="/food-search"
          element={
            <FoodSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/dashboard")}
              onNavigateToDetail={() => navigate("/food-detail")}
            />
          }
        />
        <Route
          path="/ride-search"
          element={
            <RideSearch
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/dashboard")}
              onNavigateToDetail={() => navigate("/ride-detail")}
            />
          }
        />
        <Route
          path="/food-detail"
          element={
            <FoodDetail
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/food-search")}
            />
          }
        />
        <Route
          path="/ride-detail"
          element={
            <RideDetail
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavigateBack={() => navigate("/ride-search")}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
