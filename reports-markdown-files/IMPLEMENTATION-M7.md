# FoodFlow — IMPLEMENTATION-M7.md

## Objective
Harden and deploy FoodFlow.

## Security

Follow `SECURITY.md`.

Review:
- authentication;
- authorization;
- cookies;
- CORS;
- CSRF considerations;
- rate limiting;
- input validation;
- SQL/ORM safety;
- XSS;
- logging;
- secrets;
- file/media handling;
- IDOR;
- privilege escalation.

## Testing

Minimum critical coverage:
- auth;
- authorization;
- menu ownership;
- order pricing;
- order creation transaction;
- status transitions;
- realtime authorization.

Add API/integration tests and selected end-to-end tests.

## Deployment

### Frontend
Deploy Next.js to Vercel.

### Backend
Deploy Express + Socket.IO to Render.

### Database
Use Neon PostgreSQL.

Configure production environment variables only through platform secret management.

## Production Smoke Test

Verify:
1. Register.
2. Login.
3. Browse menu.
4. Place order.
5. Kitchen receives order.
6. Kitchen changes status.
7. Customer receives update.
8. Logout.
9. Unauthorized access is denied.
