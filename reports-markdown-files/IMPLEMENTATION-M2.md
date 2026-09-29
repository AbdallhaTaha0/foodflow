# FoodFlow — IMPLEMENTATION-M2.md

## Objective
Implement secure user identity and authorization.

## Tasks

1. Create User model.
2. Create role model/enums.
3. Add password hashing.
4. Implement registration.
5. Implement login.
6. Generate JWT.
7. Store JWT in HttpOnly cookie.
8. Implement logout.
9. Implement `/auth/me`.
10. Add auth middleware.
11. Add role/permission middleware.
12. Add user profile endpoints.
13. Add Zod validation schemas.
14. Add repository/service/controller separation.

## Cookie Baseline

Production cookie should use:
- `HttpOnly: true`
- `Secure: true`
- appropriate `SameSite`
- narrow path/domain where practical.

Do not expose the JWT to frontend JavaScript.

## Security

Protect against:
- user enumeration;
- brute force;
- weak passwords;
- privilege escalation;
- IDOR/ownership mistakes.

## Completion

Test:
- valid registration;
- duplicate email;
- invalid login;
- valid login;
- protected route;
- logout;
- role denial;
- expired/invalid token.
