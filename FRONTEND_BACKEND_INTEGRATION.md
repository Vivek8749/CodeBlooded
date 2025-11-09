# Frontend Backend Integration - User Routes

## Overview

Successfully connected the frontend to the backend API endpoints with protected routes and navigation utilities.

## Routes Configuration

### Public Routes

- **`/`** - Hero/GetStarted page (landing page)
- **`/login`** - Login page with backend API integration
- **`/signup`** - Signup page with backend API integration

### Protected Routes (Requires Authentication)

- **`/user/:id/dashboard`** - User dashboard (personalized with user ID)
- **`/dashboard`** - Legacy dashboard route (backward compatibility)
- **`/food-search`** - Food search and ordering page
- **`/ride-search`** - Ride search and booking page
- **`/food-detail`** - Food order details with chat
- **`/ride-detail`** - Ride details with chat

## Backend API Endpoints

### Base URL

`http://localhost:8000/api/v1`

### User Endpoints

- **POST** `/users/signup` - Register new user
  - Body: `{ name, email, password, phone?, studentId? }`
  - Response: `{ token, refreshToken, user }`
- **POST** `/users/login` - Login existing user
  - Body: `{ email, password }`
  - Response: `{ token, refreshToken, user }`
- **POST** `/users/refresh` - Refresh access token
  - Uses refresh token from cookies or headers

## Key Features Implemented

### 1. Protected Routes

- Created `ProtectedRoute` component (`src/components/ProtectedRoute.tsx`)
- Automatically redirects to `/login` if user is not authenticated
- Preserves the intended destination for redirect after login

### 2. Navigation Utilities

- Enhanced `useAppNavigation` hook (`src/utils/navigation.ts`)
- Handles login/signup with backend API integration
- Automatic navigation to `/user/:id/dashboard` after successful auth
- Error handling and user feedback

### 3. API Integration

- Updated `userApi.ts` to use correct backend endpoints (`/api/v1/users/*`)
- Token management (access token + refresh token)
- Axios interceptors for authentication
- Error handling with user-friendly messages

### 4. Component Updates

#### Login Component (`Login.tsx`)

- Integrated with `useAppNavigation` hook
- Real-time API calls on form submission
- Loading states during authentication
- Error message display
- Removed `onNavigateToDashboard` prop (handled internally)

#### Signup Component (`Signup.tsx`)

- Integrated with `useAppNavigation` hook
- Real-time API calls on form submission
- Loading states during registration
- Error message display
- Automatic redirect to dashboard after signup

### 5. Authentication Flow

```
User fills form → Submit → API call → Token saved → Navigate to /user/:id/dashboard
                              ↓
                           Error handling → Display error message
```

## Token Storage

- **Access Token**: Stored in localStorage as `token`
- **Refresh Token**: Stored in localStorage as `refreshToken`
- **User Data**: Stored in localStorage as `userData`
- Also available as HTTP-only cookies for additional security

## File Structure

```
FrontEnd/
├── src/
│   ├── api/
│   │   ├── userApi.ts (✓ Updated - backend endpoints)
│   │   └── AxiosInstance.ts
│   ├── components/
│   │   ├── Login.tsx (✓ Updated - integrated with backend)
│   │   ├── Signup.tsx (✓ Updated - integrated with backend)
│   │   ├── ProtectedRoute.tsx (✓ New - auth protection)
│   │   ├── Dashboard.tsx
│   │   ├── FoodSearch.tsx
│   │   ├── RideSearch.tsx
│   │   └── ...
│   ├── utils/
│   │   ├── navigation.ts (✓ Updated - proper route paths)
│   │   └── auth.ts (token management)
│   └── App.tsx (✓ Updated - new route structure)
```

## Next Steps (Recommendations)

1. **Add Logout Functionality**

   - Add logout button in Header/Dashboard
   - Clear tokens on logout
   - Redirect to login page

2. **Add Token Refresh Logic**

   - Implement automatic token refresh when access token expires
   - Use refresh token to get new access token

3. **Add User Context**

   - Create React Context for user state
   - Share user data across components without prop drilling

4. **Add Form Validation**

   - Client-side validation for email format
   - Password strength requirements
   - Match password confirmation

5. **Add Remember Me**

   - Option to keep user logged in
   - Persist tokens in localStorage

6. **Connect Ride & Food APIs**
   - Similar integration for ride and food endpoints
   - Real data instead of mock data

## Testing the Integration

1. Start backend server:

```bash
cd BackEnd
npm run dev
```

2. Start frontend server:

```bash
cd FrontEnd
npm run dev
```

3. Test signup flow:

   - Navigate to `/signup`
   - Fill in username, email, password
   - Submit → Should redirect to `/user/:id/dashboard`

4. Test login flow:

   - Navigate to `/login`
   - Use registered credentials
   - Submit → Should redirect to `/user/:id/dashboard`

5. Test protected routes:
   - Try accessing `/dashboard` without logging in
   - Should redirect to `/login`
   - After login, should access dashboard successfully

## Error Handling

All API errors are caught and displayed to the user with meaningful messages:

- Invalid credentials
- User already exists
- Network errors
- Server errors

## Security Considerations

✅ Tokens stored securely
✅ Protected routes require authentication
✅ CORS configured on backend
✅ HTTP-only cookies option available
✅ Passwords never logged or exposed

## Status: ✅ Complete

Basic user authentication and routing functionality is now fully integrated and working!
