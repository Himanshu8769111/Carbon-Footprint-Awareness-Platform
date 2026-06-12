# System Architecture

## Overview

The Carbon Footprint Awareness Platform is a full-stack web application designed to help users track, understand, and reduce their carbon footprint. The system follows a modern client-server architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Users                                 │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────▼────────┐
        │   Web Browser   │
        │   (React App)   │
        └────────┬────────┘
                 │ HTTP/REST
        ┌────────▼────────────────────┐
        │   Frontend (Vite + React)   │
        │  ─ Dashboard                │
        │  ─ Calculator               │
        │  ─ Actions                  │
        │  ─ Leaderboard              │
        │  ─ Profile                  │
        └────────┬────────────────────┘
                 │ API Calls
        ┌────────▼──────────────────────────┐
        │  Backend API (Node.js/Express)   │
        │  ─ Auth Service                  │
        │  ─ User Management               │
        │  ─ Carbon Calculation            │
        │  ─ Activity Tracking             │
        │  ─ Recommendations               │
        │  ─ Leaderboard                   │
        └────────┬──────────────────────────┘
                 │
        ┌────────┴──────────────┐
        │                       │
   ┌────▼─────┐          ┌────▼──────┐
   │PostgreSQL│          │  Redis    │
   │Database  │          │ (Cache)   │
   └──────────┘          └───────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Charting:** Recharts
- **Icons:** Lucide React
- **Styling:** CSS3 + Tailwind CSS

### Component Structure
```
App/
├── Navigation
├── Pages/
│   ├── HomePage
│   ├── Dashboard
│   ├── Calculator
│   ├── Actions
│   ├── Leaderboard
│   └── Profile
├── Components/
│   ├── Footer
│   └── [Shared Components]
└── Services/
    ├── API calls
    └── Data processing
```

### State Management
- **Local State:** React `useState`
- **Global State:** Zustand (for future scalability)
- **Data Fetching:** Axios with interceptors

### Key Pages

1. **HomePage**
   - Hero section
   - Features overview
   - Statistics
   - Call-to-action

2. **Dashboard**
   - Personal carbon score
   - Activity tracking
   - Carbon trend visualization
   - Recommendations
   - Recent activities

3. **Calculator**
   - Multi-category input forms
   - Real-time calculations
   - Emissions breakdown
   - Comparison with averages

4. **Actions**
   - Eco-friendly action library
   - Category filtering
   - Impact per action
   - Progress tracking

5. **Leaderboard**
   - Global rankings
   - Time period filtering
   - Regional rankings
   - Badge achievements

6. **Profile**
   - User statistics
   - Badge collection
   - Settings and preferences
   - Account management

## Backend Architecture

### Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

### API Structure
```
src/
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── activities.js
│   ├── footprint.js
│   ├── actions.js
│   ├── recommendations.js
│   ├── leaderboard.js
│   └── badges.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── activityController.js
│   └── ...
├── models/
│   └── database.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── services/
│   ├── carbonCalculator.js
│   ├── recommendationEngine.js
│   └── leaderboardService.js
├── config/
│   └── database.js
├── utils/
│   └── helpers.js
└── server.js
```

### Core Services

1. **Authentication Service**
   - User registration and login
   - JWT token generation and validation
   - Password hashing and verification

2. **Carbon Calculator Service**
   - Calculates emissions based on user inputs
   - Supports multiple categories:
     - Transportation (cars, flights, public transport)
     - Energy (electricity, natural gas)
     - Food (meat, vegetables)
     - Waste (recycling rate)

3. **Recommendation Engine**
   - Analyzes user behavior
   - Generates personalized recommendations
   - Prioritizes high-impact actions

4. **Leaderboard Service**
   - Calculates rankings based on emissions
   - Tracks carbon reduction percentage
   - Manages achievements and badges

5. **Activity Tracking Service**
   - Logs user activities
   - Calculates real-time carbon impact
   - Generates activity insights

## Database Schema

### Core Tables

1. **users**
   - User account information
   - Email, password (hashed), profile data

2. **carbon_baselines**
   - User's baseline emissions
   - Category-wise breakdown
   - Historical data

3. **activities**
   - User activity logs
   - Timestamp, category, carbon impact

4. **user_actions**
   - Completed eco-friendly actions
   - Impact tracking
   - Progress monitoring

5. **goals**
   - User-defined sustainability goals
   - Target emissions or reduction %
   - Goal status and timeline

6. **badges**
   - Achievement definitions
   - Badge metadata and requirements

7. **user_badges**
   - User's earned badges
   - Achievement tracking

## API Flow

### User Authentication Flow
```
1. User enters credentials
2. Frontend: POST /api/auth/login
3. Backend validates credentials
4. Backend generates JWT token
5. Frontend stores token (localStorage)
6. Frontend uses token in Authorization header
```

### Carbon Calculation Flow
```
1. User inputs activities
2. Frontend: POST /api/footprint/calculate
3. Backend:
   - Validates input data
   - Applies conversion factors
   - Calculates CO₂ for each category
   - Returns breakdown
4. Frontend displays results
```

### Activity Logging Flow
```
1. User logs an activity
2. Frontend: POST /api/activities
3. Backend:
   - Validates activity data
   - Calculates carbon impact
   - Stores in database
   - Updates baseline
   - Checks for badge requirements
4. Frontend updates dashboard
```

## Security Considerations

### Authentication
- JWT tokens with expiration
- Secure password hashing (bcryptjs)
- HTTPS-only in production

### Data Protection
- Input validation on backend
- SQL injection prevention (parameterized queries)
- CORS configuration
- Rate limiting

### Privacy
- User data encryption
- GDPR compliance measures
- Data export functionality
- Secure data deletion

## Scalability

### Horizontal Scaling
- Stateless backend servers
- Database connection pooling
- Redis caching layer
- Load balancing

### Performance Optimization
- Database indexing
- Query optimization
- Caching frequently accessed data
- Frontend code splitting

### Future Enhancements
- WebSocket for real-time updates
- Message queue for async tasks
- Microservices architecture
- GraphQL API option

## Deployment Architecture

### Production Stack
- **Frontend:** Vercel or Netlify CDN
- **Backend:** Docker containers on Kubernetes
- **Database:** Managed PostgreSQL service
- **Cache:** Redis Cloud
- **Monitoring:** CloudWatch or DataDog

### CI/CD Pipeline
```
Code Push → GitHub Actions → Tests → Build → Deploy
```

### Environment Stages
- Development (local)
- Staging (pre-production testing)
- Production (live)

## Monitoring and Logging

### Key Metrics
- API response time
- Database query performance
- User activity trends
- System resource usage

### Logging
- Application logs
- Error tracking (Sentry)
- User action audit logs
- Performance metrics

## Maintenance

### Regular Tasks
- Database backups
- Security updates
- Performance monitoring
- User support

### Upgrade Strategy
- Backward compatibility
- Feature flags for testing
- Gradual rollouts
- Rollback procedures

---

For more detailed information, see [API.md](API.md) and [SETUP.md](SETUP.md).
