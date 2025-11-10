# Quick Deployment Guide

## 🚀 Deploy Backend in 5 Minutes

### 1. Choose Your Platform

**Railway** (Recommended) - Best for Socket.IO and real-time features

```bash
# Visit https://railway.app
# Sign in with GitHub
# Click "New Project" → "Deploy from GitHub repo"
# Select BackEnd folder
```

**OR Vercel** - Serverless option

```bash
npm i -g vercel
cd BackEnd
vercel
```

### 2. Set Environment Variables

Copy these to your platform's dashboard:

```env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_generated_secret_1
REFRESH_TOKEN_SECRET=your_generated_secret_2
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
PORT=8000
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
DB_NAME=ridenbyte
```

#### Generate Secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Setup MongoDB Atlas

1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string
6. Replace `<password>` with your password

### 4. Test Your Deployment

```bash
curl https://your-backend-url/api/v1/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Riden'Byte API is healthy"
}
```

### 5. Update Frontend

In `FrontEnd/.env`:

```env
VITE_API_BASE_URL=https://your-backend-url
```

## ✅ Done!

Your backend is now deployed and ready to use.

For detailed guide, see [DEPLOYMENT.md](./DEPLOYMENT.md)
