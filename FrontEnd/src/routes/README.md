# Frontend Routes Documentation

## Overview

This directory contains all route configurations for the Riden'Byte frontend application. Routes are organized into modular files for better maintainability and scalability.

## File Structure

```
routes/
├── index.tsx              # Main routes entry point
├── PublicRoutes.tsx       # Public/unauthenticated routes
├── ProtectedRoutes.tsx    # Protected/authenticated routes
├── RouteConfig.ts         # Route constants and configuration
└── README.md             # This file
```

## Route Files

### `index.tsx`

Main entry point that combines all route modules. Exports `AppRoutes` component used in `App.tsx`.

**Props:**

- `isDark: boolean` - Current theme state
- `toggleTheme: () => void` - Function to toggle theme

### `PublicRoutes.tsx`

Contains all public routes that don't require authentication:

- `/` - Hero/Landing page (GetStarted)
- `/login` - User login page
- `/signup` - User registration page

### `ProtectedRoutes.tsx`

Contains all protected routes that require authentication:

- `/user/:id/dashboard` - Main user dashboard (primary route)
- `/dashboard` - Legacy dashboard route (backward compatibility)
- `/food-search` - Search available food orders
- `/food-detail` - View food order details
- `/ride-search` - Search available rides
- `/ride-detail` - View ride details

All routes are wrapped with `<ProtectedRoute>` component that checks authentication.

### `RouteConfig.ts`

Centralized route configuration file containing:

#### Route Constants (`ROUTES`)

```typescript
ROUTES.HOME; // "/"
ROUTES.LOGIN; // "/login"
ROUTES.SIGNUP; // "/signup"
ROUTES.DASHBOARD; // "/dashboard"
ROUTES.USER_DASHBOARD(id); // "/user/{id}/dashboard"
ROUTES.FOOD_SEARCH; // "/food-search"
ROUTES.FOOD_DETAIL; // "/food-detail"
ROUTES.FOOD_DETAIL_ID(id); // "/food-detail/{id}"
ROUTES.RIDE_SEARCH; // "/ride-search"
ROUTES.RIDE_DETAIL; // "/ride-detail"
ROUTES.RIDE_DETAIL_ID(id); // "/ride-detail/{id}"
```

#### Route Metadata (`ROUTE_METADATA`)

Contains page titles, descriptions, and public/protected flags for each route.

#### Helper Functions

- `isProtectedRoute(path)` - Check if a route requires authentication
- `getRouteMetadata(path)` - Get metadata for a route

## Usage

### In Components

Use route constants instead of hardcoded strings:

```typescript
import { ROUTES } from "../routes/RouteConfig";
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  // ✅ Good - Using constants
  navigate(ROUTES.DASHBOARD);
  navigate(ROUTES.USER_DASHBOARD(userId));

  // ❌ Bad - Hardcoded strings
  navigate("/dashboard");
  navigate(`/user/${userId}/dashboard`);
}
```

### Adding New Routes

#### 1. Add Route Constant

```typescript
// RouteConfig.ts
export const ROUTES = {
  // ... existing routes
  NEW_PAGE: "/new-page",
  NEW_PAGE_ID: (id: string) => `/new-page/${id}`,
} as const;
```

#### 2. Add Route Metadata

```typescript
// RouteConfig.ts
export const ROUTE_METADATA = {
  // ... existing metadata
  [ROUTES.NEW_PAGE]: {
    title: "New Page - Riden'Byte",
    description: "Description of new page",
    isPublic: false, // true if public, false if protected
  },
} as const;
```

#### 3. Add Route Definition

For **public routes**, add to `PublicRoutes.tsx`:

```typescript
<Route
  path="/new-page"
  element={<NewPageComponent isDark={isDark} toggleTheme={toggleTheme} />}
/>
```

For **protected routes**, add to `ProtectedRoutes.tsx`:

```typescript
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPageComponent isDark={isDark} toggleTheme={toggleTheme} />
    </ProtectedRoute>
  }
/>
```

## Route Protection

All protected routes are wrapped with the `<ProtectedRoute>` component which:

1. Checks for authentication token in localStorage
2. Redirects to `/login` if not authenticated
3. Preserves the intended destination for post-login redirect

## Navigation Functions

Use the navigation utilities from `utils/navigation.ts` for common navigation patterns:

```typescript
import { useAppNavigation } from "../utils/navigation";

function MyComponent() {
  const navigation = useAppNavigation();

  // Login navigation (redirects to user dashboard after login)
  navigation.onLogin(userId);

  // Signup navigation (redirects to user dashboard after signup)
  navigation.onSignUp(userId);

  // Logout navigation (clears tokens and redirects to login)
  navigation.onLogout();
}
```

## Best Practices

1. **Always use route constants** from `RouteConfig.ts` instead of hardcoded strings
2. **Keep routes organized** - Public in `PublicRoutes.tsx`, Protected in `ProtectedRoutes.tsx`
3. **Add metadata** for all new routes in `ROUTE_METADATA`
4. **Use dynamic route helpers** for parameterized routes (e.g., `ROUTES.USER_DASHBOARD(id)`)
5. **Document new routes** - Update this README when adding new route patterns
6. **Test authentication flow** - Ensure protected routes redirect properly when not authenticated

## Testing Routes

### Public Routes

```bash
# Open browser and navigate to:
http://localhost:5173/
http://localhost:5173/login
http://localhost:5173/signup
```

### Protected Routes (requires authentication)

```bash
# Login first, then navigate to:
http://localhost:5173/dashboard
http://localhost:5173/user/[userId]/dashboard
http://localhost:5173/food-search
http://localhost:5173/ride-search
```

### Test Authentication Guard

1. Clear localStorage tokens
2. Try accessing protected route directly
3. Should redirect to `/login`
4. After login, should redirect back to intended route

## Future Improvements

- [ ] Add route lazy loading for code splitting
- [ ] Implement breadcrumb navigation
- [ ] Add route transition animations
- [ ] Create route guards for role-based access
- [ ] Add 404 Not Found page
- [ ] Implement route-based page title updates
- [ ] Add route loading states/skeleton screens
- [ ] Create route history/back button management

---

**Last Updated:** November 10, 2025
