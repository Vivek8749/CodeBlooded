import { useState, useEffect } from "react";
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { FoodSearch } from "./components/FoodSearch";
import { RideSearch } from "./components/RideSearch";

type Page =
  | "get-started"
  | "login"
  | "dashboard"
  | "food-search"
  | "ride-search";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("get-started");
  const [isDark, setIsDark] = useState(true);

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

  const navigateToLogin = () => {
    setCurrentPage("login");
  };

  const navigateToGetStarted = () => {
    setCurrentPage("get-started");
  };

  const navigateToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const navigateToFoodSearch = () => {
    setCurrentPage("food-search");
  };

  const navigateToRideSearch = () => {
    setCurrentPage("ride-search");
  };

  return (
    <div className="size-full">
      {currentPage === "get-started" && (
        <GetStarted
          onNavigateToLogin={navigateToLogin}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      )}
      {currentPage === "login" && (
        <Login
          onNavigateBack={navigateToGetStarted}
          onNavigateToDashboard={navigateToDashboard}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      )}
      {currentPage === "dashboard" && (
        <Dashboard
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateToFood={navigateToFoodSearch}
          onNavigateToRide={navigateToRideSearch}
        />
      )}
      {currentPage === "food-search" && (
        <FoodSearch
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToDashboard}
        />
      )}
      {currentPage === "ride-search" && (
        <RideSearch
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToDashboard}
        />
      )}
    </div>
  );
}
