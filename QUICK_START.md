# Quick Start Guide - Insight Student Platform

## 🚀 Get Running in 30 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
```

That's it! The app will automatically redirect to the dashboard.

---

## 📍 Quick Navigation

### Available Pages (Click or Type in Browser)

**Main Dashboard**
- `http://localhost:3000` → Auto redirects to dashboard
- `http://localhost:3000/dashboard` → Student dashboard

**Class Section**
- `http://localhost:3000/class/801/overview` → Class 801 Overview
- `http://localhost:3000/class/802/overview` → Class 802 Overview
- `http://localhost:3000/class/803/overview` → Class 803 Overview

**Assignments**
- `http://localhost:3000/class/assignments` → All assignments
- `http://localhost:3000/class/assignments/A20251012_001` → Unsent assignment
- `http://localhost:3000/class/assignments/A20251012_002` → Submitted assignment
- `http://localhost:3000/class/assignments/A20251010_003` → Graded assignment

**Grades & Members**
- `http://localhost:3000/class/grades` → My grades
- `http://localhost:3000/class/members` → Class members

---

## 🎨 Design System Quick Reference

### Colors (CSS Variables)
```css
/* Use in your code */
var(--primary-blue)       /* #4F7FFF */
var(--success-green)      /* #52C41A */
var(--warning-orange)     /* #FAAD14 */
var(--error-red)          /* #FF4D4F */
var(--gray-900)           /* Text primary */
var(--gray-700)           /* Text secondary */
```

### Spacing Scale
```
xs:  4px   sm:  8px   md: 16px
lg: 24px   xl: 32px  2xl: 48px
```

### Component Imports
```tsx
// Import any component
import { Button, Card, Badge, Table } from '@/app/components/ui';

// Use it
<Button variant="primary">Click Me</Button>
```

---

## 🧩 Component Cheat Sheet

### Button
```tsx
<Button variant="primary" size="medium">Label</Button>
// variants: primary | secondary | ghost | danger
// sizes: small | medium | large
```

### Card
```tsx
<Card padding="medium" hover>Content</Card>
// padding: none | small | medium | large
```

### Badge
```tsx
<Badge variant="success">Active</Badge>
// variants: success | warning | error | info | default | new
```

### Table
```tsx
const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'score', title: 'Score', dataIndex: 'score' },
];
<Table columns={columns} data={data} />
```

### Chart
```tsx
const data = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 72 },
];
<Chart data={data} height={240} />
```

---

## 📁 File Locations

### Need to Edit...

**Mock Data?**
→ `app/data/mockData.ts`

**Global Styles?**
→ `app/globals.css`

**Sidebar Navigation?**
→ `app/components/layout/Sidebar.tsx`

**UI Components?**
→ `app/components/ui/[ComponentName].tsx`

**Page Content?**
→ `app/[page-name]/page.tsx`

---

## 🎯 Common Tasks

### Add a New Page
```tsx
// 1. Create folder: app/my-page/
// 2. Create file: app/my-page/page.tsx

'use client';
import MainLayout from '../components/layout/MainLayout';

export default function MyPage() {
  return (
    <MainLayout>
      <h1>My Page</h1>
    </MainLayout>
  );
}
```

### Add Mock Data
```tsx
// In app/data/mockData.ts
export const myNewData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// In your page
import { myNewData } from '@/app/data/mockData';
```

### Create a New Component
```tsx
// In app/components/ui/MyComponent.tsx
import React from 'react';

export interface MyComponentProps {
  title: string;
  children: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, children }) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;

// Export from index.ts
// In app/components/ui/index.ts
export { default as MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

---

## 🔍 Debugging Tips

### Page Not Loading?
1. Check browser console for errors
2. Verify file path matches route
3. Check for TypeScript errors in terminal

### Styles Not Working?
1. Verify CSS variable names
2. Check Tailwind class names
3. Ensure `globals.css` is imported

### Component Not Updating?
1. Check if using 'use client' directive
2. Verify state management
3. Check console for React warnings

---

## 📚 Documentation Files

- **README.md** - Project overview and setup
- **DESIGN_SYSTEM.md** - Complete design system
- **COMPONENTS_GUIDE.md** - Component documentation
- **page-structure.md** - Page organization
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **product-requirements.md** - Requirements (Chinese)

---

## 💡 Quick Tips

1. **All pages use MainLayout** - Consistent header, sidebars, navigation
2. **All data is in mockData.ts** - Easy to find and modify
3. **All colors use CSS vars** - Consistent theming
4. **All components are typed** - TypeScript helps you
5. **All routes are dynamic** - Use params for IDs

---

## ⌨️ Keyboard Shortcuts (Browser)

- `Ctrl/Cmd + K` - Browser search
- `Ctrl/Cmd + R` - Reload page
- `F12` - Open DevTools
- `Ctrl/Cmd + Shift + C` - Inspect element

---

## 🎨 Design Preview

### Desktop Layout (1440x908)
```
┌─────────┬──────────────────────┬─────────┐
│         │                      │   AI    │
│ Sidebar │   Main Content       │ Smart   │
│  Nav    │   (Your Page)        │ Assist  │
│ (240px) │                      │ (320px) │
│         │                      │         │
└─────────┴──────────────────────┴─────────┘
```

### Page Structure Pattern
```
1. Breadcrumb Navigation
2. Page Header (Title + Description)
3. Action Bar (Filters, Buttons)
4. Content Area (Cards, Tables, Charts)
5. Footer Actions (if needed)
```

---

## 🚦 Traffic Light Status

✅ **Working** - Dashboard, Class pages, Assignments, Grades, Members  
🚧 **Todo** - Communication, Magic Tools, Resources, Settings  
❌ **Not Planned** - Backend, Authentication, Real API  

---

## 📞 Need Help?

1. Check the documentation files listed above
2. Look at existing pages for examples
3. Search for similar components in `app/components/ui/`
4. Check TypeScript errors in terminal

---

**Happy Coding! 🎉**

Start with the dashboard and explore from there. All navigation links are functional!

