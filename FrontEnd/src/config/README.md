# Frontend Configuration

## Environment Variables

The frontend uses Vite environment variables. Create a `.env` file in the frontend root directory based on `.env.example`.

### Available Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: `http://localhost:8000`)

### Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` according to your environment:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. For production, update to your production backend URL:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.com
   ```

## Configuration File

The `config/config.ts` file provides a centralized configuration object that can be imported throughout the application:

```typescript
import { config } from '@/config/config';

// Access API base URL
const apiUrl = config.api.baseURL;
```

### Backend Server Configuration

Make sure your backend server is running on the configured port (default: 8000).

Backend `.env` configuration:
```env
PORT=8000
CORS_ORIGIN=http://localhost:5173
```

### Notes

- Environment variables in Vite must be prefixed with `VITE_`
- Changes to `.env` require a server restart (`npm run dev`)
- Never commit `.env` to version control (it's in `.gitignore`)
