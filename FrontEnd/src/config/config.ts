/**
 * Application Configuration
 *
 * Centralized configuration for the frontend application.
 * Uses Vite environment variables.
 */

export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  },
  app: {
    name: "Riden'Byte",
    version: "1.0.0",
  },
} as const;

export default config;
