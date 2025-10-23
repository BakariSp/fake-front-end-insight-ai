# Login Flow Visual Guide

## 🎯 Overview

The new login system features **2 separate portals** with a clean, simple, and efficient design.

---

## 📍 Page 1: Landing Page (`/login`)

```
┌─────────────────────────────────────────────────────────────┐
│                    🎓 InsightAI                             │
│                Education Platform                            │
│                                                              │
│         Welcome to InsightAI Education                       │
│         Select your portal to continue                       │
│                                                              │
│  ┌──────────────────┐      ┌──────────────────┐             │
│  │  [scenes.png]    │      │  [暂无权限.png]   │             │
│  │                  │      │                  │             │
│  │  Student &       │      │  Admin           │             │
│  │  Teacher Portal  │      │  Portal          │             │
│  │                  │      │                  │             │
│  │  Access classes, │      │  Manage users,   │             │
│  │  assignments...  │      │  settings...     │             │
│  │                  │      │                  │             │
│  │  👨‍🎓 Student      │      │  👔 Administrator│             │
│  │  👨‍🏫 Teacher      │      │                  │             │
│  │             →    │      │             →    │             │
│  └──────────────────┘      └──────────────────┘             │
│                                                              │
│         Need help? Contact Support                           │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Clean gradient background (Blue → Purple)
- Two clear portal options
- Visual illustrations for each portal
- Hover effects with arrow indicators

---

## 📍 Page 2A: Student & Teacher Portal (`/login/portal`)

### Step 1: Email Input

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                                                      │
│                                                              │
│  🎓 InsightAI                                                │
│  Student & Teacher Portal                                    │
│                                                              │
│  Progress: [1]───────[2]───────[3]                           │
│           Email    Role    Register/Login                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Enter Your Email                                  │     │
│  │  We'll check if you're a new or existing user     │     │
│  │                                                     │     │
│  │  Email                                             │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │ your.email@school.edu                     │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │                                                     │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │          Next →                           │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │                                                     │     │
│  │  💡 Try demo accounts:                            │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │ student@school.edu                        │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │ teacher@school.edu                        │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Role Selection

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                                                      │
│                                                              │
│  🎓 InsightAI                                                │
│  Student & Teacher Portal                                    │
│                                                              │
│  Progress: [✓]───────[2]───────[3]                           │
│           Email    Role    Register/Login                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  ← Back                                            │     │
│  │                                                     │     │
│  │  Select Your Role                                  │     │
│  │  How would you like to register?                   │     │
│  │                                                     │     │
│  │  ┌──────────────┐       ┌──────────────┐          │     │
│  │  │              │       │              │          │     │
│  │  │     👨‍🎓      │       │     👨‍🏫      │          │     │
│  │  │              │       │              │          │     │
│  │  │   Student    │       │   Teacher    │          │     │
│  │  │              │       │              │          │     │
│  │  │ Access classes│       │ Manage classes│         │     │
│  │  │ and complete │       │ and grade    │          │     │
│  │  │ assignments  │       │ assignments  │          │     │
│  │  │              │       │              │          │     │
│  │  └──────────────┘       └──────────────┘          │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Step 3A: Student Registration

```
┌─────────────────────────────────────────────────────────────┐
│  🎓 InsightAI                                                │
│  Student & Teacher Portal                                    │
│                                                              │
│  Progress: [✓]───────[✓]───────[3]                           │
│           Email    Role    Register                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  ← Back                                            │     │
│  │                                                     │     │
│  │  Register as Student                               │     │
│  │  📧 student@school.edu                             │     │
│  │                                                     │     │
│  │  School Code                                       │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │ Enter your school code                    │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │                                                     │     │
│  │  Class Code                                        │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │ Enter your class code                     │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │                                                     │     │
│  │  Password                                          │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │ Create a password                         │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │                                                     │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │     Complete Registration                 │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Step 3B: Teacher Registration

