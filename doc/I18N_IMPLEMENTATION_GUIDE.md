# i18n Implementation Guide

## Overview

This project uses **next-intl** for internationalization, providing seamless multi-language support across all pages and components.

### Supported Languages

- 🇺🇸 **English** (en) - Default
- 🇨🇳 **Chinese** (zh) - Simplified Chinese
- 🇪🇸 **Spanish** (es)

---

## Project Structure

```
insight-student/
├── i18n/
│   ├── config.ts           # Language configuration
│   └── request.ts          # i18n request handler
├── messages/
│   ├── en.json            # English translations
│   ├── zh.json            # Chinese translations
│   └── es.json            # Spanish translations
├── app/
│   ├── [locale]/          # Locale-aware pages
│   │   ├── layout.tsx     # Root layout with i18n provider
│   │   ├── page.tsx       # Home page
│   │   ├── dashboard/     # Dashboard pages
│   │   └── class/         # Class pages
│   ├── components/
│   │   └── ui/
│   │       └── LanguageSwitcher.tsx  # Language switcher component
│   └── data/
│       ├── mockData.ts              # Base mock data
│       └── mockDataTranslations.ts  # Translated mock data
├── middleware.ts          # i18n routing middleware
└── next.config.ts         # Next.js with i18n plugin
```

---

## Quick Start

### 1. Adding New Languages

**Step 1: Update i18n configuration**

Edit `i18n/config.ts`:

```typescript
export type Locale = 'en' | 'zh' | 'es' | 'fr'; // Add 'fr' for French

export const locales: Locale[] = ['en', 'zh', 'es', 'fr'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français' // Add French
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  es: '🇪🇸',
  fr: '🇫🇷' // Add French flag
};
```

**Step 2: Create translation file**

Create `messages/fr.json` with all translation keys (copy from `messages/en.json` as a template).

**Step 3: Update middleware**

Edit `middleware.ts` to include the new locale:

```typescript
export const config = {
  matcher: ['/', '/(zh|en|es|fr)/:path*'] // Add 'fr'
};
```

---

### 2. Using Translations in Components

