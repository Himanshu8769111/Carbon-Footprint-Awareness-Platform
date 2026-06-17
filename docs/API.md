# Carbon Footprint Platform API Documentation

## Authentication

### Register User
`POST /api/auth/register`
- **Body**: `{ email, password, firstName, lastName }`
- **Success**: `201 Created` with user data and JWT token.

### Login User
`POST /api/auth/login`
- **Body**: `{ email, password }`
- **Success**: `200 OK` with user data and JWT token.

## Users

### Get Profile
`GET /api/users/profile`
- **Auth**: Required (Bearer Token)
- **Success**: `200 OK` with user profile details.

### Update Profile
`PUT /api/users/profile`
- **Auth**: Required (Bearer Token)
- **Body**: `{ firstName, lastName, bio, avatarUrl }` (All optional)
- **Success**: `200 OK` with updated user data.

## Carbon Footprint

### Save Baseline
`POST /api/footprint/baseline`
- **Auth**: Required (Bearer Token)
- **Body**: `{ annualEmissions, transportation, energy, food, waste }`
- **Success**: `201 Created` with saved baseline data.

### Get Baseline
`GET /api/footprint/baseline`
- **Auth**: Required (Bearer Token)
- **Success**: `200 OK` with user's carbon baseline.

## Leaderboard

### Get Global Leaderboard
`GET /api/leaderboard`
- **Success**: `200 OK` with top users ranked by lowest emissions.
