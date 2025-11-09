# Route Quick Reference

## 📁 Files Overview

| File                  | Purpose            | Key Exports                             |
| --------------------- | ------------------ | --------------------------------------- |
| `index.tsx`           | Main entry point   | `AppRoutes`, `ROUTES`, `ROUTE_METADATA` |
| `PublicRoutes.tsx`    | Public routes      | `PublicRoutes` component                |
| `ProtectedRoutes.tsx` | Protected routes   | `ProtectedRoutes` component             |
| `RouteConfig.ts`      | Constants & config | `ROUTES`, `ROUTE_METADATA`, helpers     |
| `README.md`           | Documentation      | -                                       |
| `RouteExamples.tsx`   | Code examples      | Multiple example components             |
| `ARCHITECTURE.md`     | Visual diagrams    | -                                       |
| `SETUP_SUMMARY.md`    | Setup checklist    | -                                       |

## 🛣️ All Routes

### Public Routes (No Auth)

```
/                  → GetStarted (Hero Page)
/login             → Login Page
/signup            → Signup Page
```

### Protected Routes (Auth Required)

```
/user/:id/dashboard → User Dashboard (Primary)
/dashboard          → Dashboard (Legacy)
/food-search        → Food Search
/food-detail        → Food Detail
/ride-search        → Ride Search
/ride-detail        → Ride Detail
```

## 🔑 Route Constants

```typescript
import { ROUTES } from "./routes";

// Static routes
ROUTES.HOME; // "/"
ROUTES.LOGIN; // "/login"
ROUTES.SIGNUP; // "/signup"
ROUTES.DASHBOARD; // "/dashboard"
ROUTES.FOOD_SEARCH; // "/food-search"
ROUTES.FOOD_DETAIL; // "/food-detail"
ROUTES.RIDE_SEARCH; // "/ride-search"
ROUTES.RIDE_DETAIL; // "/ride-detail"

// Dynamic routes (functions)
ROUTES.USER_DASHBOARD(userId); // "/user/{userId}/dashboard"
ROUTES.FOOD_DETAIL_ID(foodId); // "/food-detail/{foodId}"
ROUTES.RIDE_DETAIL_ID(rideId); // "/ride-detail/{rideId}"
```

## 💻 Common Code Snippets

### Navigate to a route

```typescript
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

const navigate = useNavigate();
navigate(ROUTES.LOGIN);
navigate(ROUTES.USER_DASHBOARD("user123"));
```

### Use navigation utilities

```typescript
import { useAppNavigation } from "../utils/navigation";

const navigation = useAppNavigation();
navigation.onLogin(userId); // Login → Dashboard
navigation.onSignUp(userId); // Signup → Dashboard
navigation.onLogout(); // Logout → Login
```

### Create a link

```typescript
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

<Link to={ROUTES.HOME}>Home</Link>
<Link to={ROUTES.USER_DASHBOARD(userId)}>Dashboard</Link>
```

### Check current route

```typescript
import { useLocation } from "react-router-dom";
import { ROUTES } from "../routes";

const location = useLocation();
const isLoginPage = location.pathname === ROUTES.LOGIN;
```

## 🔒 Protected Route Pattern

```typescript
<Route
  path="/protected-page"
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  }
/>
```

## ➕ Adding New Routes

### 1. Add constant to RouteConfig.ts

```typescript
export const ROUTES = {
  // ... existing
  NEW_PAGE: "/new-page",
} as const;
```

### 2. Add metadata

```typescript
export const ROUTE_METADATA = {
  // ... existing
  [ROUTES.NEW_PAGE]: {
    title: "New Page - Riden'Byte",
    description: "Description",
    isPublic: false,
  },
} as const;
```

### 3. Add route definition

**For public:** Edit `PublicRoutes.tsx`

```typescript
<Route path="/new-page" element={<NewPage isDark={isDark} />} />
```

**For protected:** Edit `ProtectedRoutes.tsx`

```typescript
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage isDark={isDark} />
    </ProtectedRoute>
  }
/>
```

## 🧪 Testing Routes

### Check public route

```bash
# Open browser
http://localhost:5173/
http://localhost:5173/login
http://localhost:5173/signup
```

### Check protected route

```bash
# 1. Clear localStorage
localStorage.clear()

# 2. Try to access protected route
http://localhost:5173/dashboard
# Should redirect to /login

# 3. Login, then try again
# Should show dashboard
```

### Check authentication flow

1. Visit `/dashboard` without token → Redirects to `/login`
2. Login successfully → Redirects to `/user/:id/dashboard`
3. Refresh page → Should stay on dashboard (token persists)
4. Logout → Clears token and redirects to `/login`

## 📚 Documentation Files

| File                 | What's Inside                |
| -------------------- | ---------------------------- |
| `README.md`          | Complete guide with examples |
| `ARCHITECTURE.md`    | Visual diagrams and flows    |
| `SETUP_SUMMARY.md`   | Setup checklist and notes    |
| `RouteExamples.tsx`  | 10+ code examples            |
| `QUICK_REFERENCE.md` | This file                    |

## 🐛 Troubleshooting

### Route not working?

- Check if route is defined in PublicRoutes.tsx or ProtectedRoutes.tsx
- Verify ROUTES constant exists in RouteConfig.ts
- Check for typos in path

### Protected route accessible without login?

- Ensure route is wrapped with `<ProtectedRoute>`
- Check if token exists in localStorage
- Verify ProtectedRoute component is imported

### Navigation not working?

- Use `ROUTES` constants, not hardcoded strings
- Check if useNavigate is called inside Router context
- Verify route path matches definition

### TypeScript errors?

- Ensure all route constants are properly typed
- Check imports are correct
- Restart TypeScript server if needed

## 🎯 Best Practices

✅ **DO:**

- Use `ROUTES` constants
- Add metadata for all routes
- Document new routes
- Test authentication flow
- Use ProtectedRoute for auth pages

❌ **DON'T:**

- Hardcode route strings
- Skip route metadata
- Forget to wrap protected routes
- Duplicate route definitions

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Look at `RouteExamples.tsx` for code samples
3. Review `ARCHITECTURE.md` for visual guides
4. See `SETUP_SUMMARY.md` for setup details

---

**Quick Start:**

```typescript
// Import
import { ROUTES } from "../routes";
import { useNavigate } from "react-router-dom";

// Use
const navigate = useNavigate();
navigate(ROUTES.LOGIN);
```

**That's it!** 🚀
