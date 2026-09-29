# FoodFlow — AGENTS.md

## Purpose

FoodFlow is a production-style restaurant ordering and management platform built as a portfolio project. The application demonstrates modern full-stack TypeScript development, clean architecture, authentication, authorization, relational data modeling, and real-time order updates.

## Technology

### Frontend
- Next.js with App Router
- TypeScript
- Tailwind CSS
- TanStack Query
- Responsive, mobile-first UI

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- Socket.IO
- JWT authentication using HttpOnly cookies

### Infrastructure
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

## Architecture

Use a modular, layered backend:

```text
Route
  ↓
Validation Middleware (Zod)
  ↓
Authentication / Authorization Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
PostgreSQL
```

Controllers must remain thin. Business rules belong in services. Database access belongs in repositories. Prisma must not be called directly from controllers.

## Repository Pattern

Each persistence-heavy module should expose a repository abstraction.

Preferred structure:

```text
modules/orders/
  order.controller.ts
  order.service.ts
  order.repository.ts
  order.schema.ts
  order.routes.ts
```

Where useful, define an interface such as `IOrderRepository` and a Prisma implementation such as `PrismaOrderRepository`.

Repositories:
- contain persistence operations only;
- do not decide HTTP status codes;
- do not perform authorization;
- do not contain presentation logic.

Services:
- contain business rules;
- coordinate repositories;
- handle transactions through repository/database abstractions;
- may emit domain/realtime events through a dedicated realtime abstraction.

## Frontend Rules

- Prefer Server Components by default.
- Use Client Components only when interactivity or browser APIs require them.
- Keep server/client boundaries explicit.
- Use TanStack Query for server state.
- Avoid duplicating server state in global client state.
- Build reusable UI primitives before creating many one-off components.
- Keep feature-specific components near their feature.
- Use accessible semantic HTML.
- Design mobile-first.
- Use Tailwind.css for styling as possible you can.

## Backend Rules

- Use Prisma 8.
- Every external request body/query/params that matters to business logic must be validated with Zod.
- Never trust client-provided roles, prices, totals, restaurant IDs, or ownership.
- Derive sensitive values on the server.
- Use centralized error handling.
- Use typed application errors.
- Keep environment configuration validated at startup.
- Use Prisma transactions for multi-write business operations.
- Never expose raw Prisma errors to clients.
- Add pagination to potentially large list endpoints.
- Add indexes based on actual query patterns.

## Authentication

- JWTs are stored in HttpOnly cookies, never localStorage.
- Passwords must be hashed with a modern password hashing algorithm such as Argon2id or bcrypt.
- Authentication and authorization are separate concerns.
- Authorization must be enforced server-side.
- Cookie configuration must be production-safe.
- See `SECURITY.md` for the complete security baseline.

## Realtime

Socket.IO is used for order status and operational updates.

Realtime events must not become a second source of truth. PostgreSQL remains authoritative.

Preferred flow:

```text
HTTP mutation
  ↓
Service
  ↓
Repository / transaction
  ↓
Database committed
  ↓
Realtime event emitted
  ↓
Connected clients update/refetch
```

Clients must not treat an unpersisted socket event as proof that a mutation succeeded.

## Data Integrity

- Monetary values must not use floating-point arithmetic for persistence.
- Prefer integer minor units or PostgreSQL Decimal where appropriate.
- Order item prices must preserve the price actually charged at purchase time.
- Historical orders must not change when a menu item is edited later.
- Use database constraints for uniqueness and referential integrity.
- Soft deletion should be used only where historical records require it; do not introduce it everywhere by default.

## API

Use consistent response/error shapes.

```json
{
  "success": true,
  "data": {}
}
```

Error example:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": {}
  }
}
```

Do not leak stack traces, SQL, Prisma internals, secrets, or authentication details.

## Testing

Prioritize:
1. Authentication and authorization.
2. Order creation and status transitions.
3. Price/total calculations.
4. Ownership checks.
5. Repository behavior.
6. Critical API validation.
7. Realtime event behavior.

## Definition of Done

A feature is not complete until:
- validation exists;
- authorization is checked;
- business logic is covered;
- database constraints are considered;
- error states are handled;
- loading/empty states exist in the UI;
- responsive behavior is verified;
- critical tests pass;
- documentation is updated.
