import { useState, useEffect } from "react";
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";

type Page = "get-started" | "login";

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
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
