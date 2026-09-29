# FoodFlow — SECURITY.md

## Security Baseline

Security is part of the architecture, not a final checklist.

## Authentication

- Passwords must be hashed using Argon2id or bcrypt with an appropriate cost.
- Never store plaintext passwords.
- JWTs must not be stored in localStorage/sessionStorage.
- Use HttpOnly cookies.
- Use Secure cookies in production.
- Configure SameSite deliberately based on deployment topology.
- Keep token lifetime limited.
- Implement logout by clearing the cookie and invalidating refresh credentials if refresh tokens are used.

## JWT

JWT payloads should contain minimal identity/authorization information.

Never put:
- passwords;
- secrets;
- sensitive personal data;
- mutable financial information

inside JWTs.

Validate:
- signature;
- expiration;
- issuer/audience where configured;
- token type;
- required claims.

## Authorization

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

Every protected resource must perform server-side authorization.

Check:
- user role;
- restaurant membership;
- resource ownership;
- action-specific permissions.

Never rely on hiding frontend controls.

## IDOR Protection

An endpoint such as:

```text
GET /orders/:id
```

must verify that the authenticated user is allowed to access that order.

Do not assume possession of an ID grants access.

## Input Validation

Use Zod at API boundaries.

Validate:
- body;
- params;
- query;
- relevant headers.

Reject unexpected or malformed input.

Do not trust client-provided:
- prices;
- totals;
- role;
- ownership;
- restaurant membership;
- order status.

## CSRF

Because authentication uses cookies, evaluate CSRF risk for state-changing requests.

Use an appropriate combination of:
- SameSite cookies;
- CSRF tokens where required;
- strict Origin/Referer validation where appropriate;
- careful CORS configuration.

Do not use `Access-Control-Allow-Origin: *` with credentialed requests.

## CORS

Allow only known frontend origins.

Do not allow arbitrary origins in production.

## Rate Limiting

Rate-limit:
- login;
- registration;
- password-related endpoints;
- sensitive mutation endpoints;
- expensive queries.

Use stronger limits for authentication endpoints.

## Headers

Use secure HTTP headers, typically through maintained middleware such as Helmet, while verifying compatibility with deployment.

Consider:
- Content-Security-Policy;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- frame protections.

## SQL / Prisma

Prisma reduces common SQL injection risks, but:
- avoid unsafe raw SQL;
- parameterize unavoidable raw queries;
- validate inputs;
- do not dynamically construct SQL from untrusted strings.

## Realtime Security

Authenticate Socket.IO connections.

Authorize every room/subscription.

A client must never be able to:
- subscribe to another customer's private order stream;
- join another restaurant's kitchen room;
- change an order status by directly emitting a trusted-looking event.

Prefer server-generated events after successful service operations.

## Realtime Consistency

Database state is authoritative.

Never make a socket event the only record of a business operation.

Flow:

```text
request
→ authenticate
→ authorize
→ validate
→ transaction
→ commit
→ emit
```

## Secrets

Never commit:
- JWT secrets;
- database URLs;
- API keys;
- private certificates;
- production credentials.

Use Vercel/Render/Neon secret management and local `.env` files excluded from Git.

## Logging

Do not log:
- passwords;
- JWTs;
- session cookies;
- sensitive personal information;
- full payment credentials.

Use structured logs.

Assign request/correlation IDs where practical.

## Error Handling

Clients should receive safe, useful errors.

Never expose:
- stack traces;
- database connection strings;
- Prisma internals;
- SQL;
- secret configuration.

Log diagnostic information server-side.

## Database Security

- Use least-privilege credentials where practical.
- Require TLS for production database connections.
- Apply migrations through controlled deployment workflows.
- Verify backup/restore options for the production database.

## File Uploads

If image/file uploads are introduced:
- validate MIME type and extension;
- enforce size limits;
- use generated filenames;
- avoid executing uploaded content;
- store files outside the application server when appropriate;
- use a trusted object-storage/image service.

## Dependency Security

- Keep dependencies updated.
- Review security advisories.
- Remove unused packages.
- Lock dependency versions.
- Run automated dependency/security checks.

## Security Testing

Before production:
- test unauthorized access;
- test cross-restaurant access;
- test role escalation;
- test invalid JWTs;
- test expired authentication;
- test CSRF assumptions;
- test rate limits;
- test malformed payloads;
- test websocket authorization;
- test order price tampering.

## Incident Response

If a secret is exposed:
1. Revoke/rotate it immediately.
2. Investigate usage.
3. Remove it from source/history where appropriate.
4. Deploy the replacement.
5. Document the incident.

If authentication compromise is suspected:
1. Rotate relevant signing/refresh secrets as appropriate.
2. Invalidate affected sessions.
3. Review logs.
4. Investigate unauthorized actions.

## Security Definition of Done

A feature is not security-complete until:
- inputs are validated;
- authorization is verified;
- sensitive data is protected;
- errors are sanitized;
- logs are safe;
- rate limits are considered;
- tests cover important abuse cases.
