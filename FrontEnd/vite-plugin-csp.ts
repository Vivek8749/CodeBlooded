import type { Plugin } from "vite";

export function cspPlugin(): Plugin {
  return {
    name: "vite-plugin-csp",
    transformIndexHtml(html, { server }) {
      const isDev = server !== undefined;

      // Development CSP - more permissive for HMR and debugging
      const devCSP = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Vite HMR
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' http://localhost:8000 ws://localhost:5173", // Add WebSocket for HMR
        "media-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
      ].join("; ");

      // Production CSP - stricter, no eval
      const prodCSP = [
        "default-src 'self'",
        "script-src 'self'", // No unsafe-eval or unsafe-inline in production
        "style-src 'self' 'unsafe-inline'", // Keep unsafe-inline for CSS-in-JS if needed
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' https://codeblooded-9jnh.onrender.com", // Backend API domain
        "media-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
        "block-all-mixed-content",
      ].join("; ");

      const csp = isDev ? devCSP : prodCSP;

      return html.replace(
        "<head>",
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`
      );
    },
  };
}
