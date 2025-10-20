# Styling Approach for Insight Student

## Current Issue
The dashboard styles are not rendering correctly because Tailwind v4 handles CSS custom properties differently than v3. The syntax `text-[var(--gray-900)]` doesn't compile properly.

## Solution: Hybrid Approach

We'll use a **hybrid approach** that combines:
1. **Tailwind utilities** for layout (grid, flex, spacing, sizing)
2. **Custom CSS classes** for colors and theme-specific styles

This approach is:
- ✅ Cleaner and easier to read
- ✅ Better for learning (students see clear class names)
- ✅ More maintainable
- ✅ Works perfectly with Tailwind v4

## Examples

### ❌ Don't use (doesn't work in Tailwind v4):
```jsx
<h1 className="text-3xl font-bold text-[var(--gray-900)]">
```

### ✅ Do use:
```jsx
<h1 className="text-3xl font-bold text-gray-900">
```

Or with custom CSS:
```jsx
<h1 className="heading-1">
```

## Implementation Plan
1. Update `globals.css` with proper utility classes for colors
2. Update all components to use these classes instead of arbitrary values
3. Keep Tailwind for layout utilities (flex, grid, padding, margin, etc.)

