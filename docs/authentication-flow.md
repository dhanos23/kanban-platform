# Authentication Flow

## Overview

The authentication system of the Kanban Platform provides a secure and reliable way to manage users, protect routes, and maintain sessions. It is built on Supabase Auth, integrated with Next.js, and designed for a smooth experience.

## Flow Diagram

```
┌─────────┐     ┌───────────┐     ┌────────────┐     ┌─────────────┐
│  Login  │────►│ Supabase  │────►│  JWT Token │────►│ Cookies SSR │
└─────────┘     │   Auth    │     └────────────┘     └─────────────┘
                └───────────┘                               │
                      ▲                                     │
                      │                                     ▼
┌─────────┐           │                            ┌─────────────────┐
│ Sign Up │───────────┘                            │  AuthProvider   │
└─────────┘                                        └─────────────────┘
                                                           │
                                                           ▼
┌─────────────┐     ┌───────────────┐             ┌─────────────────┐
│  Protected  │◄────│   Middleware  │◄────────────│ Session Check   │
│   Routes    │     └───────────────┘             └─────────────────┘
└─────────────┘              │
                             │
┌─────────────┐              │
│   Public    │◄─────────────┘
│   Routes    │
└─────────────┘
```

## Main Components

### 1. Supabase Auth

Provides authentication services:

- Email/password based registration
- Credential-based login
- Session management with JWT
- Token handling and refreshing

### 2. AuthProvider

React component that:

- Maintains authentication state
- Provides methods to interact with Supabase Auth
- Manages errors and loading states
- Exposes current user information

```tsx
// Usage example
const { user, signIn, signOut, isLoading } = useAuth();

// Sign in
await signIn({ email, password });

// Check current user
if (user) {
  // User is authenticated
}
```

### 3. Next.js Middleware

Intercepts and processes all requests:

- Verifies authentication state
- Redirects as needed
- Manages cookies and sessions at server level

```tsx
// Middleware behavior
- Protected route + Not authenticated = Redirects to login
- Auth route + Authenticated = Redirects to dashboard
- Protected route + Authenticated = Allows access
- Public route = Allows access to all
```

## User Flows

### Registration

1. User enters email and password
2. Client calls `signUp` from AuthProvider
3. Supabase creates the user and optionally sends verification email
4. User is redirected to login or dashboard depending on configuration

### Login

1. User enters credentials
2. Client calls `signIn` from AuthProvider
3. Supabase authenticates and issues JWT
4. Token is stored in cookies
5. AuthProvider updates state with user information
6. User is redirected to dashboard

### Logout

1. User clicks "Sign out"
2. Client calls `signOut` from AuthProvider
3. Supabase invalidates the token
4. Cookies are removed
5. Authentication state is cleared
6. User is redirected to login

### Route Protection

1. User attempts to access a route
2. Middleware intercepts the request
3. Middleware verifies JWT token in cookies
4. If valid and route requires authentication, access is allowed
5. If not valid and route requires authentication, redirects to login
6. If valid and route is auth, redirects to dashboard

## Error Handling

The system handles various types of errors:

- Invalid credentials
- Connection issues
- Expired tokens
- Insufficient permissions

Each error is captured, logged, and displayed to the user in a friendly way.

## Security Considerations

- JWT tokens stored in cookies with HttpOnly attributes
- Data validation on both client and server
- Proper CORS policies
- Automatic token renewal
- Configured session expiration time

## Customization

The system is flexible and allows configurations such as:

- Session duration
- Password recovery options
- Additional authentication methods (future implementation)
- Email customization

## Next Steps

- Implement authentication with social providers (Google, GitHub)
- Add two-factor authentication
- Improve user profile management
