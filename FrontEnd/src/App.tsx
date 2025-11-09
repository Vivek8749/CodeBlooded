import { useState, useEffect } from "react";
<<<<<<< HEAD
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";

type Page = "get-started" | "login";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("get-started");
  const [isDark, setIsDark] = useState(true);
=======
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Header } from "./components/ui/header";

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
>>>>>>> 0962a4c (sign in and sin up page done)

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

<<<<<<< HEAD
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
=======
  return (
    <div className="size-full">
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme}
        onHomeClick={() => navigate("/")}
        onSignInClick={() => navigate("/login")} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <GetStarted 
              onNavigateToLogin={() => navigate("/login")} 
              isDark={isDark}
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            <Login 
              onNavigateBack={() => navigate("/")} 
              onNavigateToSignup={() => navigate("/signup")}
              isDark={isDark}
            />
          } 
        />
        <Route 
          path="/signup" 
          element={
            <Signup
              onNavigateBack={() => navigate("/")}
              isDark={isDark}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
>>>>>>> 0962a4c (sign in and sin up page done)
