# Riden'Byte API Documentation

Base URL: `http://localhost:8000/api/v1`

## Authentication Endpoints

All endpoints except signup and login require authentication via JWT token (in cookie or Authorization header).

### User Authentication

#### Register New User

```http
POST /users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",      // optional
  "studentId": "STU123"        // optional
}

Response: 201 Created
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "access_token",
    "refreshToken": "refresh_token"
  }
}
```

#### Login User

```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "access_token",
    "refreshToken": "refresh_token"
  }
}
```

#### Refresh Access Token

```http
POST /users/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "new_access_token",
    "refreshToken": "new_refresh_token"
  }
}
```

#### Logout User (Protected)

```http
POST /users/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User logged out successfully"
}
```

#### Get Current User (Protected)

```http
GET /users/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "studentId": "STU123",
      "isVerified": false
    }
  }
}
```

---

## Ride Endpoints

All ride endpoints require authentication.

### Ride Schema

```javascript
{
  createdBy: ObjectId,        // User who created the ride
  from: String,               // Starting location
  to: String,                 // Destination
  vehicleDetails: String,     // Vehicle information (optional)
  maxSeats: Number,           // Maximum seats (1-10)
  currentSeats: Number,       // Currently occupied seats
  participants: [{            // Array of participants
    user: ObjectId,
    joinedAt: Date
  }],
  totalPrice: Number,         // Total cost for the ride
  expiryTime: Date,          // Deadline to join/leave
  expired: Boolean,          // Auto-set to true when ride expires (default: false)
  notes: String,             // Additional notes (max 500 chars)
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

**Important Notes:**

- Users can only join or leave before the `expiryTime`
- The `expired` field is automatically set to `true` when the ride expires
- Background job runs every 5 minutes to mark expired rides
- Rides are also checked for expiry on individual API calls
- After expiry, the ride is locked and payment splits are calculated
- Expired rides are NOT deleted from the database
- Payment split = `totalPrice / (participants.length + 1)` (includes creator)
- Frontend displays the split amount to each participant after expiry

### Create New Ride

```http
POST /rides
Authorization: Bearer {token}
Content-Type: application/json

{
  "from": "Campus Main Gate",
  "to": "Downtown Mall",
  "expiryTime": "2025-11-10T14:00:00Z",
  "maxSeats": 3,
  "totalPrice": 150,
  "vehicleDetails": "Honda City, Red",  // optional
  "notes": "Please be on time"           // optional
}

Response: 201 Created
{
  "success": true,
  "statusCode": 201,
  "message": "Ride created successfully",
  "data": {
    "ride": {
      "_id": "...",
      "createdBy": { "name": "John Doe", ... },
      "from": "Campus Main Gate",
      "to": "Downtown Mall",
      "expiryTime": "2025-11-10T14:00:00Z",
      "maxSeats": 3,
      "currentSeats": 0,
      "totalPrice": 150,
      "participants": [],
      "vehicleDetails": "Honda City, Red",
      "notes": "Please be on time",
      "createdAt": "2025-11-09T10:00:00Z",
      "updatedAt": "2025-11-09T10:00:00Z"
    }
  }
}

Errors:
- 400: Missing required fields (from, to, expiryTime, maxSeats, totalPrice)
- 400: Expiry time must be in the future
```

### Search Rides

```http
GET /rides/search?to=Downtown&date=2025-11-10&includeExpired=false
Authorization: Bearer {token}

Query Parameters:
- to (required): Search term for destination
- date (optional): Filter by creation date (YYYY-MM-DD)
- includeExpired (optional): Include expired rides (default: false)

Response: 200 OK
{
  "success": true,
  "data": {
    "rides": [
      {
        "_id": "...",
        "createdBy": { "name": "...", "email": "..." },
        "from": "...",
        "to": "...",
        "expiryTime": "...",
        "expired": false,
        "maxSeats": 3,
        "currentSeats": 1,
        "totalPrice": 150,
        "participants": [ ... ],
        "createdAt": "..."
      }
    ],
    "count": 5
  }
}

Note: By default, only returns rides that haven't expired (expired: false)
```

### Get User's Rides

```http
GET /rides/my-rides
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "createdRides": [ ... ],  // Rides created by user
    "joinedRides": [ ... ]    // Rides joined by user
  }
}
```

### Get Ride Details

```http
GET /rides/:rideId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "ride": {
      "_id": "...",
      "createdBy": { ... },
      "from": "...",
      "to": "...",
      "participants": [ ... ],
      "totalPrice": 150,
      "expiryTime": "...",
      "currentSeats": 2,
      "maxSeats": 3,
      ...
    },
    "payment": {
      "splitAmount": 50,           // Amount per person (totalPrice / total participants)
      "totalParticipants": 3,      // Includes creator + participants
      "isExpired": false,          // Whether ride has expired
      "userAmount": 50             // Amount current user needs to pay (null if not participating)
    }
  }
}
```

### Join a Ride

```http
POST /rides/:rideId/join
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Joined ride successfully",
  "data": {
    "ride": { ... }
  }
}

Errors:
- 400: Ride is full
- 400: Already joined this ride
- 400: Cannot join your own ride
- 400: Ride has expired (past expiryTime)
- 404: Ride not found
```

### Leave a Ride

```http
POST /rides/:rideId/leave
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Left ride successfully"
}

Errors:
- 400: Not part of this ride
- 400: Ride has expired - cannot leave after expiry time (must complete payment)
- 404: Ride not found
```

### Delete a Ride (Creator Only)

```http
DELETE /rides/:rideId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Ride deleted successfully"
}

Errors:
- 400: Cannot delete ride with participants (cancel it instead)
- 403: Only creator can delete
- 404: Ride not found
```

---

## Error Responses

All endpoints follow a consistent error format:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

Common status codes:

- `400` Bad Request - Invalid input
- `401` Unauthorized - Missing or invalid token
- `403` Forbidden - Insufficient permissions
- `404` Not Found - Resource doesn't exist
- `409` Conflict - Resource already exists
- `500` Internal Server Error

---

## Authentication

Include the JWT token in one of two ways:

1. **Cookie** (automatically set by login/signup):

   ```
   Cookie: accessToken=your_jwt_token
   ```

2. **Authorization Header**:
   ```
   Authorization: Bearer your_jwt_token
   ```

Tokens expire after 15 minutes. Use the refresh endpoint to get a new token.
