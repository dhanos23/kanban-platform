# Tailwind CSS 4 Theming Guide

## Theme System Configuration

In our Kanban Platform project, we've implemented a light/dark theme system using the new features of Tailwind CSS 4.

### Important Notes

1. **Changes in Tailwind CSS 4**:

   - In Tailwind CSS 4, configuration is primarily done through CSS, unlike previous versions that used `tailwind.config.js`.
   - The `@theme dark` directive doesn't work as you might expect. Instead, it's recommended to use `@custom-variant dark` along with classes or data attributes.

2. **Implemented Structure**:

   - We use `@custom-variant dark` to define when dark theme styles are applied
   - Dark styles are activated when the `.dark` class exists on the HTML element
   - CSS variables are defined in `@theme` and overridden using `@layer theme`

3. **Handling states like `:hover`**:
   - In Tailwind CSS 4, states like `:hover` within `@utility` can cause issues
   - The solution is to define these states using regular CSS outside the `@utility` directives
   - For example:

     ```css
     @utility tw-btn-primary {
       background-color: var(--color-primary);
       color: white;
       /* other properties... */
     }

     /* Hover states outside @utility */
     .tw-btn-primary:hover {
       background-color: var(--color-primary-light);
     }
     ```

### Implementation

Our system consists of:

- **CSS Variables**: Defined with `tw-` prefix to avoid conflicts
- **ThemeProvider**: React component that handles theme switching logic
- **Persistence**: Selected theme is saved in localStorage
- **Theme Toggle**: Available in the sidebar

## Code Structure

### globals.css

```css
@import "tailwindcss";

/* Define base theme variables */
@theme {
  /* Color Palette */
  --color-primary: #6339c7;
  --color-primary-light: #aba4ff;
  /* more colors... */

  /* Functional color definitions - Light Mode by default */
  --color-background: var(--color-light-fill);
  --color-background-light: var(--color-white);
  /* more variables... */
}

/* Define the dark variant to apply when the dark class is present */
@custom-variant dark (&:where(.dark, .dark *));

/* Override variables for dark theme using a class */
@layer theme {
  .dark {
    /* Color Palette - Dark Mode */
    --color-background: var(--color-charcoal);
    --color-background-light: var(--color-dark-gray);
    /* more variables... */
  }
}

/* Custom utilities */
@utility tw-btn-primary {
  background-color: var(--color-primary);
  color: white;
  /* more properties... */
}

/* Hover states with regular CSS */
.tw-btn-primary:hover {
  background-color: var(--color-primary-light);
}
```

### ThemeProvider.tsx

```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Retrieve saved theme from localStorage if it exists
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply the class to the html element to control the theme
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      if (theme === "dark") {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
      } else {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
      }

      // Save to localStorage for persistence
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

## Usage Example

To use components with themed styles:

```tsx
// Using classes that respond to theme
<div className="bg-background text-text-primary">
  Content that changes with theme
</div>

// Using custom utilities
<button className="tw-btn-primary">
  Button with themed style
</button>
```

## Troubleshooting

If you encounter issues with themes, check:

1. That the ThemeProvider is correctly wrapping your application
2. That the `.dark` and `.light` classes are being applied to the HTML element
3. That custom utilities are correctly defined
4. That states like `:hover` are defined outside the `@utility` directives
5. That you're using the context correctly, importing `useTheme` from the right place

## Common Issues

1. **Issues with `:hover` states**:
   If hover states don't work, make sure to define them outside `@utility` as regular CSS.

2. **Undefined context error**:

   ```
   TypeError: Cannot read properties of undefined (reading '$$typeof')
   ```

   This error usually occurs when the context is not available. Make sure to:

   - Import `useTheme` correctly
   - Use `useTheme` within components wrapped by `ThemeProvider`
   - Have the `"use client"` directive in files that use hooks

3. **Theme doesn't persist between reloads**:
   Verify that localStorage is working correctly and that the code is executed on the client side.

## References

- [Official Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Dark Mode Guide](https://tailwindcss.com/docs/dark-mode)
- [Theme Variables](https://tailwindcss.com/docs/theme)
