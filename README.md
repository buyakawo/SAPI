# SAPI — Subscription Management API

A RESTful API built with Node.js and Express for managing users, subscriptions, and automated workflows. Features JWT authentication, rate limiting via Arcjet, and background job processing with Upstash.

---

## 🚀 Tech Stack

- **Runtime**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT)
- **Rate Limiting / Bot Protection**: Arcjet
- **Background Jobs / Queues**: Upstash

---

## 📁 Project Structure

```
sapi
├─ app.js                        # Entry point
├─ config
│  ├─ arcjet.js                  # Arcjet rate limiting config
│  ├─ env.js                     # Environment variable exports
│  └─ upstash.js                 # Upstash queue config
├─ controllers
│  ├─ auth.controller.js         # Login / register logic
│  ├─ subscription.controller.js # Subscription CRUD logic
│  ├─ user.controller.js         # User CRUD logic
│  └─ workflow.controller.js     # Workflow / job logic
├─ database
│  └─ mongodb.js                 # MongoDB connection
├─ middlewares
│  ├─ arcjet.middleware.js       # Rate limiting middleware
│  ├─ auth.middleware.js         # JWT authorization middleware
│  └─ error.middleware.js        # Global error handler
├─ models
│  ├─ subscription.model.js      # Subscription schema
│  └─ user.model.js              # User schema
└─ routes
   ├─ auth.routes.js             # /api/v1/auth
   ├─ subscription.routes.js     # /api/v1/subscriptions
   ├─ user.routes.js             # /api/v1/users
   └─ workflow.routes.js         # /api/v1/workflows
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/your-username/sapi.git
cd sapi
npm install
```

### Environment Variables

Create a `.env.developement/production` file in the root directory:

```env
PORT=5500
NODE_ENV=development

# MongoDB
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sapi

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Arcjet
ARCJET_ENV=development
ARCJET_KEY=your_arcjet_key

# Upstash
QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

---

## Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Obtain a token by logging in via `POST /api/v1/auth/sign-in`.

---

## 📡 API Endpoints

### Auth

| Method | Endpoint                | Description           | Auth |
| ------ | ----------------------- | --------------------- | ---- |
| POST   | `/api/v1/auth/sign-up`  | Register a new user   | ❌   |
| POST   | `/api/v1/auth/sign-in`  | Login and receive JWT | ❌   |
| POST   | `/api/v1/auth/sign-out` | Logout                | ✅   |

### Users

| Method | Endpoint            | Description    | Auth |
| ------ | ------------------- | -------------- | ---- |
| GET    | `/api/v1/users`     | Get all users  | ✅   |
| GET    | `/api/v1/users/:id` | Get user by ID | ✅   |
| PUT    | `/api/v1/users/:id` | Update user    | ✅   |
| DELETE | `/api/v1/users/:id` | Delete user    | ✅   |

### Subscriptions

| Method | Endpoint                    | Description            | Auth |
| ------ | --------------------------- | ---------------------- | ---- |
| GET    | `/api/v1/subscriptions`     | Get all subscriptions  | ✅   |
| GET    | `/api/v1/subscriptions/:id` | Get subscription by ID | ✅   |
| POST   | `/api/v1/subscriptions`     | Create a subscription  | ✅   |
| PUT    | `/api/v1/subscriptions/:id` | Update subscription    | ✅   |
| DELETE | `/api/v1/subscriptions/:id` | Cancel subscription    | ✅   |

### Workflows

| Method | Endpoint                                  | Description               | Auth |
| ------ | ----------------------------------------- | ------------------------- | ---- |
| POST   | `/api/v1/workflows/subscription/reminder` | Trigger reminder workflow | ✅   |

---

## 🛡️ Middleware

| Middleware             | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `auth.middleware.js`   | Validates JWT and attaches user to `req.user`  |
| `arcjet.middleware.js` | Rate limiting and bot protection on all routes |
| `error.middleware.js`  | Catches and formats unhandled errors globally  |

---

## 🧪 Testing the API

You can use [Postman](https://postman.com) or any HTTP client.

**Example — Register a user:**

```bash
curl -X POST http://localhost:5500/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "secret123"}'
```

**Example — Access a protected route:**

```bash
curl http://localhost:5500/api/v1/users \
  -H "Authorization: Bearer <your_token>"
```

---

## 📄 License

MIT
