# Backend API Routes Documentation

## Base URL

```
http://localhost:8000/api/v1
```

---

## User Routes (`/users`)

### Public Routes (No Authentication Required)

#### 1. Sign Up

**Endpoint:** `POST /users/signup`

**Description:** Register a new user account

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890", // Optional
  "studentId": "STU12345" // Optional
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "studentId": "STU12345",
      "isVerified": false,
      "createdAt": "2025-11-10T...",
      "updatedAt": "2025-11-10T..."
    },
    "token": "access_token_here",
    "refreshToken": "refresh_token_here"
  },
  "message": "User registered successfully"
}
```

**Cookies Set:**

- `accessToken` (httpOnly, 7 days)
- `refreshToken` (httpOnly, 7 days)

---

#### 2. Login

**Endpoint:** `POST /users/login`

**Description:** Login with existing credentials

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "studentId": "STU12345",
      "isVerified": false
    },
    "token": "access_token_here",
    "refreshToken": "refresh_token_here"
  },
  "message": "Login successful"
}
```

**Cookies Set:**

- `accessToken` (httpOnly, 7 days)
- `refreshToken` (httpOnly, 7 days)

**Error Responses:**

- `400` - Invalid login details
- `401` - Invalid email or password

---

#### 3. Refresh Token

**Endpoint:** `POST /users/refresh`

**Description:** Get a new access token using refresh token

**Request Body:**

```json
{
  "refreshToken": "refresh_token_here"
}
```

_Note: Can also use refresh token from cookies_

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "token": "new_access_token",
    "refreshToken": "new_refresh_token"
  },
  "message": "Access token refreshed"
}
```

**Error Responses:**

- `401` - No refresh token provided
- `401` - Invalid or expired refresh token

---

### Protected Routes (Require Authentication)

**Authentication Required:** Include access token in one of these ways:

1. Cookie: `accessToken` (automatic if using cookies)
2. Header: `Authorization: Bearer <access_token>`

---

#### 4. Logout

**Endpoint:** `POST /users/logout`

**Description:** Logout current user and invalidate all refresh tokens

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": null,
  "message": "User logged out successfully"
}
```

**Cookies Cleared:**

- `accessToken`
- `refreshToken`

---

#### 5. Get Current User

**Endpoint:** `GET /users/me`

**Description:** Get currently authenticated user's information

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "studentId": "STU12345",
      "isVerified": false,
      "createdAt": "2025-11-10T...",
      "updatedAt": "2025-11-10T..."
    }
  },
  "message": "User fetched successfully"
}
```

---

## Ride Routes (`/rides`)

**All ride routes require authentication** - Include access token in headers or cookies

### Ride Endpoints

#### 1. Create Ride

**Endpoint:** `POST /rides`

**Description:** Create a new ride

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "origin": "University Campus",
  "destination": "Downtown Mall",
  "departureTime": "2025-11-10T14:00:00Z",
  "seatsAvailable": 3,
  "pricePerSeat": 5.0,
  "vehicleDetails": {
    "make": "Toyota",
    "model": "Camry",
    "color": "Blue",
    "licensePlate": "ABC123"
  },
  "notes": "Non-smoking ride"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "ride": {
      "_id": "ride_id_here",
      "creator": "user_id_here",
      "origin": "University Campus",
      "destination": "Downtown Mall",
      "departureTime": "2025-11-10T14:00:00Z",
      "seatsAvailable": 3,
      "totalSeats": 3,
      "pricePerSeat": 5.00,
      "participants": [],
      "status": "active",
      "expired": false,
      "vehicleDetails": {...},
      "createdAt": "2025-11-10T...",
      "updatedAt": "2025-11-10T..."
    }
  },
  "message": "Ride created successfully"
}
```

---

#### 2. Search Rides

**Endpoint:** `GET /rides/search`

**Description:** Search for available rides

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `origin` (optional) - Filter by origin location
- `destination` (optional) - Filter by destination
- `date` (optional) - Filter by date (YYYY-MM-DD)
- `minSeats` (optional) - Minimum available seats
- `maxPrice` (optional) - Maximum price per seat
- `includeExpired` (optional) - Include expired rides (default: false)

**Example Request:**

```
GET /rides/search?origin=Campus&destination=Mall&minSeats=2&maxPrice=10
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "rides": [
      {
        "_id": "ride_id_1",
        "creator": {...},
        "origin": "University Campus",
        "destination": "Downtown Mall",
        "departureTime": "2025-11-10T14:00:00Z",
        "seatsAvailable": 3,
        "pricePerSeat": 5.00,
        "status": "active",
        "expired": false,
        "participantCount": 0
      }
    ],
    "count": 1
  },
  "message": "Rides fetched successfully"
}
```

---

#### 3. Get Ride Details

**Endpoint:** `GET /rides/:rideId`

