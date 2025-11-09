# Ride Auto-Expiry Mechanism

## Overview

The ride auto-expiry mechanism automatically marks rides as expired when their `expiryTime` has passed. Expired rides remain in the database but are excluded from searches and prevent new participants from joining.

## Features

### 1. **Automatic Expiry Field**

- New boolean field `expired` added to ride schema (default: `false`)
- Indexed for fast queries
- Set to `true` when ride expires

### 2. **Background Job**

- Runs every 5 minutes (configurable)
- Checks all rides with `expiryTime <= current time` and `expired: false`
- Updates them in bulk to set `expired: true`
- Logs the number of rides marked as expired

### 3. **Real-time Expiry Check**

- Pre-find middleware runs before any query
- Ensures expired rides are marked before results are returned
- Individual ride methods (`checkAndUpdateExpiry()`) for precise checks

### 4. **Database Preservation**

- Expired rides are **NOT deleted** from the database
- All ride data and participant history is preserved
- Useful for payment tracking, analytics, and audit trails

## Implementation Details

### Model Changes (`ride.model.js`)

```javascript
// New field
expired: {
  type: Boolean,
  default: false,
  index: true,
}

// Pre-find middleware
rideSchema.pre(/^find/, async function (next) {
  await this.model.updateMany(
    { expiryTime: { $lte: new Date() }, expired: false },
    { $set: { expired: true } }
  );
  next();
});

// Instance method
rideSchema.methods.checkAndUpdateExpiry = async function () {
  if (!this.expired && new Date() > this.expiryTime) {
    this.expired = true;
    await this.save();
  }
  return this.expired;
};
```

### Background Job (`rideExpiryChecker.js`)

```javascript
// Start on server startup
startExpiryChecker(5); // Check every 5 minutes

// Manual check
await checkAndUpdateExpiredRides();
```

### Controller Updates

- `searchRides`: Excludes expired rides by default (unless `includeExpired=true`)
- `getRideDetails`: Checks expiry before returning details
- `joinRide`: Prevents joining expired rides
- `leaveRide`: Prevents leaving expired rides

## API Changes

### Search Rides

```http
GET /rides/search?to=Downtown&includeExpired=false
```

- New query parameter: `includeExpired` (default: `false`)
- By default, only returns non-expired rides

### Response Format

All ride objects now include the `expired` field:

```json
{
  "_id": "...",
  "from": "Campus",
  "to": "Downtown",
  "expiryTime": "2025-11-10T14:00:00Z",
  "expired": false,
  "maxSeats": 3,
  "currentSeats": 1,
  "totalPrice": 150
}
```

## Configuration

### Change Check Interval

In `src/index.js`:

```javascript
// Check every 10 minutes instead of 5
startExpiryChecker(10);
```

### Disable Background Job (Not Recommended)

Comment out in `src/index.js`:

```javascript
// startExpiryChecker(5);
```

Note: Pre-find middleware will still work, but updates will be less proactive.

## Benefits

1. **Payment Protection**: Locked participant list after expiry ensures accurate payment splits
2. **Data Integrity**: Historical ride data preserved for analytics
3. **Performance**: Indexed queries, bulk updates, and efficient middleware
4. **Reliability**: Dual-layer approach (background job + real-time checks)
5. **Scalability**: Handles large volumes of rides efficiently

## Testing

### Create Test Ride with Short Expiry

```javascript
POST /rides
{
  "from": "Campus",
  "to": "Downtown",
  "expiryTime": "2025-11-09T18:30:00Z", // 5 minutes from now
  "maxSeats": 3,
  "totalPrice": 150
}
```

### Wait for Expiry

- Wait for background job (max 5 minutes)
- Or trigger any find query to activate middleware

### Verify Expiry

```javascript
GET /rides/:rideId
// Response should show "expired": true
```

## Monitoring

Check server logs for expiry updates:

```
[Expiry Checker] Starting background job (checking every 5 minutes)
[Expiry Checker] Marked 3 ride(s) as expired
```

## Future Enhancements

- Email notifications to participants when ride expires
- Auto-generate payment reminders
- Archive very old expired rides to separate collection
- Dashboard analytics for expired rides
