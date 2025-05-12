# Typography System - DRY Implementation

## Overview

This document describes the typography system implemented in the Kanban Platform, which follows the DRY (Don't Repeat Yourself) principle using canonical typography presets.

## Problem Statement

Traditional approach led to:

- ❌ **Code duplication**: Same font-size values repeated across components
- ❌ **Inconsistency**: Slightly different sizes for similar elements
- ❌ **Maintenance burden**: Changing a size required updating multiple places
- ❌ **Large bundle**: Repeated CSS properties

## Solution: Canonical Typography Presets

We implemented a system inspired by [Dan Mall's approach](https://danmall.com/posts/typography-in-design-systems/) using numbered presets that contain complete typography definitions.

### The 6 Preset System

| Preset          | Size | Line Height | Weight          | Usage                                  |
| --------------- | ---- | ----------- | --------------- | -------------------------------------- |
| `text-preset-1` | 24px | 30px        | Bold            | Main headings (XL)                     |
| `text-preset-2` | 18px | 23px        | Bold            | Section headings (L)                   |
| `text-preset-3` | 15px | 19px        | Bold            | Subheadings (M), Primary Large buttons |
| `text-preset-4` | 12px | 15px        | Bold, Uppercase | Labels, category headings (S)          |
| `text-preset-5` | 13px | 23px        | Medium          | Body text, descriptions                |
| `text-preset-6` | 12px | 15px        | Bold            | UI text, buttons                       |

## Implementation Details

### 1. CSS Variables Foundation

```css
@theme {
  /* Raw values defined once */
  --heading-xl-size: 24px;
  --heading-xl-line: 30px;
  --heading-m-size: 15px;
  --heading-m-line: 19px;
  /* ... */
}
```

### 2. Canonical Presets

```css
@utility text-preset-1 {
  font-family: var(--font-plus-jakarta);
  font-size: var(--heading-xl-size);
  line-height: var(--heading-xl-line);
  font-weight: var(--font-weight-bold);
}

@utility text-preset-3 {
  font-family: var(--font-plus-jakarta);
  font-size: var(--heading-m-size);
  line-height: var(--heading-m-line);
  font-weight: var(--font-weight-bold);
}
```

### 3. Component Inheritance

```css
/* Buttons inherit complete typographic styles */
@utility btn-primary-large {
  @apply text-preset-3; /* ← Inherits all typography */

  /* Only button-specific properties */
  background-color: var(--color-main-purple);
  padding: 0 24px;
  height: 48px;
  border-radius: 24px;
}
```

### 4. Semantic Aliases

For better readability, we maintain semantic aliases:

```css
@utility text-heading-xl {
  @apply text-preset-1;
}
@utility text-heading-m {
  @apply text-preset-3;
}
@utility text-body-l {
  @apply text-preset-5;
}
```

## Benefits Achieved

### ✅ DRY Principle

- Typography values defined exactly once
- Zero duplication across the codebase
- Single source of truth for all text styles

### ✅ Consistency

- Impossible to have slightly different sizes
- All components using same preset are automatically consistent
- Design system integrity maintained

### ✅ Maintainability

```css
/* Change text-preset-3 affects: */
/* - All H3 headings */
/* - All primary large buttons */
/* - Any custom component using this preset */
@utility text-preset-3 {
  font-size: 16px; /* Changed from 15px */
  /* All dependents update automatically */
}
```

### ✅ Performance

- Reduced CSS bundle size
- Fewer duplicate declarations
- Better compression ratios

## Usage Guidelines

### For Developers

#### ✅ DO:

```css
.custom-element {
  @apply text-preset-3; /* Use existing preset */
  /* Add only non-typographic properties */
}
```

#### ❌ DON'T:

```css
.custom-element {
  font-size: 15px; /* Duplicates preset value */
  line-height: 19px; /* Creates inconsistency risk */
  font-weight: 700;
}
```

### For React Components

```tsx
// Heading component uses presets internally
<Heading level="m" /> // → text-preset-3

// Buttons automatically inherit typography
<Button variant="primary-large" /> // → text-preset-3
```

## Component Mapping

### Current Implementation

```
Heading.xl    → text-preset-1 (24px)
Heading.l     → text-preset-2 (18px)
Heading.m     → text-preset-3 (15px) ← Also used by btn-primary-large
Heading.s     → text-preset-4 (12px uppercase)
Body.l        → text-preset-5 (13px)
Body.m        → text-preset-6 (12px) ← Also used by small buttons
```

## Migration Example

### Before (Duplication)

```css
@utility text-heading-m {
  font-size: var(--heading-m-size);
  line-height: var(--heading-m-line);
  font-weight: var(--font-weight-bold);
}

@utility btn-primary-large {
  font-size: var(--heading-m-size); /* Duplicate */
  line-height: var(--heading-m-line); /* Duplicate */
  font-weight: var(--font-weight-bold); /* Duplicate */
  background-color: var(--color-primary);
}
```

### After (DRY)

```css
@utility text-preset-3 {
  font-size: var(--heading-m-size);
  line-height: var(--heading-m-line);
  font-weight: var(--font-weight-bold);
}

@utility text-heading-m {
  @apply text-preset-3;
}

@utility btn-primary-large {
  @apply text-preset-3; /* No duplication */
  background-color: var(--color-primary);
}
```

## Future Considerations

### Adding New Presets

1. Add new variables to `@theme`
2. Create `text-preset-7` following the pattern
3. Update documentation
4. Add to PostCSS safelist

### Preset Modifications

When modifying presets, consider:

- Impact on all components using that preset
- Visual hierarchy preservation
- Accessibility requirements (minimum sizes)

## References

- [Typography in Design Systems - Dan Mall](https://danmall.com/posts/typography-in-design-systems/)
- [DRY Principle in CSS](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)
- [Design Systems Typography Guide](https://www.designsystems.com/typography-guides/)
