# Quick Start Guide

Get the Carbon Footprint Awareness Platform running in 5 minutes!

## Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

## Step 1: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend (new terminal)
cd backend
npm install
```

## Step 2: Setup Environment

```bash
# Backend
cd backend
cp .env.example .env

# Note: For local development without Docker:
# - Modify DATABASE_URL in .env to your local PostgreSQL
# - Create the database first: createdb carbon_footprint
```

## Step 3: Start Services

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Expected output: `🚀 Server running on http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Expected output: `Local: http://localhost:5173`

## Step 4: Open in Browser

Visit: **http://localhost:5173**

## Available Features

| Feature | Path | Description |
|---------|------|-------------|
| Home | `/` | Platform overview |
| Dashboard | `/dashboard` | Your carbon statistics |
| Calculator | `/calculator` | Calculate your emissions |
| Actions | `/actions` | Eco-friendly actions list |
| Leaderboard | `/leaderboard` | Global rankings |
| Profile | `/profile` | Your profile & settings |

## Database Setup (Optional)

### With Docker
```bash
cd backend
docker-compose up -d
```

### Without Docker
```bash
# Create PostgreSQL database
createdb carbon_footprint

# Update .env
DATABASE_URL=postgresql://user:password@localhost:5432/carbon_footprint

# Import schema
psql -U postgres -d carbon_footprint -f init.sql
```

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
# Output in: frontend/dist
```

### Backend Production
```bash
cd backend
NODE_ENV=production npm start
```

## Troubleshooting

### Port 5000/5173 Already in Use
```bash
# Kill process on port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify connection string in .env
# Format: postgresql://user:password@host:port/database
```

### Dependencies Issue
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

- Frontend hot-reload: Changes auto-refresh in browser
- Backend hot-reload: Run with `npm run dev` (uses nodemon)
- Browser DevTools: F12 for debugging React components
- API Testing: Use `/api` endpoints directly

## Next Steps

1. **Explore the code:** Check out `src/pages/` and `src/components/`
2. **Read docs:** See [docs/](docs/) folder
3. **Add features:** Start with [CONTRIBUTING.md](docs/CONTRIBUTING.md)
4. **Customize:** Modify colors in `src/index.css` or `frontend/tailwind.config.js`

## Project Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [API Reference](docs/API.md) - All endpoints documented
- [Architecture](docs/ARCHITECTURE.md) - System design
- [Contributing](docs/CONTRIBUTING.md) - How to contribute

## Support

- 📖 Check [README.md](README.md) for overview
- 📚 See documentation in [docs/](docs/) folder
- 🐛 Report issues on GitHub
- 💬 Start a discussion

---

**Happy coding! 🌱** Let's make sustainability accessible to everyone!
