# Contribution Guide

## Introduction

Thank you for your interest in contributing to the Kanban Platform project. This document provides guidelines and standards to ensure that the codebase remains clean, consistent, and maintainable.

## Environment Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Local Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd kanban-platform
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

## Code Standards

### Project Structure

The project follows an architecture based on [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) combined with a feature-based organization:

- `src/app`: Routes and pages (Next.js App Router)
- `src/components`: Reusable components (Atomic Design approach)
- `src/features`: Modules organized by functionality
- `src/hooks`: Global custom hooks
- `src/lib`: Utilities and configurations
- `src/store`: Global state management (Zustand)
- `src/types`: Global type definitions

### Code Conventions

- Use TypeScript in strict mode
- Follow the configured ESLint and Prettier rules
- Write tests for critical functionalities
- Document complex components and functions
- Avoid obsolete code or deprecated techniques
- Don't use `alert()` or leave unresolved TODOs

### Naming Conventions

- **Files/Folders**: PascalCase for components, camelCase for utils/hooks
- **Variables/Functions**: camelCase
- **Interfaces/Types**: PascalCase with 'I' prefix for interfaces (IUser)
- **Components**: PascalCase (TaskCard.tsx)
- **Constants**: UPPER_SNAKE_CASE

## Contribution Process

### Git Workflow

1. Create a branch from `develop` with the appropriate naming convention:

   - `feature/<name>` for new features
   - `fix/<name>` for corrections
   - `refactor/<name>` for refactorings
   - `docs/<name>` for documentation changes

2. Make your changes following the code conventions

3. Run tests and ensure they pass

   ```bash
   npm run test
   ```

4. Ensure linting is correct

   ```bash
   npm run lint
   ```

5. Create commit(s) with descriptive messages following our format:

   ```
   <type>(<scope>): <message>
   ```

   Types:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Formatting changes
   - `refactor`: Refactoring
   - `test`: Adding/modifying tests
   - `chore`: Maintenance tasks

   Examples:

   - `feat(modal): add task modal triggered from task card click`
   - `fix(auth): correct redirection after login`

6. Submit your Pull Request to `develop`

### Code Review

- PRs must be reviewed by at least one developer
- Respond to comments and make necessary changes
- Ensure CI checks pass

## UI/UX Standards

- Faithfully follow the Figma designs
- Ensure components are responsive
- Maintain a consistent UI (spacing, colors, typography)
- Implement accessibility standards (WCAG AA)

## Performance and Optimization

- Prioritize memoization and optimization where necessary
- Avoid unnecessary renders
- Optimize package size and image loading
- Consider performance on mobile devices

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Supabase Guide](https://supabase.io/docs)

## Code of Conduct

We expect all contributors to maintain a respectful and collaborative environment, considering different perspectives and experiences.