**Description:** Get detailed information about a specific ride

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "ride": {
      "_id": "ride_id_here",
      "creator": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890"
      },
      "origin": "University Campus",
      "destination": "Downtown Mall",
      "departureTime": "2025-11-10T14:00:00Z",
      "seatsAvailable": 3,
      "totalSeats": 3,
      "pricePerSeat": 5.0,
      "participants": [],
      "status": "active",
      "expired": false,
      "vehicleDetails": {
        "make": "Toyota",
        "model": "Camry",
        "color": "Blue",
        "licensePlate": "ABC123"
      },
      "notes": "Non-smoking ride"
    }
  },
  "message": "Ride details fetched successfully"
}
```

**Error Responses:**

- `404` - Ride not found
- `410` - Ride has expired

---

#### 4. Join Ride

**Endpoint:** `POST /rides/:rideId/join`

**Description:** Join an existing ride

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "ride": {
      "_id": "ride_id_here",
      "seatsAvailable": 2,
      "participants": [
        {
          "user": "user_id_here",
          "joinedAt": "2025-11-10T..."
        }
      ]
    }
  },
  "message": "Successfully joined the ride"
}
```

**Error Responses:**

- `400` - Cannot join your own ride
- `400` - Already joined this ride
- `400` - No seats available
- `404` - Ride not found
- `410` - Ride has expired

---

#### 5. Leave Ride

**Endpoint:** `POST /rides/:rideId/leave`

**Description:** Leave a ride you've joined

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "ride": {
      "_id": "ride_id_here",
      "seatsAvailable": 3,
      "participants": []
    }
  },
  "message": "Successfully left the ride"
}
```

**Error Responses:**

- `400` - Creator cannot leave their own ride
- `400` - You are not a participant in this ride
- `404` - Ride not found
- `410` - Ride has expired

---

#### 6. Get User's Rides

**Endpoint:** `GET /rides/my-rides`

**Description:** Get all rides created by or joined by the current user

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "createdRides": [
      {
        "_id": "ride_id_1",
        "origin": "Campus",
        "destination": "Mall",
        "departureTime": "2025-11-10T14:00:00Z",
        "seatsAvailable": 3,
        "status": "active",
        "participantCount": 0
      }
    ],
    "joinedRides": [
      {
        "_id": "ride_id_2",
        "origin": "Airport",
        "destination": "City Center",
        "departureTime": "2025-11-10T18:00:00Z",
        "seatsAvailable": 1,
        "status": "active",
        "creator": {
          "name": "Jane Smith",
          "phone": "+9876543210"
        }
      }
    ]
  },
  "message": "User rides fetched successfully"
}
```

---

#### 7. Delete Ride

**Endpoint:** `DELETE /rides/:rideId`

**Description:** Delete a ride (creator only)

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": null,
  "message": "Ride deleted successfully"
}
```

**Error Responses:**

- `403` - Only the ride creator can delete this ride
- `404` - Ride not found

---

## Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message here"
}
```

### Common Error Codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required or failed)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (e.g., user already exists)
- `410` - Gone (resource expired)
- `500` - Internal Server Error

---

## Authentication Flow

### 1. Cookie-Based Authentication (Recommended for Web)

- Access and refresh tokens automatically sent via HTTP-only cookies
- More secure against XSS attacks
- No need to manually handle tokens in JavaScript

### 2. Token-Based Authentication (For Mobile/API)

- Store tokens in secure storage
- Include `Authorization: Bearer <token>` header in requests
- Manually refresh tokens when expired

### Token Expiry

- **Access Token:** 15 minutes
- **Refresh Token:** 7 days

### Refreshing Tokens

When access token expires (401 error), use the refresh token endpoint to get new tokens.

---

## Rate Limiting

- **Login/Signup:** 5 requests per 15 minutes per IP
- **Other endpoints:** 100 requests per 15 minutes per user

---

## CORS Configuration

Allowed origin: `http://localhost:5173` (frontend dev server)

For production, update `CORS_ORIGIN` in environment variables.

---

## Environment Variables Required

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/ridenbyte
JWT_SECRET=your_jwt_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## Testing with cURL

### Sign Up

```bash
curl -X POST http://localhost:8000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User (with token)

```bash
curl -X GET http://localhost:8000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Create Ride

```bash
curl -X POST http://localhost:8000/api/v1/rides \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "Campus",
    "destination": "Mall",
    "departureTime": "2025-11-10T14:00:00Z",
    "seatsAvailable": 3,
    "pricePerSeat": 5.00
  }'
```

### Search Rides

```bash
curl -X GET "http://localhost:8000/api/v1/rides/search?origin=Campus&destination=Mall" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Additional Features

### Ride Auto-Expiry

- Background job checks for expired rides every 5 minutes
- Rides are marked as expired when `expiryTime` (departureTime + 1 hour) is reached
- Expired rides are not deleted but marked with `expired: true`
- Expired rides are excluded from search results by default (can include with `includeExpired=true`)

### Pre-Find Middleware

- Automatically updates expired status before any ride query
- Ensures real-time expiry status without waiting for background job

---

## Future Endpoints (To Be Implemented)

- [ ] **Food Orders** - `/api/v1/food/*`
- [ ] **User Profile** - `PUT /users/profile`, `POST /users/avatar`
- [ ] **Ratings & Reviews** - `POST /rides/:id/review`
- [ ] **Chat Messages** - Real-time chat for rides
- [ ] **Notifications** - Push notifications for ride updates
- [ ] **Payment Integration** - Payment processing endpoints

---

**Last Updated:** November 10, 2025
