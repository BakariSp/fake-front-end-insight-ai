# Insight Student - Learning Management System

A modern, static learning management system for students built with Next.js 15, React 19, and Tailwind CSS 4.

## 🎯 Project Purpose

This project is **ONLY for mock and static pages**. 

### Main Goals
- Improve UI design and implementation
- Create logical connections between components and pages
- Support the development and learning of frontend developers/students
- Focus on static content and mock data
- Prioritize clean, educational code examples
- Emphasize UI/UX best practices

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
insight-student/
├── app/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── ...
│   │   └── layout/          # Layout components
│   │       ├── MainLayout.tsx
│   │       ├── Sidebar.tsx
│   │       └── RightSidebar.tsx
│   ├── data/
│   │   └── mockData.ts      # All mock data
│   ├── dashboard/           # Dashboard page
│   ├── class/               # Class-related pages
│   │   ├── [classId]/
│   │   │   └── overview/
│   │   ├── assignments/
│   │   ├── grades/
│   │   └── members/
│   ├── globals.css          # Global styles & design tokens
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page (redirects to dashboard)
├── public/                  # Static assets
├── DESIGN_SYSTEM.md         # Design system documentation
├── COMPONENTS_GUIDE.md      # Component usage guide
├── page-structure.md        # Page structure overview
└── product-requirements.md  # Product requirements (Chinese)
```

## 🎨 Design System

The project uses a comprehensive design system with:

- **Colors**: Primary, secondary, success, warning, error, and neutral palettes
- **Typography**: Geist Sans (primary) and Geist Mono (code)
- **Spacing**: 8px grid system (xs to 3xl)
- **Components**: Fully reusable UI component library
- **Responsive**: Optimized for 1440x908 (Mac) but works on all sizes

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

## 📦 Components

All components are fully typed with TypeScript and follow accessibility best practices:

### UI Components
- **Button** - Multiple variants and sizes
- **Card** - Container with consistent styling
- **Badge** - Status indicators
- **Input/Select** - Form controls
- **Avatar** - User avatars with fallbacks
- **Table** - Data tables with custom renders
- **Progress** - Progress bars
- **Chart** - Line charts for data visualization
- **Tabs** - Tabbed interfaces
- **EmptyState** - No data placeholders
- **StatCard** - Statistics display

### Layout Components
- **MainLayout** - Main application layout
- **Sidebar** - Left navigation
- **RightSidebar** - AI Assistant sidebar

See [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) for detailed usage.

## 📄 Pages

### ✅ Implemented (Part B & C)

#### B - Dashboard (`/dashboard`)
- Overview stats (assignments, grades)
- Quick access to classes
- Performance charts
- Recent announcements

#### C - Class Section
- **C0 - Overview** (`/class/[classId]/overview`)
  - Course description
  - Accuracy rate chart
  - Materials list
  - Assignment table

- **C1 - My Assignments** (`/class/assignments`)
  - Filterable assignment list
  - Status tabs (all, pending, submitted, graded)
  - Quick stats

- **C11 - Assignment Detail** (`/class/assignments/[id]`)
  - Three states: Unsent, Sent, Graded
  - File upload interface
  - AI grading results
  - Teacher feedback

- **C2 - My Grades** (`/class/grades`)
  - Grade history table
  - Performance charts
  - Subject analysis
  - AI insights

- **C3 - Class Members** (`/class/members`)
  - Teachers directory
  - Classmates list
  - Contact options

### 🚧 To Be Implemented

- D - Communication
- G - Magic Toolkits (AI Tools)
- H - Resource Library
- I - Settings

## 🎯 Key Features

### Current Implementation
✅ Fully responsive design  
✅ Design system with CSS variables  
✅ Reusable component library  
✅ Mock data for all pages  
✅ Dynamic routing  
✅ Type-safe with TypeScript  
✅ Accessible UI components  
✅ Smooth animations & transitions  

### Static Data
All data is mock/static from `app/data/mockData.ts`:
- Classes
- Assignments
- Grades
- Class members
- Announcements
- Chart data

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Fonts**: Geist Sans & Geist Mono

## 📱 Responsive Design

- **Desktop Large**: 1920px+
- **Desktop**: 1440px (primary target)
- **Tablet**: 768px - 1439px
- **Mobile**: < 768px

## 🎨 Color Palette

```css
/* Primary */
--primary-blue: #4F7FFF
--primary-blue-light: #E8EEFF

/* Status */
--success-green: #52C41A
--warning-orange: #FAAD14
--error-red: #FF4D4F

/* Neutrals */
--gray-900: #1A1A1A (text)
--gray-700: #4A4A4A
--gray-500: #8C8C8C
--gray-300: #D9D9D9 (borders)
--gray-100: #F5F5F5
--gray-50: #FAFAFA (background)
```

## 📚 Documentation

- [Design System](./DESIGN_SYSTEM.md) - Complete design system documentation
- [Components Guide](./COMPONENTS_GUIDE.md) - Component API and usage
- [Page Structure](./page-structure.md) - Page organization and routes
- [Product Requirements](./product-requirements.md) - Detailed requirements (Chinese)

## 🤝 Contributing

This is an educational project for learning purposes. Feel free to:
- Study the code structure
- Reuse components in your projects
- Suggest improvements
- Report issues

## 📝 Development Guidelines

1. **Use the Design System**: Always use CSS variables and design tokens
2. **Component Reusability**: Create reusable components when patterns emerge
3. **Type Safety**: Define TypeScript interfaces for all props
4. **Accessibility**: Ensure keyboard navigation and ARIA labels
5. **Code Quality**: Keep components small and focused
6. **Documentation**: Comment complex logic

## 🎓 Learning Resources

This project demonstrates:
- Modern Next.js App Router patterns
- Component-driven architecture
- Design system implementation
- TypeScript best practices
- Tailwind CSS v4 usage
- Responsive design techniques
- Accessibility considerations

## 📄 License

This is an educational project for learning purposes.

## 👥 Credits

- Design inspired by modern LMS platforms
- Built for frontend education and practice
- Mock data and static pages only

---

**Note**: This project contains NO backend, NO real API calls, and NO data persistence. It's purely for frontend demonstration and learning purposes.

For questions or suggestions, please refer to the documentation files or create an issue.
