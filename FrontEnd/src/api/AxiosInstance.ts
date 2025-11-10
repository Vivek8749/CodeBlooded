import axios from "axios";
import { config } from "../config/config";

const BASE_URL = config.api.baseURL;

// 👉 Public instance — used for signup, login, etc.
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable cookies for authentication
});

// 👉 Private instance — automatically attaches token & handles expiry
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable cookies for authentication
});

// Interceptor for adding token
privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔑 [Frontend Request] Preparing request to:", config.url);
  console.log(
    "🔑 [Frontend Request] Token from localStorage:",
    token ? "EXISTS (" + token.substring(0, 20) + "...)" : "MISSING"
  );
  console.log("🔑 [Frontend Request] WithCredentials:", config.withCredentials);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ [Frontend Request] Authorization header set");
  } else {
    console.warn("⚠️ [Frontend Request] No token found in localStorage!");
  }

  return config;
});

// Interceptor for handling token expiration or unauthorized access
privateAxios.interceptors.response.use(
  (response) => {
    console.log(
      "✅ [Frontend Response] Success:",
      response.config.url,
      "- Status:",
      response.status
    );
    return response;
  },
  (error) => {
    console.error("❌ [Frontend Response] Error:", error.config?.url);
    console.error("❌ [Frontend Response] Status:", error.response?.status);
    console.error(
      "❌ [Frontend Response] Message:",
      error.response?.data?.message
    );

    if (error.response && error.response.status === 401) {
      console.error(
        "🚨 [Frontend Response] 401 Unauthorized - Clearing tokens and redirecting"
      );
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default privateAxios;
