# Login System Documentation

## Overview

The login system has been redesigned with two separate portals following clean, simple, and efficient design principles:

1. **Student & Teacher Portal** - For students and teachers
2. **Admin Portal** - For administrators only

## Architecture

### Login Flow Structure

```
/login (Landing Page)
├── /login/portal (Student & Teacher Portal)
└── /login/admin (Admin Portal)
```

## Landing Page (`/login`)

The main entry point that presents users with two portal options:

### Features
- **Portal Selection**: Clear visual cards for each portal type
- **Visual Design**: Uses illustrations from `/public/illustrations/`
- **Responsive**: Adapts to mobile and desktop views
- **Accessibility**: Clear labels and keyboard navigation

### Portal Options

#### Student & Teacher Portal
- Target: Students and Teachers
- Icon: `scenes.png` illustration
- Route: `/login/portal`
- Features: Access to classes, assignments, and learning resources

#### Admin Portal
- Target: System administrators
- Icon: `暂无权限.png` illustration  
- Route: `/login/admin`
- Features: User management, class management, system settings

## Student & Teacher Portal (`/login/portal`)

A multi-step registration/login flow based on the user's email status.

### Step-by-Step Flow

#### Step 1: Email Input
- User enters their email address
- System checks if email exists in database
- Determines if user is new (registration) or existing (login)

#### Step 2: Role Selection
- User selects role: Student or Teacher
- Visual cards with clear descriptions
- Different flows for each role

#### Step 3: Verification/Login

**For New Students (Registration):**
- School Code input
- Class Code input
- Password creation
- Complete registration → redirect to `/student/dashboard`

**For New Teachers (Registration):**
- Teacher Verification Code input
- Password creation
- Complete registration → redirect to `/teacher`

**For Existing Users (Login):**
- Password input
- Remember me option
- Forgot password link
- Login → redirect to appropriate dashboard

### Progress Indicator
- Visual 3-step progress bar
- Shows: Email → Role → Registration/Login
- Active step highlighted
- Completed steps marked with checkmark

### Demo Accounts

**Students:**
- `student@school.edu` (password: `student123`)
- `student2@school.edu` (password: `student123`)

**Teachers:**
- `teacher@school.edu` (password: `teacher123`)
- `teacher2@school.edu` (password: `teacher123`)
- `teacher3@school.edu` (password: `teacher123`)

## Admin Portal (`/login/admin`)

A secure, dedicated login portal for administrators.

### Features
- **Security Notice**: Warning that portal is administrators-only
- **Dark Theme**: Distinctive dark gradient background
- **Simple Form**: Email and password only
- **Quick Login**: Demo accounts for testing

### Demo Accounts

**Admins:**
- `admin@school.edu` - Super Admin (password: `admin123`)
- `schooladmin@school.edu` - School Admin (password: `admin123`)
- `coordinator@school.edu` - Grade Coordinator (password: `admin123`)

## Design Principles

### Clean
- Minimal UI elements
- Clear visual hierarchy
- Focused user attention
- No unnecessary decorations

### Simple
- Intuitive navigation
- Clear labels and instructions
- Consistent patterns
- Easy to understand flow

### Efficient
- Quick access to demo accounts
- Progress indicator for multi-step flow
- Minimal clicks required
- Fast visual feedback

## Styling Approach

### Color Scheme

**Student & Teacher Portal:**
- Primary gradient: Blue to Purple (`#4F7FFF` to `#9254DE`)
- Background: Clean white cards
- Accents: Blue for active states

**Admin Portal:**
- Dark gradient: Navy to Dark Blue (`#1a1a2e` to `#16213e`)
- Background: Clean white cards
- Accents: Blue and Purple for security elements

### Typography
- Clear, readable fonts
- Proper hierarchy (H1 > H2 > Body)
- Consistent sizing

### Spacing
- Generous padding for readability
- Consistent gaps between elements
- Balanced whitespace

## Visual Assets

All illustrations are stored in `/public/illustrations/`:

- `scenes.png` - Student & Teacher portal icon
- `暂无权限.png` - Admin portal icon
- `404.png` - Error states
- `无网络.png` - Network error
- Other error state illustrations available

## Translation Support

All text is internationalized with support for:
- English (`en.json`)
- Simplified Chinese (`zh.json`)
- Traditional Chinese (`zh-TW.json`)

### Key Translation Namespaces
```javascript
t('login.welcomeTitle')
t('login.studentTeacherPortal')
t('login.adminPortal')
t('login.enterEmail')
t('login.selectRole')
// ... and more
```

## File Structure

```
app/login/
├── page.tsx                    # Landing page
├── login.module.css           # Landing page styles
├── portal/
│   ├── page.tsx              # Student/Teacher login
│   └── portal.module.css     # Portal styles
└── admin/
    ├── page.tsx              # Admin login
    └── admin.module.css      # Admin styles
```

## User Experience Flow

### New Student Registration
1. Visit `/login`
2. Click "Student & Teacher Portal"
3. Enter email (new)
4. Select "Student" role
5. Enter school code
6. Enter class code
7. Create password
8. → Redirected to `/student/dashboard`

### Existing Teacher Login
1. Visit `/login`
2. Click "Student & Teacher Portal"
3. Enter email (existing)
4. Select "Teacher" role
5. Enter password
6. → Redirected to `/teacher`

### Admin Login
1. Visit `/login`
2. Click "Admin Portal"
3. Enter admin email
4. Enter password
5. → Redirected to `/admin/dashboard`

## Security Considerations

### Mock Implementation
⚠️ **Important**: This is a MOCK implementation for UI/UX demonstration only.

In production, you would need:
- Real authentication backend
- Secure password hashing
- JWT/Session management
- CSRF protection
- Rate limiting
- Email verification
- 2FA support

### Current Mock Logic
```typescript
// Simple email check
const checkEmailExists = (email: string) => {
  const existingEmails = ['student@school.edu', 'teacher@school.edu'];
  return existingEmails.includes(email);
};
```

## Responsive Design

### Breakpoints

**Desktop (> 968px):**
- Two-column portal cards
- Full-width forms
- Generous spacing

**Tablet (640px - 968px):**
- Single-column portal cards
- Maintained spacing
- Adjusted font sizes

**Mobile (< 640px):**
- Stacked layouts
- Smaller progress indicators
- Compact forms
- Touch-friendly buttons

## Accessibility

- Semantic HTML
- Proper ARIA labels
- Keyboard navigation
- Focus states
- Color contrast compliance
- Screen reader friendly

## Future Enhancements

Potential improvements:
- Social login (Google, Microsoft)
- Biometric authentication
- Multi-factor authentication
- Password strength indicator
- Email verification flow
- Account recovery flow
- Terms of service acceptance
- CAPTCHA integration
- Login analytics
- Session management

## Testing

### Manual Testing Checklist
- [ ] Landing page loads correctly
- [ ] Portal cards are clickable
- [ ] Navigation works between pages
- [ ] Progress indicator updates correctly
- [ ] Form validation works
- [ ] Demo accounts can quick login
- [ ] Translations display correctly
- [ ] Responsive on mobile
- [ ] Back buttons work correctly
- [ ] Error states display properly

## Support

For questions or issues with the login system, refer to:
- Design System: `/doc/DESIGN_SYSTEM.md`
- Components Guide: `/doc/COMPONENTS_GUIDE.md`
- I18N Guide: `/doc/SIMPLE_I18N_GUIDE.md`

