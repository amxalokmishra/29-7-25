# Expense Tracker Backend (Node.js + TypeScript + Express + TypeORM)

This is the backend codebase for the Expense Tracker web application. It provides a RESTful API to support expense submissions, approvals, and team-wide analytics with role-based access control.

---

## Table of Contents

- [Product Overview](#product-overview)
- [Technical Overview](#technical-overview)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Database Schema](#database-schema)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Seeded Test Users](#seeded-test-users)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Next Steps](#next-steps)

---

## Product Overview

The Expense Tracker system enables employees to submit expenses and allows admins to review, approve, or reject them. Admins can also view analytics showing expense distribution by category.

### Features

- Employees can:

  - Log in and view only their own expenses.
  - Submit expenses including amount, date, description, and category.
- Admins can:

  - View all submitted expenses.
  - Approve or reject pending expenses.
  - View analytics showing total spending by category across the team.

The application is designed to be straightforward for small teams, internal company tools, or bootstrapped businesses needing lightweight expense tracking.

---

## Technical Overview

### Tech Stack

- Node.js + Express (web framework)
- TypeScript (static typing)
- TypeORM (ORM for PostgreSQL)
- PostgreSQL (relational database)
- JWT (authentication)
- Jest + Supertest (testing framework)
- Swagger (API documentation)

### Architecture

The backend is modular and layered:

- **Controllers** handle incoming HTTP requests.
- **Services** contain business logic.
- **Entities** define database tables.
- **Middlewares** handle authentication, role checks, and errors.

### Roles

- `admin`: Can view all expenses, approve/reject, and access analytics.
- `employee`: Can only view and submit their own expenses.

---

## Getting Started

### Prerequisites

- Node.js >= 18.4.0
- PostgreSQL (locally or cloud)
- npm

### Installation

1. Clone the repository:

```bash
git clone <REPO_URL>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

5. Seed the database with test data:

```bash
npm run seed
```

---

## Environment Configuration

Example `.env` file:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=expense_tracker
JWT_SECRET=your_jwt_secret_key
```

---

## Database Schema

- **User**

  - id, name, email, password (hashed), role (admin/employee)
- **Expense**

  - id, userId (FK), amount, category, description, date, status (pending, approved, rejected)

---

## Available Scripts

```bash
npm run dev         # Start dev server with nodemon
npm run seed        # Truncate and insert test users + expenses
npm test            # Run all Jest tests
npm run build       # Compile TypeScript to JavaScript
npm start           # Start production server (after build)
```

---

## API Documentation

Swagger is available at:

```
http://localhost:4000/docs
```

All endpoints are documented, including authentication and role-based access.

---

## Seeded Test Users

You can use these for testing:

### Admin

- Email: `admin@example.com`
- Password: `admin123`

### Employees

- Email: `emp1@example.com`
- Password: `emp123`
- Email: `emp2@example.com`
- Password: `emp123`

---

## Project Structure

```
src/
│
├── app.ts                 # Express app setup
├── server.ts              # Entry point
│
├── config/                # DB and swagger config
├── controllers/           # Request handlers
├── entities/              # TypeORM entity models
├── middlewares/           # Auth, role-based, error middleware
├── routes/                # API route bindings
├── services/              # Business logic
├── seed/                  # Seeder script
├── tests/                 # Jest + Supertest tests
│
└── utils/                 # Helper functions (e.g. JWT)
```

---

## Testing

Tests are written using `Jest` and `Supertest`. Integration tests are included for:

- Authentication
- Expense creation
- Expense retrieval

Run all tests:

```bash
npm test
```

To watch in real time:

```bash
npm run test:watch
```

---

## Next Steps (To Do)

- Deploy backend to Render, Railway, or AWS (Elastic Beanstalk or EC2)
- Add CI/CD pipeline via GitHub Actions
- Add Dockerfile for containerization
- Enforce validation using class-validator or zod
- Expand tests to cover all edge cases

This backend is now ready to connect to the React + Redux frontend with full role-based interaction.
