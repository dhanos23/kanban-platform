# Backend and State Architecture

## Overview

This document describes the backend and state management architecture implemented in the Kanban Platform project. We use Supabase as our primary backend with a service layer, and Zustand for frontend state management.

## 1. Backend with Supabase

### 1.1 Database Schema

The Supabase database schema is structured as follows:

- **Boards**: Kanban boards that belong to a user.

  - `id`: UUID (primary key)
  - `title`: Text (board title)
  - `owner_id`: UUID (reference to auth.users)
  - `created_at`: Timestamp

- **Columns**: Columns within a board.

  - `id`: UUID (primary key)
  - `title`: Text (column title)
  - `board_id`: UUID (reference to boards)

- **Tasks**: Tasks assigned to a column.

  - `id`: UUID (primary key)
  - `title`: Text (task title)
  - `description`: Text (detailed description, nullable)
  - `status`: Text (task status, nullable)
  - `column_id`: UUID (reference to columns)

- **Subtasks**: Subtasks that belong to a main task.
  - `id`: UUID (primary key)
  - `title`: Text (subtask title)
  - `is_completed`: Boolean (completion status)
  - `task_id`: UUID (reference to tasks)

### 1.2 Security (RLS)

We've implemented Row Level Security (RLS) to ensure users can only access their own data:

- `boards` policies allow CRUD operations only to the owner (owner_id = auth.uid()).
- `columns` policies allow access only if the associated board belongs to the user.
- `tasks` policies allow access only if the associated column belongs to a board owned by the user.
- `subtasks` policies allow access only if the associated task belongs to a column of a board owned by the user.

### 1.3 API Services

We've implemented services for each entity that encapsulate communication with Supabase:

- **boardService**: Board management (CRUD)
- **columnService**: Column management (CRUD)
- **taskService**: Task management, including moving between columns
- **subtaskService**: Subtask management, including toggling completion

## 2. State Management with Zustand

We use Zustand for global state management in the frontend, offering a simple yet powerful API.

### 2.1 Stores

We've implemented three main stores:

- **authStore**: Manages user authentication and session state.

  - State: session, user, isLoading, error, isAuthenticated
  - Actions: signIn, signUp, signOut, refreshSession

- **themeStore**: Controls the application theme (light/dark).

  - State: theme
  - Actions: toggleTheme, setTheme

- **boardStore**: Manages boards, columns, tasks, and subtasks state.
  - State: boards, currentBoard, columns, tasks, subtasks, isLoading, error
  - Actions: CRUD for all entities, plus specific actions like moveTask and toggleSubtaskCompletion

### 2.2 Persistence

We've configured persistence for authentication and theme state using Zustand middleware, allowing these settings to persist between page reloads.

### 2.3 Custom Hooks

We've created custom hooks to facilitate the use of stores in components:

- `useAuth`: Provides access to authentication state and related functions
- `useTheme`: Manages and applies the current theme
- `useBoard`: Access to general board state
- `useBoardDetail`: Specific access to a board with its columns, tasks, and subtasks

## 3. Frontend-Backend Interaction

### 3.1 Data Flow

1. UI components use custom hooks to access state and actions
2. Store actions update local state and call API services
3. API services communicate with Supabase
4. Responses update state in stores
5. Components re-render with updated data

### 3.2 Benefits of this Approach

- **Separation of Concerns**: Components don't need to know how to communicate with Supabase
- **Reusability**: Services and hooks can be reused in different parts of the application
- **Testability**: Each layer can be tested in isolation
- **Maintainability**: It's easy to update or extend functionality without affecting other parts

## 4. Architectural Decisions

### 4.1 Supabase vs. Traditional REST API

We chose Supabase as our backend solution for several reasons:

- Built-in authentication and authorization
- Real-time capabilities
- Simplified database operations with RLS
- Reduced backend development time

### 4.2 Decision on GraphQL Implementation

During the development process, we evaluated the potential addition of GraphQL as a querying layer over Supabase. After careful consideration, we decided to defer this implementation for the following reasons:

- **Complexity-to-benefit ratio**: For the current project scope, adding GraphQL would introduce complexity without proportional benefits
- **Supabase query capabilities**: Supabase already offers powerful querying features, including nested relation queries
- **Development velocity**: Using Supabase directly allows for faster implementation of core features
- **Future extensibility**: We've designed the architecture in a way that GraphQL could be added later if needed

We plan to revisit this decision in future iterations if the application requires more complex querying patterns or if we need to reduce network overhead for deeply nested data.

## 5. Performance Considerations

- Data normalization in Zustand to avoid duplication
- On-demand loading for subtasks
- Optimistic UI updates for fluid interaction

## 6. Next Steps

- Implement complete authentication with Supabase
- Create UI components for boards, columns, and tasks
- Implement drag and drop functionality
- Add real-time collaboration
