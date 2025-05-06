# Layout and Authentication Implementation

## Overview

This document describes the implementation of the base layout and authentication system for the Kanban Platform. These components form the fundamental structure of the application, providing navigation, adaptability to different devices, and a secure user authentication system.

## Base Layout

### Component Structure

The application follows a component structure based on Atomic Design:

- **Atoms**: Basic components such as buttons, inputs, etc.
- **Molecules**: Combinations of atoms like FormField, TaskCard, etc.
- **Organisms**: Complex components like Sidebar, Header, etc.
- **Templates**: Layouts like DashboardTemplate, AuthTemplate, etc.
- **Pages**: Final implementations like HomePage, BoardDetailPage, etc.

### Main Components

#### DashboardTemplate

This component defines the main structure of the application for authenticated users:

```tsx
// Basic structure
<div className="flex h-screen bg-background">
  <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

  <div className="flex flex-col flex-1 overflow-hidden">
    <Header toggleSidebar={toggleSidebar} />
    <MainContent>{children}</MainContent>
  </div>
</div>
```

- **Responsiveness**: Automatically detects screen size to show or hide the sidebar.
- **Flexibility**: Accepts any content as children for the main area.

#### Sidebar

Provides navigation between boards and application controls:

- List of available boards
- Creation of new boards
- Toggle to switch between light/dark theme
- Button to hide/show the sidebar

#### Header

Displays contextual information and relevant actions:

- Current board title
- User menu with account options
- Main actions such as adding tasks

#### AuthTemplate

Template for authentication pages:

- Login and registration forms
- Consistent styling for the authentication experience

## Authentication System

### Technologies Used

- **Supabase Auth**: Provides authentication services, sessions, and JWT tokens.
- **@supabase/ssr**: Supabase integration with Server-Side Rendering.
- **Next.js Middleware**: Route protection and redirects.

### Authentication Flow

1. **Registration**: Users can create an account with email and password.
2. **Login**: Authentication through credentials.
3. **Persistence**: Sessions are maintained through cookies.
4. **Protection**: Routes require authentication through middleware.
5. **Logout**: Secure termination of the session.

### Authentication Components

#### AuthProvider

Provides the authentication context to the entire application:

- Session state (`session`)
- User information (`user`)
- Loading states (`isLoading`)
- Error handling (`error`)
- Authentication methods (`signIn`, `signUp`, `signOut`)

#### Middleware

Protects application routes:

- Redirects unauthenticated users to the login page
- Redirects authenticated users away from auth pages
- Manages cookies to maintain the session

## Light/Dark Themes

The application supports light and dark themes through:

- **CSS Variables**: Defines colors and styles for each theme
- **ThemeProvider**: Manages theme state and provides methods to change it
- **Persistence**: Saves user preference in localStorage

## Next Steps

- Complete implementation of board management
- Development of components for columns and tasks
- Drag and drop functionality
