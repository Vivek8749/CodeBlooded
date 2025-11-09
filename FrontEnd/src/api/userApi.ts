import { removeToken, setToken } from "../utils/auth";
import { publicAxios, privateAxios } from "./AxiosInstance";

// Define response types for better type safety
interface AuthResponse {
  token?: string;
  accessToken?: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    studentId?: string;
    profilePicture?: string;
    isVerified: boolean;
  };
  refreshToken?: string;
  message?: string;
}

interface UserResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    profilePic?: string;
    status?: string;
    rooms?: any[];
  };
}

interface SearchUsersResponse {
  users: {
    _id: string;
    username: string;
    email: string;
    profilePic?: string;
    status?: string;
  }[];
  count: number;
}

const handleLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await publicAxios.post<{ data: AuthResponse }>(
      "/api/v1/users/login",
      {
        email,
        password,
      }
    );

    const data = response.data.data;

    if (data.token) {
      setToken("token", data.token);
      if (data.refreshToken) {
        setToken("refreshToken", data.refreshToken);
      }
    }
    setToken("userData", JSON.stringify(data.user));
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};

const handleSignUp = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await publicAxios.post<{ data: AuthResponse }>(
      "/api/v1/users/signup",
      {
        name,
        email,
        password,
      }
    );

    const data = response.data.data;

    if (data.token) {
      setToken("token", data.token);
      if (data.refreshToken) {
        setToken("refreshToken", data.refreshToken);
      }
    }
    setToken("userData", JSON.stringify(data.user));
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Sign up failed";
    throw new Error(errorMessage);
  }
};

const handleLogout = async (): Promise<void> => {
  try {
    await privateAxios.post("/api/v1/users/logout");
    removeToken("token");
  } catch (error: any) {
    removeToken("token");
    const errorMessage = error.response?.data?.message || "Logout failed";
    throw new Error(errorMessage);
  }
};

const fetchCurrentUser = async (): Promise<UserResponse> => {
  try {
    const response = await privateAxios.get<{ data: UserResponse }>(
      "/api/v1/users/me"
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Fetch user failed";
    throw new Error(errorMessage);
  }
};

/**
 * Get current user profile
 */
const fetchCurrentUserProfile = async () => {
  try {
    const response = await privateAxios.get("/api/v1/users/me");
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch user profile";
    throw new Error(errorMessage);
  }
};

const searchUsers = async (query: string): Promise<SearchUsersResponse> => {
  try {
    const response = await privateAxios.get<{ data: SearchUsersResponse }>(
      "/api/v1/users/search",
      {
        params: { query },
      }
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to search users";
    throw new Error(errorMessage);
  }
};

export {
  handleLogin,
  handleSignUp,
  handleLogout,
  fetchCurrentUser,
  fetchCurrentUserProfile,
  searchUsers,
};
