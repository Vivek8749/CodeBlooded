# Frontend-Backend Connection Configuration

## ✅ Configuration Complete!

Your frontend is now configured to connect to your Render backend.

### Current Configuration:

- **Frontend URL:** https://code-blooded-vexd.vercel.app
- **Backend URL:** https://codeblooded-9jnh.onrender.com
- **Local .env updated:** ✅

## 🚀 Deploy to Vercel

### Step 1: Update Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project: **code-blooded-vexd**
3. Go to **Settings** → **Environment Variables**
4. Add/Update this variable:

   ```
   VITE_API_BASE_URL=https://codeblooded-9jnh.onrender.com
   ```

   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://codeblooded-9jnh.onrender.com`
   - **Environment:** Select all (Production, Preview, Development)

### Step 2: Redeploy Frontend

After adding the environment variable, you need to redeploy:

**Option A: From Vercel Dashboard**
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button

**Option B: Push to GitHub**
```bash
git add .
git commit -m "Update backend URL to Render"
git push origin main
```

Vercel will automatically deploy.

### Step 3: Test the Connection

1. Visit: https://code-blooded-vexd.vercel.app
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Try to sign up or log in
5. Check if API calls are going to `https://codeblooded-9jnh.onrender.com`

## 🧪 Quick Test

### Test Backend Health:
```bash
curl https://codeblooded-9jnh.onrender.com/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Riden'Byte API is healthy",
  "timestamp": "...",
  "environment": "production"
}
```

### Test Frontend API Config:
Open browser console on your site and run:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL)
```

Should show: `https://codeblooded-9jnh.onrender.com`

## 🔧 Environment Variables Summary

### Local Development (.env)
```env
VITE_API_BASE_URL=https://codeblooded-9jnh.onrender.com
```

### Vercel Production
```env
VITE_API_BASE_URL=https://codeblooded-9jnh.onrender.com
```

### Backend Render
```env
CORS_ORIGIN=https://code-blooded-vexd.vercel.app
NODE_ENV=production
```

## 🐛 Troubleshooting

### Issue: "Network Error" or "Failed to fetch"

**Possible causes:**
1. Backend is sleeping (Render free tier)
   - **Solution:** Visit the health endpoint to wake it up
   - Wait 30-60 seconds for cold start

2. CORS error
   - **Solution:** Check backend CORS_ORIGIN is set to `https://code-blooded-vexd.vercel.app`
   - No trailing slash!

3. Wrong API URL
   - **Solution:** Verify Vercel environment variable
   - Redeploy after updating

### Issue: API calls go to localhost

**Cause:** Vercel hasn't picked up new environment variable

**Solution:**
1. Clear browser cache
2. Redeploy from Vercel dashboard
3. Check environment variables are saved

### Issue: CORS Error in Console

**Error:** `Access-Control-Allow-Origin`

**Solution:**
1. Go to Render backend dashboard
2. Check environment variable: `CORS_ORIGIN=https://code-blooded-vexd.vercel.app`
3. Make sure there's no trailing `/` and it's `https://` not `http://`
4. Redeploy backend after fixing

## 📝 Checklist

- [x] `.env` updated with Render backend URL
- [ ] Vercel environment variable added
- [ ] Frontend redeployed on Vercel
- [ ] Backend CORS configured for frontend URL
- [ ] Test backend health endpoint
- [ ] Test frontend API connection
- [ ] Test login/signup functionality
- [ ] Test ride/food features

## 🎉 Next Steps

1. **Add environment variable to Vercel**
2. **Redeploy frontend**
3. **Test the connection**
4. **Enjoy your deployed app!**

## 📞 Quick Reference

- **Frontend:** https://code-blooded-vexd.vercel.app
- **Backend:** https://codeblooded-9jnh.onrender.com
- **Health Check:** https://codeblooded-9jnh.onrender.com/api/v1/health
- **API Base:** https://codeblooded-9jnh.onrender.com/api/v1

---

**Note:** Remember that Render free tier sleeps after 15 minutes of inactivity. First request after sleep may take 30-60 seconds to wake up the service.
