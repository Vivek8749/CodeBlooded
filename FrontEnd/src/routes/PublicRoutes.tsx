import { Routes, Route, useNavigate } from "react-router-dom";
import { GetStarted } from "../components/GetStarted";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

interface PublicRoutesProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function PublicRoutes({ isDark, toggleTheme }: PublicRoutesProps) {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Hero/Landing Page */}
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

      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Login
            onNavigateBack={() => navigate("/")}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        }
      />

      {/* Signup Page */}
      <Route
        path="/signup"
        element={
          <Signup
            onNavigateBack={() => navigate("/")}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        }
      />
    </Routes>
  );
}
