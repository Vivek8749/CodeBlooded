import api from "./api";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  studentId?: string;
  profilePicture?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authService = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    studentId?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post("/users/signup", data);
    return response.data.data;
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post("/users/login", data);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/users/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/users/me");
    return response.data.data.user;
  },

  refreshToken: async (
    refreshToken: string
  ): Promise<{ token: string; refreshToken: string }> => {
    const response = await api.post("/users/refresh", { refreshToken });
    return response.data.data;
  },
};
