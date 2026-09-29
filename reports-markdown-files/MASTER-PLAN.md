# FoodFlow — MASTER-PLAN.md

## Vision

Build FoodFlow as a polished restaurant platform that demonstrates professional full-stack engineering rather than a basic food-ordering CRUD application.

The platform has three primary experiences:

1. Customer application.
2. Kitchen/staff operational dashboard.
3. Restaurant/admin dashboard.

The central technical feature is real-time order lifecycle management.

## Product Goals

- Customers can discover menu items and place orders.
- Restaurant staff can process orders efficiently.
- Customers receive live order status updates.
- Restaurant managers can manage menu, staff, and operational data.
- Authentication and authorization are secure and role-aware.
- The codebase demonstrates modular architecture and the Repository Pattern.
- The application is deployable with a production-like stack.

## Non-Goals for V1

- Real payment processing.
- Multi-country tax systems.
- Complex delivery fleet optimization.
- Native mobile applications.
- AI recommendations.
- Marketplace support for unrelated restaurants.

## User Roles

### Customer
- Register/login/logout.
- Browse restaurant/menu.
- Manage cart.
- Place orders.
- Track orders.
- View order history.
- Manage profile.

### Kitchen Staff
- View incoming orders.
- Confirm orders.
- Move orders through preparation states.
- See relevant order details.
- Receive realtime updates.

### Restaurant Manager/Admin
- Manage restaurant information.
- Manage categories and menu items.
- Manage staff.
- View orders.
- View operational analytics.
- Configure restaurant settings.

## Core Modules

```text
Authentication
Users
Restaurants
Staff / Roles
Categories
Menu Items
Cart
Orders
Order Items
Realtime
Notifications
Analytics
Admin
```

## Architecture

```text
Next.js
  │
  ├── HTTP → Express REST API
  │             │
  │             ├── Zod
  │             ├── Auth middleware
  │             ├── Controllers
  │             ├── Services
  │             └── Repositories
  │                         │
  │                       Prisma
  │                         │
  │                      Neon PG
  │
  └── Socket.IO client ↔ Socket.IO server
```

## Deployment

```text
Frontend  → Vercel
Backend   → Render
Database  → Neon PostgreSQL
Realtime  → Socket.IO on Render
```

## Delivery Strategy

Build vertical slices rather than isolated technical layers. Each milestone should produce something demonstrable.

## Milestones

1. Foundation and architecture.
2. Database and authentication.
3. Restaurant/menu management.
4. Customer ordering flow.
5. Kitchen dashboard and realtime.
6. Admin/analytics/polish.
7. Security hardening, testing, deployment.

See `MILESTONES.md` and the corresponding milestone implementation files.
