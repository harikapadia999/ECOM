# JWT Authentication Implementation

## Overview

This implementation provides a complete JWT-based authentication system with access and refresh tokens, following security best practices.

## Features

- ✅ User registration with email verification
- ✅ Secure login with bcrypt password hashing
- ✅ JWT access tokens (15-minute expiry)
- ✅ Refresh tokens (7-day expiry)
- ✅ Token rotation on refresh
- ✅ Rate limiting on auth endpoints
- ✅ Role-based authorization
- ✅ Secure logout with token invalidation

## API Endpoints

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <accessToken>
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

## Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Token Security
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Tokens include issuer and audience claims
- Refresh tokens stored in database for validation
- Token rotation on refresh (old token invalidated)

### Rate Limiting
- 5 requests per 15 minutes for auth endpoints
- Prevents brute force attacks

### Database Security
- Passwords hashed with bcrypt (12 rounds)
- Refresh tokens indexed for fast lookup
- Cascade delete on user removal

## Usage in Protected Routes

```typescript
import { authenticate, authorize } from './utils/jwt';

// Require authentication
router.get('/protected', authenticate, (req, res) => {
  // req.user contains { userId, email, role }
  res.json({ user: req.user });
});

// Require specific role
router.post('/admin', authenticate, authorize('ADMIN'), (req, res) => {
  // Only admins can access
  res.json({ message: 'Admin access granted' });
});
```

## Environment Variables

```env
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
DATABASE_URL=postgresql://user:pass@localhost:5432/ecom
```

## Testing

Run the test suite:
```bash
pnpm test apps/api/tests/auth.test.ts
```

Tests cover:
- User registration (success and validation)
- Login (success and failure cases)
- Token refresh
- Protected route access
- Logout functionality

## Database Schema

```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  password      String
  name          String
  role          Role           @default(USER)
  emailVerified Boolean        @default(false)
  refreshTokens RefreshToken[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@index([email])
  @@map("users")
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([expiresAt])
  @@map("refresh_tokens")
}

enum Role {
  USER
  ADMIN
  SELLER
}
```

## Future Enhancements

- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub)
- [ ] Session management dashboard
- [ ] Suspicious activity detection

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.