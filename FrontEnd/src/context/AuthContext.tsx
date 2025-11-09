import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../utils/authService";
import type { User } from "../utils/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    studentId?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const {
      user: loggedInUser,
      token,
      refreshToken,
    } = await authService.login({
      email,
      password,
    });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(loggedInUser);
  };

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    studentId?: string;
  }) => {
    const {
      user: newUser,
      token,
      refreshToken,
    } = await authService.signup(data);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
