# Components Guide

This guide provides an overview of all reusable components in the Insight Student platform.

---

## UI Components

### Button
A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `fullWidth`: boolean
- `icon`: React.ReactNode
- All standard HTML button attributes

**Example:**
```tsx
import { Button } from '@/app/components/ui';

<Button variant="primary" size="medium">
  Click Me
</Button>

<Button variant="secondary" icon={<Icon />}>
  With Icon
</Button>
```

---

### Card
A container component with consistent styling.

**Props:**
- `padding`: 'none' | 'small' | 'medium' | 'large'
- `hover`: boolean (adds hover effect)
- `onClick`: () => void
- `className`: string

**Example:**
```tsx
import { Card } from '@/app/components/ui';

<Card padding="medium" hover>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

---

### Badge
Display status indicators and labels.

**Props:**
- `variant`: 'success' | 'warning' | 'error' | 'info' | 'default' | 'new'
- `children`: React.ReactNode

**Example:**
```tsx
import { Badge } from '@/app/components/ui';

<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="new">NEW</Badge>
```

---

### Input
Form input with label and error support.

**Props:**
- `label`: string
- `error`: string
- `fullWidth`: boolean
- `icon`: React.ReactNode
- All standard HTML input attributes

**Example:**
```tsx
import { Input } from '@/app/components/ui';

<Input 
  label="Email"
  type="email"
  placeholder="Enter your email"
  fullWidth
  icon={<EmailIcon />}
/>
```

---

### Select
Dropdown select component.

**Props:**
- `label`: string
- `error`: string
- `fullWidth`: boolean
- `options`: Array<{ value: string; label: string }>
- All standard HTML select attributes

**Example:**
```tsx
import { Select } from '@/app/components/ui';

<Select 
  label="Subject"
  options={[
    { value: 'math', label: 'Math' },
    { value: 'english', label: 'English' }
  ]}
  fullWidth
/>
```

---

### Avatar
Display user avatars with fallback support.

**Props:**
- `src`: string (image URL)
- `alt`: string
- `size`: 'small' | 'medium' | 'large'
- `name`: string (for initials fallback)

**Example:**
```tsx
import { Avatar } from '@/app/components/ui';

<Avatar 
  src="/avatars/user.jpg"
  name="John Doe"
  size="medium"
/>

// With initials fallback
<Avatar name="John Doe" size="large" />
```

---

### Table
Data table with customizable columns.

**Props:**
- `columns`: TableColumn[]
- `data`: any[]
- `hover`: boolean
- `className`: string

**Column Definition:**
```tsx
interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: any, index: number) => React.ReactNode;
}
```

**Example:**
```tsx
import { Table } from '@/app/components/ui';
import type { TableColumn } from '@/app/components/ui';

const columns: TableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
  {
    key: 'score',
    title: 'Score',
    dataIndex: 'score',
    align: 'center',
    render: (value) => <Badge>{value}</Badge>,
  },
];

const data = [
  { name: 'Assignment 1', score: 95 },
  { name: 'Assignment 2', score: 88 },
];

<Table columns={columns} data={data} hover />
```

---

### Progress
Progress bar with percentage display.

**Props:**
- `percent`: number (0-100)
- `showText`: boolean
- `color`: string (CSS color)
- `size`: 'small' | 'medium' | 'large'

**Example:**
```tsx
import { Progress } from '@/app/components/ui';

<Progress percent={75} showText />
<Progress percent={90} color="var(--success-green)" size="large" />
```

---

### Chart
Line chart for data visualization.

**Props:**
- `data`: ChartDataPoint[]
- `height`: number
- `color`: string
- `showTooltip`: boolean

**Data Format:**
```tsx
interface ChartDataPoint {
  label: string;
  value: number;
}
```

**Example:**
```tsx
import { Chart } from '@/app/components/ui';

const data = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 72 },
  { label: 'Wed', value: 80 },
];

<Chart data={data} height={240} showTooltip />
```

---

### Tabs
Tabbed interface component.

**Props:**
- `tabs`: Tab[]
- `defaultActiveKey`: string
- `className`: string

**Tab Definition:**
```tsx
interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}
```

**Example:**
```tsx
import { Tabs } from '@/app/components/ui';

const tabs = [
  {
    key: 'all',
    label: 'All Items',
    content: <div>All items content</div>,
  },
  {
    key: 'active',
    label: 'Active',
    icon: <Icon />,
    content: <div>Active items content</div>,
  },
];

