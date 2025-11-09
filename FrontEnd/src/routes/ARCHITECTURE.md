# Route Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           App.tsx                                │
│                     (Main Application)                           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              AppRoutes Component                         │   │
│  │           (routes/index.tsx)                             │   │
│  │                                                           │   │
│  │  ┌─────────────────┐      ┌──────────────────────┐     │   │
│  │  │  PublicRoutes   │      │  ProtectedRoutes     │     │   │
│  │  │                 │      │                      │     │   │
│  │  │  / (Home)       │      │  /user/:id/dashboard │     │   │
│  │  │  /login         │      │  /dashboard          │     │   │
│  │  │  /signup        │      │  /food-search        │     │   │
│  │  │                 │      │  /food-detail        │     │   │
│  │  │                 │      │  /ride-search        │     │   │
│  │  │                 │      │  /ride-detail        │     │   │
│  │  └─────────────────┘      └──────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     RouteConfig.ts                               │
│                 (Configuration & Constants)                      │
│                                                                   │
│  ROUTES = {                                                      │
│    HOME: "/",                                                    │
│    LOGIN: "/login",                                              │
│    SIGNUP: "/signup",                                            │
│    DASHBOARD: "/dashboard",                                      │
│    USER_DASHBOARD: (id) => `/user/${id}/dashboard`,            │
│    FOOD_SEARCH: "/food-search",                                 │
│    FOOD_DETAIL: "/food-detail",                                 │
│    RIDE_SEARCH: "/ride-search",                                 │
│    RIDE_DETAIL: "/ride-detail"                                  │
│  }                                                               │
│                                                                   │
│  ROUTE_METADATA = { title, description, isPublic }             │
│                                                                   │
│  Helper Functions:                                               │
│    - isProtectedRoute(path)                                     │
│    - getRouteMetadata(path)                                     │
└─────────────────────────────────────────────────────────────────┘
```

## Component Flow

```
User visits URL
      │
      ▼
┌─────────────────┐
│   App.tsx       │
│   (BrowserRouter)│
└────────┬────────┘
         │
         ▼
┌────────────────────┐
│   AppRoutes        │
│   (Route Manager)   │
└────────┬───────────┘
         │
         ├─── Public Route?
         │         │
         │         ▼
         │    ┌──────────────────┐
         │    │  PublicRoutes    │
         │    │  - GetStarted    │
         │    │  - Login         │
         │    │  - Signup        │
         │    └──────────────────┘
         │
         └─── Protected Route?
                   │
                   ▼
              ┌──────────────────────┐
              │  ProtectedRoutes     │
              │                      │
              │  ┌────────────────┐ │
              │  │ ProtectedRoute │ │
              │  │   Component    │ │
              │  └────────┬───────┘ │
              │           │         │
              │    Token exists?    │
              │           │         │
              │    ┌──────┴──────┐  │
              │    │             │  │
              │   Yes           No  │
              │    │             │  │
              │    ▼             ▼  │
              │  Show        Redirect│
              │  Page        to Login│
              └──────────────────────┘
```

## Authentication Flow

```
┌──────────────┐
│   / (Home)   │
└──────┬───────┘
       │
       ├─── Click "Get Started"
       │
       ▼
┌──────────────┐
│   /login     │
└──────┬───────┘
       │
       ├─── Enter credentials
       │
       ▼
┌───────────────────────┐
│  Login API Call       │
│  (userApi.ts)         │
└───────┬───────────────┘
        │
        ├─── Success
        │
        ▼
┌───────────────────────────┐
│  Store tokens             │
│  - localStorage           │
│  - Cookies                │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│  Navigate to:             │
│  /user/:id/dashboard      │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│  ProtectedRoute checks    │
│  - Token exists? ✓       │
│  - Show Dashboard         │
└───────────────────────────┘
```

## Route Protection Flow

```
User navigates to protected route
            │
            ▼
    ┌───────────────┐
    │ ProtectedRoute│
    │   Component   │
    └───────┬───────┘
            │
            ▼
    Check localStorage
    for "token"
            │
      ┌─────┴─────┐
      │           │
     Yes         No
      │           │
      ▼           ▼
  ┌────────┐  ┌─────────┐
  │ Allow  │  │ Redirect│
  │ Access │  │ to Login│
  └────────┘  └─────────┘
      │           │
      ▼           ▼
  Show Page   Save intended
              destination
                  │
                  ▼
              After login,
              redirect back
```

## File Dependencies

```
App.tsx
  └── routes/index.tsx (AppRoutes)
      ├── routes/PublicRoutes.tsx
      │   └── components/
      │       ├── GetStarted.tsx
      │       ├── Login.tsx
      │       └── Signup.tsx
      │
      ├── routes/ProtectedRoutes.tsx
      │   ├── components/ProtectedRoute.tsx
      │   └── components/
      │       ├── Dashboard.tsx
      │       ├── FoodSearch.tsx
      │       ├── RideSearch.tsx
      │       ├── FoodDetail.tsx
      │       └── RideDetail.tsx
      │
      └── routes/RouteConfig.ts
          ├── ROUTES (constants)
          ├── ROUTE_METADATA
          └── Helper functions
```

## Navigation Patterns

### Pattern 1: Direct Navigation

```
Component → useNavigate() → ROUTES.PATH → Navigate
```

### Pattern 2: Navigation Utilities

```
Component → useAppNavigation() → navigation.onLogin() → API Call → Navigate
```

### Pattern 3: Protected Navigation

```
Navigate → ProtectedRoute → Check Auth → Allow/Redirect
```

### Pattern 4: Link Navigation

```
<Link to={ROUTES.PATH}> → Click → Navigate
```

## Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                     User Action                           │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                Navigation Request                         │
│           (useNavigate() or <Link>)                      │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│              React Router Matching                        │
│         (Match URL to Route Definition)                  │
└────────────────────┬─────────────────────────────────────┘
                     │
           ┌─────────┴─────────┐
           │                   │
      Public Route      Protected Route
           │                   │
           ▼                   ▼
    ┌─────────────┐   ┌──────────────────┐
    │ Render Page │   │ ProtectedRoute   │
    └─────────────┘   │   Check Auth     │
                      └────────┬─────────┘
                               │
                        ┌──────┴──────┐
                        │             │
                   Authorized    Unauthorized
                        │             │
                        ▼             ▼
                 ┌──────────┐   ┌──────────┐
                 │  Render  │   │ Redirect │
                 │   Page   │   │ to Login │
                 └──────────┘   └──────────┘
```

## Route State Management

```
┌─────────────────────────────────────────┐
│         localStorage                     │
│  - token (access token)                 │
│  - refreshToken                          │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│      ProtectedRoute Component            │
│  - Reads token from storage              │
│  - Validates existence                   │
│  - Controls route access                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│       Navigation Utilities               │
│  - onLogin: Save token → Navigate       │
│  - onSignUp: Save token → Navigate      │
│  - onLogout: Clear token → Navigate     │
└─────────────────────────────────────────┘
```

---

**Legend:**

- `→` : Direct flow
- `▼` : Next step
- `├──` : Branch/Option
- `└──` : End of branch

This diagram shows the complete route architecture and how different components interact with each other in the Riden'Byte application.
