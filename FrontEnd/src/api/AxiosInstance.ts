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
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor for handling token expiration or unauthorized access
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default privateAxios;
