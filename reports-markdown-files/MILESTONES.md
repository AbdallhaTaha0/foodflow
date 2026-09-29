# FoodFlow — MILESTONES.md

## M1 — Foundation

### Goal
Create the repository, development environment, architecture, tooling, and basic frontend/backend connectivity.

### Deliverables
- Separated frontend/backend applications.
- Next.js app.
- Express TypeScript app.
- Prisma configured.
- Neon PostgreSQL connection.
- Zod environment validation.
- Base error handling.
- Repository Pattern conventions.
- Shared documentation.
- Lint/typecheck scripts.

### Exit Criteria
Frontend can communicate with backend and backend can access the database successfully.

---

## M2 — Authentication & Users

### Goal
Implement secure authentication and role-aware authorization.

### Deliverables
- Registration.
- Login.
- Logout.
- Current-user endpoint.
- Password hashing.
- JWT cookies.
- Auth middleware.
- Role middleware.
- User/profile management.
- Rate limiting around authentication.

### Exit Criteria
Users can securely authenticate and protected endpoints reject unauthorized access.

---

## M3 — Restaurant & Menu

### Goal
Build the restaurant catalog.

### Deliverables
- Restaurant settings.
- Categories.
- Menu items.
- Availability.
- Images/media strategy.
- Manager CRUD.
- Public menu pages.
- Search/filter basics.

### Exit Criteria
Managers can maintain the menu and customers can browse it.

---

## M4 — Customer Ordering

### Goal
Implement the complete customer order lifecycle.

### Deliverables
- Cart.
- Checkout.
- Server-side price calculation.
- Order creation transaction.
- Order history.
- Order detail page.
- Cancellation rules.
- Validation and ownership checks.

### Exit Criteria
A customer can place a valid order and see its persisted state.

---

## M5 — Kitchen & Realtime

### Goal
Make FoodFlow feel like a real operational system.

### Deliverables
- Kitchen dashboard.
- Socket authentication.
- Restaurant-scoped rooms.
- Realtime new-order events.
- Realtime status events.
- Legal status transition rules.
- Customer order tracking.
- Reconnection/reconciliation behavior.

### Exit Criteria
Kitchen changes are persisted and appear to authorized clients in realtime.

---

## M6 — Admin, Analytics & UX

### Goal
Turn the functional prototype into a polished portfolio product.

### Deliverables
- Admin dashboard.
- Sales/order metrics.
- Menu analytics.
- Staff management.
- Responsive polish.
- Empty/loading/error states.
- Accessibility improvements.
- Notifications/toasts.
- Audit/activity history where useful.

### Exit Criteria
The major user journeys are complete and polished.

---

## M7 — Security, Testing & Deployment

### Goal
Prepare the project for public portfolio deployment.

### Deliverables
- Security audit.
- API tests.
- Repository/service tests.
- Critical E2E tests.
- Rate limiting.
- CORS/cookie hardening.
- Logging/monitoring.
- Production environment configuration.
- Vercel deployment.
- Render deployment.
- Neon production database.
- Production smoke tests.

### Exit Criteria
Production deployment works, critical flows are tested, and no known high-severity security issue remains.