#### Client Components

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav'); // Namespace from messages/*.json
  const locale = useLocale();

  return (
    <div>
      <h1>{t('dashboard')}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

#### Server Components

```typescript
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  const t = await getTranslations('nav');

  return (
    <div>
      <h1>{t('dashboard')}</h1>
    </div>
  );
}
```

#### Multiple Namespaces

```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const tClasses = useTranslations('classes');

  return (
    <div>
      <button>{t('save')}</button>
      <nav>{tNav('dashboard')}</nav>
      <h2>{tClasses('title')}</h2>
    </div>
  );
}
```

---

### 3. Adding New Translation Keys

**Step 1: Add to all language files**

Edit `messages/en.json`:
```json
{
  "newSection": {
    "title": "My New Section",
    "description": "This is a new section"
  }
}
```

Edit `messages/zh.json`:
```json
{
  "newSection": {
    "title": "我的新部分",
    "description": "这是一个新部分"
  }
}
```

Edit `messages/es.json`:
```json
{
  "newSection": {
    "title": "Mi Nueva Sección",
    "description": "Esta es una nueva sección"
  }
}
```

**Step 2: Use in component**

```typescript
const t = useTranslations('newSection');
return <h1>{t('title')}</h1>;
```

---

### 4. Translating Mock Data

#### Update Mock Data Translations

Edit `app/data/mockDataTranslations.ts`:

```typescript
export const classTranslations = {
  en: {
    '801': {
      name: 'Advanced Mathematics',
      progress: 'Chapter 1 Functions',
      subject: 'Math',
    },
    // ... more entries
  },
  zh: {
    '801': {
      name: '高等数学',
      progress: '第1章 函数',
      subject: '数学',
    },
    // ... more entries
  },
  es: {
    '801': {
      name: 'Matemáticas Avanzadas',
      progress: 'Capítulo 1 Funciones',
      subject: 'Matemáticas',
    },
    // ... more entries
  }
};
```

#### Use Translated Mock Data

```typescript
'use client';

import { useLocale } from 'next-intl';
import { mockClasses } from '@/app/data/mockData';
import { getTranslatedClass } from '@/app/data/mockDataTranslations';
import type { Locale } from '@/i18n/config';

export default function ClassList() {
  const locale = useLocale() as Locale;

  return (
    <div>
      {mockClasses.map((cls) => {
        const translated = getTranslatedClass(cls.id, locale);
        return (
          <div key={cls.id}>
            <h3>{translated.name}</h3>
            <p>{translated.subject}</p>
            <p>{translated.progress}</p>
          </div>
        );
      })}
    </div>
  );
}
```

---

### 5. Creating Locale-Aware Links

#### Using next/link

```typescript
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const locale = useLocale();

  return (
    <nav>
      <Link href={`/${locale}/dashboard`}>Dashboard</Link>
      <Link href={`/${locale}/class`}>Classes</Link>
      <Link href={`/${locale}/class/801/overview`}>Class 801</Link>
    </nav>
  );
}
```

#### Using useRouter

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function MyComponent() {
  const router = useRouter();
  const locale = useLocale();

  const navigateToDashboard = () => {
    router.push(`/${locale}/dashboard`);
  };

  return <button onClick={navigateToDashboard}>Go to Dashboard</button>;
}
```

---

### 6. Language Switcher Component

The `LanguageSwitcher` component is already implemented and can be used anywhere:

```typescript
import { LanguageSwitcher } from '@/app/components/ui';

export default function Header() {
  return (
    <header>
      <h1>My App</h1>
      <LanguageSwitcher />
    </header>
  );
}
```

The component automatically:
- Detects current locale
- Shows available languages
- Switches language by updating the URL
- Maintains the current page path

---

## URL Structure

All pages use locale prefixes:

```
/en/dashboard          → English dashboard
/zh/dashboard          → Chinese dashboard
/es/dashboard          → Spanish dashboard
/en/class/801/overview → English class overview
/zh/class/801/overview → Chinese class overview
```

### Redirects

- Accessing `/` redirects to `/en` (default locale)
- Accessing `/dashboard` redirects to `/en/dashboard`
- Invalid locales redirect to the default locale

---

## Translation File Structure

Each language file (`messages/*.json`) follows this structure:

```json
{
  "common": {
    "loading": "Loading...",
    "search": "Search",
    "save": "Save",
    "cancel": "Cancel"
  },
  "nav": {
    "dashboard": "Dashboard",
    "classes": "Classes",
    "assignments": "Assignments"
  },
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome back",
    "statistics": {
      "totalCourses": "Total Courses",
      "completedAssignments": "Completed Assignments"
    }
  }
}
```

### Nested Keys

Access nested translations using dot notation:

```typescript
const t = useTranslations('dashboard');
const title = t('statistics.totalCourses'); // "Total Courses"
```

---

## Best Practices

### 1. **Keep Translation Keys Consistent**

Ensure all language files have the same structure:

```json
// ✅ Good - All files have the same keys
en.json: { "common": { "save": "Save" } }
zh.json: { "common": { "save": "保存" } }
es.json: { "common": { "save": "Guardar" } }

// ❌ Bad - Missing keys
en.json: { "common": { "save": "Save", "cancel": "Cancel" } }
zh.json: { "common": { "save": "保存" } } // Missing "cancel"
```

### 2. **Use Namespaces**

Organize translations by feature/section:

```typescript
// ✅ Good
const tCommon = useTranslations('common');
const tDashboard = useTranslations('dashboard');

// ❌ Avoid flat structure
const t = useTranslations(); // Hard to manage
```

### 3. **Translate Mock Data Separately**

Keep UI translations in `messages/*.json` and content translations in `mockDataTranslations.ts`:

```typescript
// UI translations → messages/en.json
{ "assignments": { "title": "Assignments", "dueDate": "Due Date" } }

// Content translations → mockDataTranslations.ts
{
  assignmentTranslations: {
    en: { "A001": { title: "Chapter 1 Functions" } }
  }
}
```

### 4. **Always Include Locale in URLs**

```typescript
// ✅ Good
router.push(`/${locale}/dashboard`);

// ❌ Bad - Missing locale
router.push('/dashboard');
```

### 5. **Handle Plurals and Variables**

```json
{
  "items": "{count, plural, =0 {No items} one {1 item} other {# items}}"
}
```

```typescript
t('items', { count: 5 }); // "5 items"
```

---

## Testing Different Languages

### Method 1: Use Language Switcher

Click the language switcher in the UI (usually in TopNav).

### Method 2: Manual URL

Navigate to:
- `http://localhost:3000/en/dashboard` for English
- `http://localhost:3000/zh/dashboard` for Chinese
- `http://localhost:3000/es/dashboard` for Spanish

### Method 3: Browser Language

Set your browser's preferred language, and the app will detect it on first visit.

---

## Troubleshooting

### Issue: Translations not showing

**Solution:**
1. Check that the key exists in all language files
2. Verify the namespace is correct
3. Ensure the component is wrapped in `NextIntlClientProvider` (already done in layout)

### Issue: URL doesn't have locale prefix

**Solution:**
1. Check that middleware is running
2. Verify `middleware.ts` is in the root directory
3. Ensure the `matcher` pattern includes your route

### Issue: Language switcher doesn't work

**Solution:**
1. Check that the pathname includes the locale
2. Verify the `useRouter` from `next/navigation` is being used
3. Ensure all pages are under `app/[locale]` directory

### Issue: Mock data not translated

**Solution:**
1. Check that you're using `getTranslated*` functions
2. Verify the ID exists in `mockDataTranslations.ts`
3. Ensure locale is passed correctly

---

## Migration Checklist

When adding i18n to a new page:

- [ ] Move page to `app/[locale]/` directory
- [ ] Import `useTranslations` and `useLocale`
- [ ] Replace hard-coded strings with `t('key')`
- [ ] Update all links to include `/${locale}/`
- [ ] Update router.push calls to include locale
- [ ] Add translation keys to all language files
- [ ] Translate mock data if needed
- [ ] Test all supported languages

---

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js i18n Guide](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

---

## Support

For questions or issues with i18n implementation:
1. Check this guide first
2. Review the example pages in `app/[locale]/dashboard` and `app/[locale]/class`
3. Check the translation files in `messages/`
4. Review helper functions in `app/data/mockDataTranslations.ts`

---

**Last Updated:** October 20, 2025

