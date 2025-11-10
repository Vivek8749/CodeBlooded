import { useState, useEffect } from "react";
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { FoodSearch } from "./components/FoodSearch";
import { RideSearch } from "./components/RideSearch";
import { FoodDetail } from "./components/FoodDetail";
import { RideDetail } from "./components/RideDetail";
import { CreateRide } from "./components/CreateRide";
import { CreateFoodOrder } from "./components/CreateFoodOrder";

type Page = "get-started" | "login" | "dashboard" | "food-search" | "ride-search" | "food-detail" | "ride-detail" | "create-ride" | "create-food";

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

  const navigateToFoodDetail = () => {
    setCurrentPage("food-detail");
  };

  const navigateToRideDetail = () => {
    setCurrentPage("ride-detail");
  };

  const navigateToCreateRide = () => {
    setCurrentPage("create-ride");
  };

  const navigateToCreateFood = () => {
    setCurrentPage("create-food");
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
          onNavigateToDetail={navigateToFoodDetail}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToRideSearch={navigateToRideSearch}
          onNavigateToCreateFood={navigateToCreateFood}
        />
      )}
      {currentPage === "ride-search" && (
        <RideSearch 
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToDashboard}
          onNavigateToDetail={navigateToRideDetail}
          onNavigateToCreateRide={navigateToCreateRide}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToFoodSearch={navigateToFoodSearch}
        />
      )}
      {currentPage === "food-detail" && (
        <FoodDetail 
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToFoodSearch}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToRideSearch={navigateToRideSearch}
          onNavigateToFoodSearch={navigateToFoodSearch}
        />
      )}
      {currentPage === "ride-detail" && (
        <RideDetail 
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToRideSearch}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToRideSearch={navigateToRideSearch}
          onNavigateToFoodSearch={navigateToFoodSearch}
        />
      )}
      {currentPage === "create-ride" && (
        <CreateRide 
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToRideSearch}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToRideSearch={navigateToRideSearch}
          onNavigateToFoodSearch={navigateToFoodSearch}
        />
      )}
      {currentPage === "create-food" && (
        <CreateFoodOrder 
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigateBack={navigateToFoodSearch}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToRideSearch={navigateToRideSearch}
          onNavigateToFoodSearch={navigateToFoodSearch}
        />
      )}
    </div>
  );
}