<Tabs tabs={tabs} defaultActiveKey="all" />
```

---

### EmptyState
Display when no data is available.

**Props:**
- `icon`: React.ReactNode
- `title`: string
- `description`: string
- `action`: { label: string; onClick: () => void }

**Example:**
```tsx
import { EmptyState } from '@/app/components/ui';

<EmptyState
  icon={<Icon />}
  title="No assignments found"
  description="You don't have any assignments yet."
  action={{
    label: 'View All Classes',
    onClick: () => router.push('/classes'),
  }}
/>
```

---

### StatCard
Display statistics with optional trends.

**Props:**
- `title`: string
- `value`: string | number
- `icon`: React.ReactNode
- `trend`: { value: number; isPositive: boolean }
- `color`: string

**Example:**
```tsx
import { StatCard } from '@/app/components/ui';

<StatCard
  title="Average Score"
  value="88.5%"
  icon={<Icon />}
  color="var(--primary-blue)"
  trend={{ value: 5.2, isPositive: true }}
/>
```

---

## Layout Components

### MainLayout
Main application layout with sidebars.

**Props:**
- `children`: React.ReactNode
- `showRightSidebar`: boolean

**Example:**
```tsx
import MainLayout from '@/app/components/layout/MainLayout';

<MainLayout showRightSidebar={true}>
  <h1>Page Content</h1>
  {/* Your page content */}
</MainLayout>
```

---

### Sidebar
Left navigation sidebar (automatically included in MainLayout).

**Features:**
- Dynamic route highlighting
- Collapsible sub-menus
- User profile display
- School logo

---

### RightSidebar
AI Assistant sidebar (conditionally rendered in MainLayout).

**Features:**
- AI Smart Assistant widget
- Accuracy rate insights
- Quick stats
- Chat interface

---

## Design System Tokens

### Colors
Access via CSS variables:
```css
var(--primary-blue)
var(--primary-blue-light)
var(--success-green)
var(--warning-orange)
var(--error-red)
var(--gray-900) /* to gray-50 */
```

### Spacing
```css
var(--spacing-xs)  /* 4px */
var(--spacing-sm)  /* 8px */
var(--spacing-md)  /* 16px */
var(--spacing-lg)  /* 24px */
var(--spacing-xl)  /* 32px */
var(--spacing-2xl) /* 48px */
var(--spacing-3xl) /* 64px */
```

### Shadows
```css
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-xl)
```

### Border Radius
```css
var(--radius-sm) /* 4px */
var(--radius-md) /* 8px */
var(--radius-lg) /* 12px */
var(--radius-xl) /* 16px */
```

---

## Best Practices

1. **Consistency**: Always use design system tokens instead of hardcoded values
2. **Reusability**: Use existing components before creating new ones
3. **Accessibility**: Ensure all interactive elements are keyboard accessible
4. **Responsiveness**: Test components at different screen sizes
5. **Performance**: Use React.memo() for expensive components
6. **Type Safety**: Always define TypeScript interfaces for props

---

## Common Patterns

### Loading State
```tsx
const [loading, setLoading] = useState(false);

{loading ? (
  <div>Loading...</div>
) : (
  <YourComponent />
)}
```

### Error Handling
```tsx
const [error, setError] = useState<string | null>(null);

{error && (
  <div className="text-[var(--error-red)]">{error}</div>
)}
```

### Form Validation
```tsx
const [errors, setErrors] = useState({});

<Input 
  label="Email"
  error={errors.email}
  // ... other props
/>
```

---

## Mock Data

All mock data is centralized in `app/data/mockData.ts`:

- `mockClasses`: Class information
- `mockAssignments`: Assignment data
- `mockGrades`: Grade records
- `mockClassMembers`: Teachers and students
- `mockAnnouncements`: Notifications
- `mockAccuracyData`: Chart data
- `mockMaterials`: Course materials

**Usage:**
```tsx
import { mockAssignments, mockGrades } from '@/app/data/mockData';
```

---

## Page Structure

All pages follow this structure:

1. **Breadcrumb Navigation**
2. **Page Header** (title + description)
3. **Action Bar** (filters, buttons)
4. **Content Area** (cards, tables, etc.)
5. **Footer Actions** (if needed)

---

## Routing

Pages are organized following Next.js App Router conventions:

```
/dashboard
/class/[classId]/overview
/class/assignments
/class/assignments/[assignmentId]
/class/grades
/class/members
/communication
/magic-toolkits
/resource-library
/settings
```

---

For more information, refer to:
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Page Structure](./page-structure.md)
- [Product Requirements](./product-requirements.md)

