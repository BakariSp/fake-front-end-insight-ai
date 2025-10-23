# Routing Structure

## Overview

All student pages have been organized under the `/student` route prefix for better scalability and separation of concerns. This structure makes it easy to add other user types (e.g., `/teacher`, `/admin`) in the future.

## Route Mapping

### Old Routes → New Routes

| Old Route | New Route | Description |
|-----------|-----------|-------------|
| `/` | `/` → redirects to `/student/dashboard` | Root redirects to student dashboard |
| `/dashboard` | `/student/dashboard` | Student dashboard |
| `/class` | `/student/class` | Class list page |
| `/class/[id]/overview` | `/student/class/[id]/overview` | Class overview |
| `/class/[id]/assignments` | `/student/class/[id]/assignments` | Class assignments list |
| `/class/[id]/assignments/[id]` | `/student/class/[id]/assignments/[id]` | Assignment detail |
| `/class/[id]/grades` | `/student/class/[id]/grades` | Student grades |
| `/class/[id]/materials` | `/student/class/[id]/materials` | Class materials |
| `/class/[id]/members` | `/student/class/[id]/members` | Class members |
| `/magic-tools` | `/student/magic-tools` | AI Magic Tools hub |
| `/magic-tools/ai-tutor` | `/student/magic-tools/ai-tutor` | AI Learning Tutor |
| `/magic-tools/mistake-analysis` | `/student/magic-tools/mistake-analysis` | Mistake Analysis |
| `/magic-tools/achievements` | `/student/magic-tools/achievements` | Achievement System |
| `/magic-tools/practice-generator` | `/student/magic-tools/practice-generator` | Practice Generator |
| `/magic-tools/wellness-chat` | `/student/magic-tools/wellness-chat` | Wellness Chat |
| `/magic-tools/performance` | `/student/magic-tools/performance` | Performance Dashboard |
| `/communication` | `/student/communication` | Communication center |
| `/resource-library` | `/student/resource-library` | Resource library |
| `/settings` | `/student/settings` | Settings page |

## File Structure

```
app/
├── page.tsx                    # Root - redirects to /student/dashboard
├── layout.tsx                  # Root layout with LanguageProvider
├── components/                 # Shared components
│   ├── layout/                # Layout components (Sidebar, TopNav, etc.)
│   └── ui/                    # UI components (Button, Card, etc.)
├── contexts/                   # React contexts
├── data/                       # Mock data
└── student/                    # Student section (all student pages)
    ├── dashboard/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── dashboard.module.css
    ├── class/
    │   ├── page.tsx            # Class list
    │   └── [classId]/          # Dynamic class routes
    │       ├── overview/
    │       ├── assignments/
    │       │   ├── page.tsx
    │       │   └── [assignmentId]/
    │       ├── grades/
    │       ├── materials/
    │       └── members/
    ├── magic-tools/
    │   ├── page.tsx            # Magic tools hub
    │   ├── layout.tsx
    │   ├── ai-tutor/
    │   ├── mistake-analysis/
    │   ├── achievements/
    │   ├── practice-generator/
    │   ├── wellness-chat/
    │   └── performance/
    ├── communication/
    ├── resource-library/
    └── settings/
```

## Benefits of This Structure

1. **Scalability**: Easy to add other user types (teacher, admin) as separate sections
2. **Organization**: Clear separation between different user roles
3. **Maintainability**: Related pages are grouped together
4. **Future-proof**: Supports multi-tenant or role-based routing patterns
5. **SEO-friendly**: Clear URL structure that's easy to understand

## Navigation Updates

All navigation components have been updated:

- **Sidebar** (`app/components/layout/Sidebar.tsx`): All nav items now point to `/student/*` routes
- **Dashboard page**: All internal links updated
- **Class pages**: All class-related links updated
- **Magic tools pages**: All cross-references updated
- **Assignment pages**: All navigation links updated

## Development Notes

- The path aliases in `tsconfig.json` remain unchanged and work with the new structure
- All components are imported using aliases like `@layout`, `@ui`, `@data`, etc.
- The routing is handled by Next.js App Router (file-based routing)
- No changes needed to environment variables or build configuration

## Testing Checklist

✓ Root `/` redirects to `/student/dashboard`
✓ Sidebar navigation works for all routes
✓ Class navigation and subpages work
✓ Magic tools navigation works
✓ Assignment detail pages work
✓ All cross-page links work correctly
✓ Dynamic routes work (classId, assignmentId)

## Future Enhancements

When adding new user types, follow this pattern:

```
app/
├── student/    # Existing student routes
├── teacher/    # Future teacher routes
│   ├── dashboard/
│   ├── classes/
│   └── ...
└── admin/      # Future admin routes
    ├── dashboard/
    ├── users/
    └── ...
```

Each section would have its own layout, sidebar, and navigation specific to that user type.

