# Deploy to Render - Step by Step Guide

## 📋 Prerequisites

1. **MongoDB Atlas Account** (Free Tier)

   - Sign up at https://mongodb.com/cloud/atlas
   - Have your connection string ready

2. **Render Account** (Free Tier)
   - Sign up at https://render.com
   - Connect your GitHub account

## 🚀 Deployment Steps

### Step 1: Prepare MongoDB Atlas

1. Go to https://mongodb.com/cloud/atlas
2. Create a **free M0 cluster** (if you don't have one)
3. Click **"Database Access"** → **"Add New Database User"**

   - Username: `ridenbyte_user` (or your choice)
   - Password: Generate a secure password (save it!)
   - User Privileges: **Read and write to any database**

4. Click **"Network Access"** → **"Add IP Address"**

   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **Confirm**

5. Click **"Database"** → **"Connect"** → **"Connect your application"**

   - Copy your connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add `/ridenbyte` before the `?` to specify the database name

   **Final format:**

   ```
   mongodb+srv://ridenbyte_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ridenbyte?retryWrites=true&w=majority
   ```

### Step 2: Generate JWT Secrets

Run this command **twice** to generate two different secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Save both outputs:

- First one → `ACCESS_TOKEN_SECRET`
- Second one → `REFRESH_TOKEN_SECRET`

### Step 3: Deploy to Render

#### Option A: Deploy from GitHub (Recommended)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: **`CodeBlooded`**
4. Configure the service:

   - **Name:** `ridenbyte-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `BackEnd` (⚠️ Important!)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

5. Click **"Advanced"** → Add Environment Variables:

   ```
   NODE_ENV=production
   PORT=8000
   MONGO_URI=mongodb+srv://ridenbyte_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ridenbyte?retryWrites=true&w=majority
   DB_NAME=ridenbyte
   ACCESS_TOKEN_SECRET=<your_first_generated_secret>
   REFRESH_TOKEN_SECRET=<your_second_generated_secret>
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   CORS_ORIGIN=https://code-blooded-vexd.vercel.app
   ```

6. Click **"Create Web Service"**

#### Option B: Deploy with render.yaml

1. The `render.yaml` file is already configured
2. Go to https://dashboard.render.com
3. Click **"New +"** → **"Blueprint"**
4. Connect your repository
5. Render will auto-detect the `render.yaml`
6. Add the secret environment variables manually in the dashboard:
   - `MONGO_URI`
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`

### Step 4: Wait for Deployment

- First deployment takes 5-10 minutes
- Render will show build logs
- Wait for **"Your service is live 🎉"** message
- Copy your backend URL (e.g., `https://ridenbyte-backend.onrender.com`)

### Step 5: Test Your Backend

Open your browser or use curl:

```bash
curl https://your-backend-url.onrender.com/api/v1/health
```

**Expected Response:**

```json
{
  "status": "ok",
  "message": "Riden'Byte API is healthy",
  "timestamp": "2025-11-10T...",
  "environment": "production"
}
```

### Step 6: Update Frontend Environment Variables

1. Go to your Vercel frontend project: https://vercel.com
2. Click **Settings** → **Environment Variables**
3. Add or update:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
4. **Redeploy your frontend** for changes to take effect

## ⚙️ Your Current Configuration

✅ **Frontend URL:** https://code-blooded-vexd.vercel.app
✅ **CORS Origin:** Already configured in `render.yaml`
✅ **Health Check:** `/api/v1/health` endpoint ready

## 🔧 Post-Deployment Configuration

### Update Frontend API URL

In your frontend Vercel project, add this environment variable:

```env
VITE_API_BASE_URL=https://ridenbyte-backend.onrender.com
```

_(Replace with your actual Render URL)_

### Test the Connection

1. Visit: https://code-blooded-vexd.vercel.app
2. Try to sign up or log in
3. Check browser console for any CORS errors
4. If you see CORS errors, verify:
   - ✅ CORS_ORIGIN in Render matches your frontend URL
   - ✅ Frontend VITE_API_BASE_URL points to Render backend

## 🐛 Troubleshooting

### "Cannot connect to backend"

- Check if backend is sleeping (free tier sleeps after 15 min inactivity)
- Visit the health check endpoint to wake it up
- Render free tier spins down after inactivity

### CORS Errors

- Verify `CORS_ORIGIN=https://code-blooded-vexd.vercel.app` in Render
- Make sure there are no trailing slashes
- Redeploy backend after changing CORS_ORIGIN

### MongoDB Connection Failed

- Check if IP whitelist includes `0.0.0.0/0`
- Verify connection string is correct
- Make sure password doesn't contain special characters that need URL encoding
- If password has special chars, URL encode them (e.g., `@` → `%40`)

### 500 Internal Server Error

- Check Render logs: **Dashboard** → **Your Service** → **Logs**
- Look for MongoDB connection errors
- Verify all environment variables are set

### JWT Errors

- Ensure ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET are set
- Secrets should be at least 32 characters
- Regenerate secrets if needed

## 📊 Monitor Your Backend

### View Logs

1. Go to Render Dashboard
2. Click on your service
3. Click **"Logs"** tab
4. Real-time logs will appear

### Service Health

- **Events** tab shows deployment history
- **Metrics** tab shows resource usage (paid plans)
- Free tier has 750 hours/month

## ⚡ Performance Tips

### Keep Backend Awake (Free Tier)

Free tier sleeps after 15 minutes of inactivity. Options:

1. Use a uptime monitoring service (e.g., UptimeRobot)
2. Ping health endpoint every 10 minutes
3. Upgrade to paid plan ($7/month for always-on)

### Reduce Cold Start Time

- Keep dependencies minimal
- Use connection pooling for MongoDB
- Consider upgrading to paid plan

## 🔐 Security Checklist

- [x] Environment variables set (not in code)
- [x] Strong JWT secrets (64+ characters)
- [x] HTTPS only (Render provides free SSL)
- [x] CORS limited to your frontend domain
- [x] MongoDB IP whitelist configured
- [ ] Rotate secrets periodically
- [ ] Monitor logs for suspicious activity

## 💰 Cost

**Render Free Tier:**

- ✅ 750 hours/month free
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold starts take 30-60 seconds
- 🎉 Free SSL certificate
- 🎉 Automatic deployments from GitHub

**Render Paid Plan ($7/month):**

- Always-on service
- No cold starts
- Better performance

## 📞 Need Help?

1. Check Render logs for errors
2. Test health endpoint: `https://your-url.onrender.com/api/v1/health`
3. Review MongoDB Atlas connection
4. Check all environment variables are set correctly

## 🎉 Success!

Once you see **"Your service is live"** and the health check returns OK, your backend is successfully deployed!

**Next Steps:**

1. Update frontend with backend URL
2. Test authentication (signup/login)
3. Test ride and food features
4. Monitor logs for any errors
