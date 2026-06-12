# Setup Guide

## Prerequisites
- Node.js v16 or higher
- npm or yarn
- Git
- Docker (optional, for database)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/carbon-footprint-platform.git
cd carbon-footprint-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
# Important: Change JWT_SECRET to a secure value
```

#### Option A: Using Docker for Database
```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Wait for containers to be ready (check logs)
docker-compose logs postgres
```

#### Option B: Local Database Setup
```bash
# Install PostgreSQL locally
# Create database
createdb carbon_footprint

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/carbon_footprint

# Run migrations
psql -U postgres -d carbon_footprint -f init.sql
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Backend Start

```bash
cd backend

# Development mode with hot reload
npm run dev

# Or production mode
npm start
```

The backend API will be available at `http://localhost:5000`

## Environment Configuration

### Backend .env
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/carbon_footprint
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## Project Structure

```
carbon-footprint-platform/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── docker-compose.yml
├── docs/
│   ├── API.md
│   ├── SETUP.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
└── README.md
```

## Development Workflow

### Running Both Services

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### Building for Production

#### Frontend Build
```bash
cd frontend
npm run build
# Output in frontend/dist
```

#### Backend Production
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

## Database Management

### View Database
```bash
# Connect to PostgreSQL
psql -U postgres -d carbon_footprint

# List tables
\dt

# View table schema
\d <table_name>
```

### Reset Database
```bash
# Stop containers
docker-compose down

# Remove volumes to reset data
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
npm run test
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000 or 5173
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists
- Check credentials

### CORS Error
- Verify CORS_ORIGIN in backend .env matches frontend URL
- Restart backend after changes

### Dependencies Issue
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables
4. Deploy

### Backend Deployment
Options:
- Heroku
- DigitalOcean
- AWS EC2
- Railway
- Render

Set environment variables in hosting platform.

## Performance Optimization

### Frontend
- Enable source maps for debugging
- Use production build for testing
- Optimize images

### Backend
- Enable database connection pooling
- Use Redis for caching
- Implement rate limiting

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact: support@carbonfootprint.com

## License

MIT License - see LICENSE file
