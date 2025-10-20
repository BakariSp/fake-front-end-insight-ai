# Insight Student - Page Structure

## Overview
This project contains static mock pages for a student learning management system. The design is optimized for 1440x908 resolution (Mac) but responsive to larger and smaller screens.

## Page Structure

### Main Layout
- **Left Sidebar** (240px fixed width)
  - School logo
  - User profile (avatar + name + role)
  - Main navigation menu
  
- **Main Content Area** (flexible width)
  - Dynamic page content based on route
  
- **Right Sidebar** (320px fixed width, optional per page)
  - AI Smart Assistant
  - Contextual information and actions

### Pages

#### 1. Dashboard (`/dashboard`)
- Overview of student's learning progress
- Quick stats and metrics
- Recent activities

#### 2. Magic Toolkits (`/magic-toolkits`)
- Learning tools and resources
- Interactive utilities

#### 3. Class Section (`/class`)
Main navigation with sub-pages:

##### 3.1 Overview (`/class/overview`)
- Course description
- Accuracy rate chart with date filter
- Materials list with action buttons
- Assignment table (Course Name, Class, Submission rate, Status, Details)

##### 3.2 Assignments (`/class/assignments`)
- List of all assignments
- Submission status tracking
- Grades and feedback

##### 3.3 Accuracy Rate (`/class/accuracy-rate`)
- Detailed analytics of student performance
- Charts and visualizations
- Question-level analysis

##### 3.4 Materials (`/class/materials`)
- Course materials and readings
- Downloadable resources
- Video lectures

##### 3.5 People (`/class/people`)
- Teacher information
- Classmates
- Communication options

#### 4. Communication (`/communication`)
- Messages and notifications
- Chat interface
- Announcements (NEW badge)

#### 5. Resource Library (`/resource-library`)
- Learning resources
- Reference materials
- External links

#### 6. Settings (`/settings`)
- Profile settings
- Preferences
- Account management

## Responsive Breakpoints
- Desktop Large: 1920px+
- Desktop: 1440px (primary target)
- Tablet: 768px - 1439px
- Mobile: < 768px

## Layout Behavior
- **Desktop (1440px+)**: Full 3-column layout
- **Tablet (768-1439px)**: Hide right sidebar, collapsible left sidebar
- **Mobile (< 768px)**: Bottom navigation, drawer-style sidebars

