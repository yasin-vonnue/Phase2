# Security Review

## Risks Identified

| Risk                       | Protection                                            |
| -------------------------- | ----------------------------------------------------- |
| Oversized request bodies   | JSON body limit of 100 KB                             |
| Login brute-force attempts | Login rate limit: 20 requests per 15 minutes          |
| Missing security headers   | Helmet enabled                                        |
| Unrestricted CORS          | CORS restricted to `http://localhost:3000`            |
| Invalid inpu               | Server-side validation and allowlists                 |
| Unauthorized access        | JWT authentication, roles, and ownership checks       |
| SQL injection              | Prisma parameterized database queries                 |
| Information disclosure     | Centralized error handling with generic 500 responses |

## Security Tests

- Security headers
- CORS configuration
- Oversized request body return `413`
- Authentication and authorization

All tests pass.

## Residual Risks

- CORS is configured for local development.
- Rate limiting uses in-memory storage and would need a shared store for multiple servers.
- HTTPS/TLS is not configured in this development application.
- Dependencies should be monitored and updated regualarly.
- Production systems would require additional monitoring and security testing.
