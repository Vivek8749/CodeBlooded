import { useNavigate } from "react-router-dom";
import {
  handleLogin,
  handleSignUp,
  handleLogout,
  fetchCurrentUser,
} from "../api/userApi";

export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    onGetStarted: () => navigate("/login"),

    onLogin: async (email: string, password: string) => {
      try {
        console.log("🔐 Attempting login with:", email);
        const userdata = await handleLogin(email, password);
        console.log("✅ Login successful, user data:", userdata);
        const id = userdata.user._id;
        const targetPath = `/user/${id}/dashboard`;
        console.log("🚀 Navigating to:", targetPath);
        navigate(targetPath, {
          state: { user: userdata.user },
        });
        return userdata;
      } catch (error) {
        console.error("❌ Login failed:", error);
        throw error;
      }
    },

    onSignUp: async (username: string, email: string, password: string) => {
      try {
        const userdata = await handleSignUp(username, email, password);
        const id = userdata.user._id;
        navigate(`/user/${id}/dashboard`, {
          state: { user: userdata.user },
        });
        return userdata;
      } catch (error) {
        console.error("Signup failed:", error);
        throw error;
      }
    },

    onSwitchToSignUp: () => navigate("/signup"),
    onSwitchToLogin: () => navigate("/login"),

    onLogout: async () => {
      try {
        await handleLogout();
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/login");
      }
    },

    onUserLogin: async () => {
      try {
        const currentUser = await fetchCurrentUser();
        return currentUser.user;
      } catch (error) {
        console.error("Fetch user failed:", error);
        throw error;
      }
    },
  };
}
