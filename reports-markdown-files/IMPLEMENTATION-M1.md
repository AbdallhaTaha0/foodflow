# FoodFlow — IMPLEMENTATION-M1.md

## Objective
Create the technical foundation without implementing business features prematurely.

## Tasks

### Repository

```text
foodflow/
  frontend/
  backend/
  docs/
```

Keep frontend and backend independently runnable.

### Frontend

Create Next.js with:
- TypeScript strict mode.
- App Router.
- Tailwind CSS.
- ESLint.
- Environment variable handling.
- TanStack Query provider.
- Minimal API client abstraction.

### Backend

Create:
- Express application.
- `server.ts` for process startup.
- `app.ts` for Express configuration.
- `/health` endpoint.
- JSON parsing.
- CORS.
- centralized error middleware.

### Prisma

Create Prisma schema and initial connection.

Use a singleton Prisma client suitable for development hot reload.

### Configuration

Validate environment variables with Zod at startup.

Required examples:

```text
DATABASE_URL
JWT_ACCESS_SECRET
FRONTEND_URL
NODE_ENV
```

### Repository Pattern

Create the repository conventions and one simple repository implementation to prove the pattern.

### Completion

Verify:
- frontend starts;
- backend starts;
- database connection succeeds;
- health endpoint responds;
- TypeScript passes;
- lint passes.
