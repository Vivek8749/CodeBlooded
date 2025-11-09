# Riden'Byte Frontend 🚗🍔

Modern React + TypeScript frontend for the Riden'Byte platform - helping students share rides and food orders.

## Features

- **Get Started Page**: Parallax animations and minimal design
- **Authentication**: Login/Signup with JWT tokens
- **Dark/Light Mode**: Theme switching support
- **Type-safe**: Built with TypeScript
- **Modern UI**: Radix UI components + Tailwind CSS
- **API Integration**: Axios with interceptors for auth

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Axios** for API calls
- **React Router** for navigation

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend server running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Environment Variables

Create a `.env` file:
```env
VITE_API_URL=http://localhost:8000
VITE_API_BASE_PATH=/api/v1
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── GetStarted/   # Landing page
│   └── Login/        # Authentication
├── context/          # React context (Auth, Theme)
├── utils/            # API service & utilities
├── styles/           # Global styles
└── App.tsx           # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## API Integration

The app connects to the backend at `/api/v1`:

- `POST /users/signup` - Register new user
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user
- `GET /users/me` - Get current user
- `POST /users/refresh` - Refresh access token

## License

MIT License
