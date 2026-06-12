# API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
All endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth Routes `/api/auth`

#### Register
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```
- **Response:** `{ token, user }`

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response:** `{ token, user }`

### User Routes `/api/users`

#### Get Profile
- **GET** `/api/users/profile`
- **Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "url",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
- **PUT** `/api/users/profile`
- **Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "I'm committed to sustainability"
}
```

### Activities Routes `/api/activities`

#### Log Activity
- **POST** `/api/activities`
- **Body:**
```json
{
  "category": "Transportation",
  "type": "car_trip",
  "distance": 15,
  "description": "Commute to work"
}
```
- **Response:** `{ id, carbonImpact, timestamp }`

#### Get Activities
- **GET** `/api/activities?limit=50&offset=0`
- **Response:** `{ activities: [], total, limit, offset }`

#### Delete Activity
- **DELETE** `/api/activities/:id`

### Carbon Footprint Routes `/api/footprint`

#### Calculate Footprint
- **POST** `/api/footprint/calculate`
- **Body:**
```json
{
  "transportation": {
    "carMiles": 100,
    "flightHours": 5
  },
  "energy": {
    "electricityKwh": 800,
    "naturalGasTherm": 30
  },
  "food": {
    "meatServings": 7,
    "vegetarianMeals": 3
  }
}
```
- **Response:**
```json
{
  "total": 4.2,
  "breakdown": {
    "transportation": 1.2,
    "energy": 1.5,
    "food": 0.8,
    "waste": 0.7
  }
}
```

#### Get Footprint Trend
- **GET** `/api/footprint/trend?period=month`
- **Response:** `{ data: [], average, trend }`

### Actions Routes `/api/actions`

#### Get Available Actions
- **GET** `/api/actions?category=transportation`
- **Response:** `{ actions: [], total }`

#### Complete Action
- **POST** `/api/actions/:actionId/complete`
- **Body:**
```json
{
  "units": 1,
  "notes": "Used public transport today"
}
```

#### Get User Actions
- **GET** `/api/actions/user`
- **Response:** `{ completed: [], progress }`

### Recommendations Routes `/api/recommendations`

#### Get Personalized Recommendations
- **GET** `/api/recommendations`
- **Response:**
```json
{
  "recommendations": [
    {
      "id": "uuid",
      "title": "Switch to LED bulbs",
      "description": "...",
      "potentialSavings": "500 kg CO₂/year",
      "difficulty": "Easy",
      "category": "Energy"
    }
  ]
}
```

### Leaderboard Routes `/api/leaderboard`

#### Get Global Leaderboard
- **GET** `/api/leaderboard?period=month&limit=100`
- **Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "uuid",
      "name": "John Doe",
      "emissions": 2.1,
      "reduction": 65
    }
  ]
}
```

#### Get Regional Leaderboard
- **GET** `/api/leaderboard/region?region=US`

### Badges Routes `/api/badges`

#### Get Badges
- **GET** `/api/badges`
- **Response:** `{ badges: [] }`

#### Get User Badges
- **GET** `/api/badges/user`
- **Response:** `{ badges: [], progress }`

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": "..."
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "..."
}
```

## Rate Limiting
- 100 requests per minute per user
- Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Pagination
- Use `limit` and `offset` query parameters
- Max limit: 100
- Default limit: 20
