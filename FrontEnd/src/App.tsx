import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GetStarted } from "./components/GetStarted";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Header } from "./components/ui/header";

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