```
┌─────────────────────────────────────────────────────────────┐
│  Register as Teacher                                         │
│  📧 teacher@school.edu                                       │
│                                                              │
│  Teacher Verification Code                                   │
│  ┌─────────────────────────────────────────────┐            │
│  │ Enter verification code provided by admin    │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  Password                                                    │
│  ┌─────────────────────────────────────────────┐            │
│  │ Create a password                            │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │        Complete Registration                 │            │
│  └─────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Step 3C: Existing User Login

```
┌─────────────────────────────────────────────────────────────┐
│  Login as Student / Teacher                                  │
│  📧 student@school.edu                                       │
│                                                              │
│  Password                                                    │
│  ┌─────────────────────────────────────────────┐            │
│  │ Enter password                               │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  ☐ Remember me              Forgot password?                 │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │               Login                          │            │
│  └─────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📍 Page 2B: Admin Portal (`/login/admin`)

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                                                      │
│                                                              │
│  🔐 Admin Portal                                             │
│  Administrative Access Only                                  │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  ℹ️ This portal is for administrators only.       │     │
│  │     Please ensure you have proper credentials.     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Admin Email                                                 │
│  ┌─────────────────────────────────────────────┐            │
│  │ admin@school.edu                             │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  Password                                                    │
│  ┌─────────────────────────────────────────────┐            │
│  │ Enter password                               │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  ☐ Remember me              Forgot password?                 │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │           Admin Login                        │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 🔒 Secure connection established                   │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  🎭 Demo Accounts                                  │     │
│  │  ┌──────────────────────────────────────────┐     │     │
│  │  │ 👔 张校长 (Super Admin)                  │     │     │
│  │  │    admin@school.edu          Quick Login →│    │     │
│  │  └──────────────────────────────────────────┘     │     │
│  │  ┌──────────────────────────────────────────┐     │     │
│  │  │ 👔 李主任 (School Admin)                 │     │     │
│  │  │    schooladmin@school.edu    Quick Login →│    │     │
│  │  └──────────────────────────────────────────┘     │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Highlights

### Color Scheme

**Student & Teacher Portal:**
- Background: Blue (#4F7FFF) → Purple (#9254DE) gradient
- Cards: Clean white with shadow
- Accents: Primary blue

**Admin Portal:**
- Background: Dark navy (#1a1a2e) → Dark blue (#16213e) gradient
- Cards: Clean white with strong shadow
- Accents: Blue + Purple gradient for security elements

### Key Design Principles

1. **Clean**
   - Minimal clutter
   - Clear visual hierarchy
   - Focused attention

2. **Simple**
   - Intuitive flow
   - Clear instructions
   - Consistent patterns

3. **Efficient**
   - Quick demo access
   - Progress tracking
   - Minimal clicks

---

## 🔄 User Flows

### Flow 1: New Student Registration
```
/login 
  → Click "Student & Teacher Portal" 
  → /login/portal
  → Enter email (new)
  → Select "Student"
  → Enter school code
  → Enter class code
  → Create password
  → /student/dashboard ✓
```

### Flow 2: Existing Teacher Login
```
/login 
  → Click "Student & Teacher Portal"
  → /login/portal
  → Enter email (existing)
  → Select "Teacher"
  → Enter password
  → /teacher ✓
```

### Flow 3: Admin Login
```
/login
  → Click "Admin Portal"
  → /login/admin
  → Enter admin email
  → Enter password
  → /admin/dashboard ✓
```

---

## 🎯 Demo Accounts

### Students
- `student@school.edu` / `student123`
- `student2@school.edu` / `student123`

### Teachers
- `teacher@school.edu` / `teacher123`
- `teacher2@school.edu` / `teacher123`
- `teacher3@school.edu` / `teacher123`

### Admins
- `admin@school.edu` / `admin123` (Super Admin)
- `schooladmin@school.edu` / `admin123` (School Admin)
- `coordinator@school.edu` / `admin123` (Grade Coordinator)

---

## 📱 Responsive Design

The login system is fully responsive:

- **Desktop**: Two-column layout for portal cards
- **Tablet**: Single column, maintained spacing
- **Mobile**: Stacked layout, touch-friendly buttons

---

## 🌍 Multi-language Support

All text is translated in:
- ✅ English
- ✅ Simplified Chinese (简体中文)
- ✅ Traditional Chinese (繁體中文)

---

## 📁 File Locations

```
app/login/
├── page.tsx              # Landing page
├── login.module.css      # Landing styles
├── portal/
│   ├── page.tsx         # Student/Teacher portal
│   └── portal.module.css
└── admin/
    ├── page.tsx         # Admin portal
    └── admin.module.css
```

```
public/illustrations/
├── scenes.png           # Student/Teacher icon
├── 暂无权限.png          # Admin icon
└── [other error states]
```

```
messages/
├── en.json              # English translations
├── zh.json              # Simplified Chinese
└── zh-TW.json           # Traditional Chinese
```

---

## ✨ Features

- ✅ Dual portal system (Student/Teacher + Admin)
- ✅ Multi-step registration flow
- ✅ Progress indicator
- ✅ Demo account quick login
- ✅ Clean, modern UI
- ✅ Fully responsive
- ✅ Multi-language support
- ✅ Secure admin portal
- ✅ Visual illustrations
- ✅ Smooth animations

---

**Ready to use!** 🚀

Visit `/login` to start exploring the new login system.

