# Drive Fleet Server

A lightweight Express.js backend for a car fleet booking application. It connects to MongoDB and uses JWT authentication with a remote JWKS endpoint for protected routes.

## Features

- Car listing with search and type filtering
- Featured cars endpoint
- Protected car details, create, update, and delete routes
- Booking creation, retrieval, and deletion
- Booking count increment for cars
- JWT verification via remote JWKS
- Ready for Vercel deployment

## Installation

1. Clone the repository or copy the project files.
2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
MONGO_URI=<your-mongodb-connection-string>
CLIENT_URL=<auth-client-base-url>
PORT=5000
```

- `MONGO_URI`: MongoDB connection string
- `CLIENT_URL`: Base URL of the authentication provider hosting `/api/auth/jwks`
- `PORT`: Optional port for the server (default is `5000`)

## Run Locally

```bash
node index.js
```

By default, the server listens on `http://localhost:5000`.

## API Endpoints

### Cars

- `GET /cars`
  - Optional query parameters:
    - `search` - search by car name
    - `type` - comma-separated car types
  - Example: `/cars?search=Toyota&type=SUV,sedan`

- `GET /cars/featured`
  - Returns up to 3 featured cars

- `GET /cars/:carID`
  - Protected route
  - Requires `Authorization: Bearer <token>`

- `POST /cars`
  - Protected route
  - Body: car object

- `PATCH /cars/:carID`
  - Protected route
  - Body: fields to update

- `DELETE /cars/:carID`
  - Protected route

- `PATCH /cars/:carID/increment-booking`
  - Unprotected route
  - Increments the car's `bookingCount`

### Bookings

- `POST /bookings`
  - Body: booking object

- `GET /bookings/:userID`
  - Protected route
  - Returns bookings for the specified user

- `DELETE /bookings/:bookingID`
  - Protected route

## Deployment

This project is configured for Vercel with `vercel.json` and uses `@vercel/node` to run `index.js` for all HTTP methods.

## Dependencies

- `express`
- `cors`
- `dotenv`
- `mongodb`
- `jose-cjs`

## Notes

- The MongoDB database is `DriveFleetDB`.
- Collections used:
  - `CarCollection`
  - `Bookings`
- JWT verification uses the JWKS endpoint at `${CLIENT_URL}/api/auth/jwks`.

## License

ISC
