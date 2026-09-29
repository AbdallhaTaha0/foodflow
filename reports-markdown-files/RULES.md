# FoodFlow — RULES.md

## 1. General Engineering Rules

1. TypeScript strict mode is mandatory.
2. Do not use `any` unless there is a documented, unavoidable reason.
3. Prefer small modules with explicit responsibilities.
4. Avoid premature abstractions.
5. Do not duplicate business rules across frontend and backend.
6. The backend is the source of truth for permissions, prices, totals, and order state.
7. Never commit secrets or real credentials.
8. Use environment variables for configuration.
9. Do not silently swallow errors.
10. Keep changes focused and reviewable.

## 2. Naming

- Components: `PascalCase`.
- Variables/functions: `camelCase`.
- Types/interfaces: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` when genuinely constant.
- Files should use a consistent naming convention.
- Database names must follow one convention consistently.

## 3. API Rules

- Version public APIs when appropriate.
- Validate body, query, and params with Zod.
- Return predictable status codes.
- Never return passwords, password hashes, refresh secrets, or raw tokens.
- Use pagination for unbounded collections.
- Never trust totals sent by the client.
- Use idempotency strategies where duplicate requests could create order problems.

## 4. Repository Rules

Repositories are the application-layer abstraction responsible for Prisma persistence.

Allowed:

```text
Service → Repository → Prisma
```

Avoid:

```text
Controller → Prisma
Service → Prisma everywhere
Socket handler → Prisma directly
```

A repository should not contain business decisions such as "a customer may only order from one restaurant." That belongs in the service/domain layer.

## 5. Order Rules

An order must record:
- customer;
- restaurant;
- ordered items;
- quantity;
- price at purchase time;
- subtotal;
- applicable fees/taxes/discounts;
- total;
- status;
- timestamps.

Do not calculate a final total from untrusted client values.

A normal status flow may be:

```text
PENDING
  ↓
CONFIRMED
  ↓
PREPARING
  ↓
READY
  ↓
COMPLETED
```

Cancelled orders must follow explicit cancellation rules.

## 6. Realtime Rules

- Socket.IO is for communication, not persistence.
- Authenticate sockets.
- Authorize room subscriptions.
- Never allow a client to emit an arbitrary order status.
- Server-side services decide whether a status transition is legal.
- Emit events only after successful persistence.
- Clients should reconcile important state with the API.

## 7. Frontend Rules

- Server Components by default.
- Client Components only when needed.
- Do not store JWTs in JavaScript-accessible storage.
- Use accessible controls.
- Every async view needs loading, success, empty, and error states where relevant.
- Do not expose internal backend implementation details in UI.

## 8. Database Rules

- Foreign keys are mandatory for relationships.
- Add unique constraints for business uniqueness.
- Add indexes for known frequent filters/joins.
- Use transactions for related writes.
- Never rely only on application code for critical integrity.

## 9. Git Rules

Use conventional commits where practical:

```text
feat:
fix:
refactor:
docs:
test:
chore:
security:
```

Do not mix unrelated features in one commit.

## 10. Review Checklist

Before merging:
- Is validation present?
- Is authorization present?
- Is ownership verified?
- Are database constraints correct?
- Are error cases handled?
- Are tests updated?
- Does realtime behavior remain consistent?
- Is sensitive information excluded from logs/responses?
- Is the UI responsive and accessible?
