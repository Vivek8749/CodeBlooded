# Render Environment Variables Setup

## Required Environment Variables

Set these environment variables in your Render.com dashboard:

### 1. Go to Render Dashboard

- Navigate to: https://dashboard.render.com/
- Select your backend service: `codeblooded-9jnh`

### 2. Go to Environment Variables

- Click on "Environment" in the left sidebar
- Click "Add Environment Variable"

### 3. Add/Update These Variables:

```bash
# Database
MONGO_URI=<your-mongodb-atlas-connection-string>
DB_NAME=ridenbyte

# JWT Secrets (IMPORTANT: Use strong, unique values!)
ACCESS_TOKEN_SECRET=<generate-a-strong-random-string>
REFRESH_TOKEN_SECRET=<generate-a-different-strong-random-string>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Server
PORT=8000
NODE_ENV=production

# CORS - CRITICAL FOR FRONTEND CONNECTION
CORS_ORIGIN=https://code-blooded-vexd.vercel.app
```

### 4. Generate Strong Secrets

Run this command to generate random secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run it twice to get two different secrets for ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET.

### 5. MongoDB Atlas Setup

Make sure your MongoDB Atlas:

1. **IP Whitelist**: Add `0.0.0.0/0` to allow Render to connect
2. **Database User**: Has read/write permissions
3. **Connection String**: Use the correct format:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### 6. Save and Redeploy

After adding/updating environment variables:

1. Click "Save Changes"
2. Render will automatically redeploy your service
3. Wait for the deployment to complete (2-3 minutes)

### 7. Test the Connection

After deployment:

1. Visit: https://codeblooded-9jnh.onrender.com/api/v1/health
2. You should see: `{"status":"ok","message":"Riden'Byte API is healthy",...}`

### 8. Test CORS from Frontend

Visit your frontend at: https://code-blooded-vexd.vercel.app
Try to login - CORS errors should now be resolved.

## Troubleshooting

### If CORS errors persist:

1. **Check Render Logs**:

   - Go to Render Dashboard → Logs
   - Look for CORS-related errors

2. **Verify Environment Variables**:

   - Ensure `CORS_ORIGIN=https://code-blooded-vexd.vercel.app`
   - No trailing slashes
   - Exact match with your Vercel URL

3. **Check MongoDB Connection**:

   - Look for "MongoDB connected" in logs
   - Verify IP whitelist includes Render's IPs

4. **Force Redeploy**:
   - Go to Render Dashboard
   - Click "Manual Deploy" → "Clear build cache & deploy"

## Current Backend Configuration

The backend now supports these origins:

- `http://localhost:5173` (local dev)
- `http://localhost:5174` (local dev alternate)
- `https://code-blooded-vexd.vercel.app` (production frontend)
- Any additional origin set in `CORS_ORIGIN` env variable

## Need Help?

If issues persist, check:

1. Render deployment logs
2. Browser console for detailed error messages
3. Network tab in DevTools to see the exact request/response
