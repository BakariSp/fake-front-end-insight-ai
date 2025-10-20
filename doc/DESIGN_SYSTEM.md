# Insight Student - Design System

## Design Principles
1. **Clean & Minimal**: Focus on content with minimal distractions
2. **Educational**: Clear information hierarchy for learning contexts
3. **Accessible**: WCAG 2.1 AA compliant colors and interactions
4. **Consistent**: Unified visual language across all pages

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#4F7FFF` - Main brand color, active states, CTAs
- **Primary Blue Light**: `#E8EEFF` - Hover states, backgrounds
- **Primary Blue Dark**: `#3D65E0` - Pressed states

### Secondary Colors
- **Success Green**: `#52C41A` - Success states, positive actions
- **Success Green Light**: `#D4F4DD` - Success backgrounds
- **Warning Orange**: `#FAAD14` - Warnings, attention needed
- **Error Red**: `#FF4D4F` - Errors, destructive actions

### Neutral Colors
- **Gray 900** (Text Primary): `#1A1A1A`
- **Gray 700** (Text Secondary): `#4A4A4A`
- **Gray 500** (Text Tertiary): `#8C8C8C`
- **Gray 300** (Borders): `#D9D9D9`
- **Gray 100** (Backgrounds): `#F5F5F5`
- **Gray 50** (Light Backgrounds): `#FAFAFA`
- **White**: `#FFFFFF`

### Accent Colors
- **Purple**: `#9254DE` - Magic Toolkits theme
- **Cyan**: `#13C2C2` - Communication theme
- **Orange**: `#FA8C16` - Resource Library theme
- **Pink**: `#EB2F96` - Special highlights

---

## Typography

### Font Families
- **Primary**: 'Geist Sans', system-ui, -apple-system, sans-serif
- **Monospace**: 'Geist Mono', 'Courier New', monospace

### Font Sizes & Weights
- **Heading 1**: 32px / 700 - Page titles
- **Heading 2**: 24px / 600 - Section titles
- **Heading 3**: 20px / 600 - Card titles
- **Heading 4**: 16px / 600 - Subsection titles
- **Body Large**: 16px / 400 - Primary content
- **Body**: 14px / 400 - Standard content
- **Body Small**: 12px / 400 - Secondary content, captions
- **Label**: 14px / 500 - Form labels, buttons

### Line Heights
- **Tight**: 1.2 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.75 - Long-form content

---

## Spacing Scale
Based on 8px grid system:

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

---

## Border Radius
- **sm**: 4px - Buttons, inputs
- **md**: 8px - Cards, dropdowns
- **lg**: 12px - Modal dialogs
- **xl**: 16px - Large containers
- **full**: 9999px - Pills, avatars

---

## Shadows
- **sm**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Subtle elevation
- **md**: `0 4px 6px rgba(0, 0, 0, 0.07)` - Cards
- **lg**: `0 10px 15px rgba(0, 0, 0, 0.1)` - Dropdowns, popovers
- **xl**: `0 20px 25px rgba(0, 0, 0, 0.15)` - Modals

---

## Components

### Buttons
**Variants:**
- **Primary**: Blue background, white text
- **Secondary**: White background, blue border, blue text
- **Ghost**: Transparent background, hover state
- **Danger**: Red background, white text

**Sizes:**
- Small: 32px height, 12px padding
- Medium: 40px height, 16px padding
- Large: 48px height, 24px padding

### Cards
- Background: White
- Border: 1px solid Gray 300
- Border Radius: 8px
- Padding: 24px
- Shadow: sm (default), md (hover)

### Inputs
- Height: 40px
- Border: 1px solid Gray 300
- Border Radius: 4px
- Padding: 0 12px
- Focus: Blue border, blue shadow

### Navigation
- **Active**: Blue background, white text, left blue border (4px)
- **Hover**: Light blue background
- **Default**: Transparent, gray text

### Tables
- Header: Gray 50 background, 600 weight
- Row Border: Gray 300
- Row Hover: Gray 50 background
- Cell Padding: 16px

### Badges
- Border Radius: 4px
- Padding: 4px 8px
- Font Size: 12px
- Font Weight: 500

### Charts
- Primary Line: Blue gradient
- Grid Lines: Gray 300
- Tooltips: Dark background, white text, rounded

---

## Layout

### Sidebar (Left)
- Width: 240px
- Background: White
- Border Right: 1px solid Gray 300
- Padding: 24px 0

### Main Content
- Max Width: Flexible (remaining space)
- Padding: 32px
- Background: Gray 50

### Sidebar (Right)
- Width: 320px
- Background: White
- Border Left: 1px solid Gray 300
- Padding: 24px

### Container Max Widths
- Full: 100%
- XL: 1920px
- LG: 1440px

---

## Icons
- Library: Lucide React or similar
- Size: 20px (default), 16px (small), 24px (large)
- Stroke Width: 2px
- Color: Inherit from text color

---

## Animations & Transitions
- **Duration**: 200ms (fast), 300ms (default), 500ms (slow)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Hover**: Scale, shadow, background color
- **Focus**: Border color, shadow
- **Loading**: Spin, pulse

---

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Focus indicators on all interactive elements
- Keyboard navigation support
- ARIA labels for icon-only buttons
- Semantic HTML structure

---

## Responsive Design

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1440px
3xl: 1920px
```

### Responsive Behavior
- **Desktop (1440px+)**: Full layout with all sidebars
- **Tablet (768-1439px)**: Collapsible sidebars
- **Mobile (< 768px)**: Single column, drawer navigation

---

## States

### Interactive States
- **Default**: Base styling
- **Hover**: Lighter/darker background, scale transform
- **Active/Pressed**: Darker colors, scale down
- **Focus**: Blue outline, increased shadow
- **Disabled**: 50% opacity, no pointer events
- **Loading**: Pulse animation, spinner

### Data States
- **Empty**: Illustration + message
- **Loading**: Skeleton screens or spinners
- **Error**: Red message with icon
- **Success**: Green message with icon

---

## Best Practices

1. **Consistency**: Use design tokens for all values
2. **Hierarchy**: Clear visual distinction between elements
3. **Whitespace**: Generous spacing for readability
4. **Contrast**: Ensure text is readable on backgrounds
5. **Feedback**: Visual feedback for all interactions
6. **Performance**: Optimize images and animations
7. **Maintainability**: Component-based architecture

