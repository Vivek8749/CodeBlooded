# Backend Deployment Guide

## Prerequisites

- MongoDB Atlas account (or other MongoDB hosting)
- Vercel account (or other Node.js hosting platform)
- Node.js 18+ installed locally for testing

## Deployment Options

### Option 1: Vercel (Recommended for Serverless)

#### Step 1: Prepare MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/ridenbyte`)
5. Whitelist all IPs (0.0.0.0/0) for Vercel access

#### Step 2: Deploy to Vercel

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from backend directory:

   ```bash
   cd BackEnd
   vercel
   ```

4. Add environment variables in Vercel Dashboard:

   - Go to your project settings
   - Navigate to Environment Variables
   - Add the following:
     ```
     MONGO_URI=mongodb+srv://...your-atlas-connection-string
     DB_NAME=ridenbyte
     ACCESS_TOKEN_SECRET=generate-a-strong-random-string-here
     REFRESH_TOKEN_SECRET=generate-another-strong-random-string-here
     ACCESS_TOKEN_EXPIRY=15m
     REFRESH_TOKEN_EXPIRY=7d
     PORT=8000
     NODE_ENV=production
     CORS_ORIGIN=https://your-frontend-domain.vercel.app
     ```

5. Redeploy after adding environment variables:
   ```bash
   vercel --prod
   ```

#### Important Notes for Vercel:

- Socket.IO may have limitations on serverless platforms
- Consider using polling transport for Socket.IO on Vercel
- API responses should complete within 10 seconds (Vercel hobby plan limit)

---

### Option 2: Railway (Recommended for Persistent Server)

Railway is better for real-time features like Socket.IO.

#### Step 1: Deploy to Railway

1. Go to [Railway.app](https://railway.app/)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository and select the backend directory

#### Step 2: Configure Environment Variables

Add these in Railway dashboard:

```
MONGO_URI=mongodb+srv://...your-atlas-connection-string
DB_NAME=ridenbyte
ACCESS_TOKEN_SECRET=generate-a-strong-random-string-here
REFRESH_TOKEN_SECRET=generate-another-strong-random-string-here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
PORT=8000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### Step 3: Configure Start Command

- Railway will auto-detect `npm start`
- No additional configuration needed

---

### Option 3: Render (Free Tier Available)

1. Go to [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - Root Directory: `BackEnd`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables in Render dashboard

---

## Environment Variables Guide

### Required Variables:

- `MONGO_URI`: Your MongoDB connection string
- `ACCESS_TOKEN_SECRET`: Random string (min 32 characters)
- `REFRESH_TOKEN_SECRET`: Random string (min 32 characters)
- `CORS_ORIGIN`: Your frontend URL (comma-separated for multiple)

### Generate Secrets:

Use Node.js to generate secure secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Testing Deployment

### Test Health Endpoint:

```bash
curl https://your-backend-url.vercel.app/api/v1/health
```

### Expected Response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Updating Frontend API URL

After deploying backend, update frontend environment variables:

**Frontend `.env`:**

```
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

---

## Troubleshooting

### CORS Errors:

- Ensure `CORS_ORIGIN` includes your frontend URL
- Check if URL includes protocol (https://)
- For multiple origins, use comma-separated values

### MongoDB Connection Issues:

- Verify connection string is correct
- Check if IP whitelist includes 0.0.0.0/0
- Ensure database user has proper permissions

### Socket.IO Not Working:

- Vercel serverless has limitations with WebSockets
- Consider using Railway or Render for Socket.IO
- Enable polling as fallback transport

### JWT Errors:

- Regenerate secrets and update in environment variables
- Ensure secrets are at least 32 characters long
- Don't use special characters that need escaping

---

## Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Environment variables configured
- [ ] MongoDB connection working
- [ ] Health check endpoint responds
- [ ] CORS configured for frontend domain
- [ ] Frontend updated with backend URL
- [ ] Test authentication (login/signup)
- [ ] Test API endpoints
- [ ] Socket.IO connections working (if applicable)

---

## Monitoring & Logs

### Vercel:

- View logs: `vercel logs`
- Or check Vercel dashboard

### Railway:

- Real-time logs in Railway dashboard
- Click on deployment to see logs

### Render:

- Logs tab in service dashboard
- Real-time log streaming available

---

## Security Recommendations

1. **Never commit `.env` files**
2. **Use strong, random secrets** (64+ characters)
3. **Rotate secrets periodically**
4. **Use HTTPS only** in production
5. **Limit CORS origins** to your actual domains
6. **Keep dependencies updated**
7. **Use MongoDB Atlas IP whitelist** when possible

---

## Need Help?

Check the API documentation:

- `API_DOCS.md` - API endpoint documentation
- `API_DOCUMENTATION.md` - Detailed API guide
