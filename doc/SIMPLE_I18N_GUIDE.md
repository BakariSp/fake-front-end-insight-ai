# Simple i18n Implementation Guide

## Overview

This project uses a **simple context-based approach** for internationalization (i18n). Language preference is stored in `localStorage` and can be changed instantly without page reload or URL changes.

### Supported Languages

- 🇺🇸 **English** (en) - Default
- 🇨🇳 **Chinese** (zh) - Simplified Chinese
- 🇪🇸 **Spanish** (es)

---

## How It Works

1. **Language Context**: A React Context (`LanguageContext`) provides language state and translation function
2. **LocalStorage**: User's language preference is persisted in browser localStorage
3. **Translation Files**: JSON files in `messages/` folder contain all translations
4. **No URL Changes**: Language changes don't affect URLs - all pages stay at their original paths

---

## Quick Start

### 1. Using Translations in Components

```typescript
'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>Current language: {language}</p>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### 2. Translation Function

The `t()` function supports nested keys using dot notation:

```typescript
const { t } = useLanguage();

// Simple key
t('common.loading')        // "Loading..."

// Nested key  
t('dashboard.title')       // "Dashboard"

// Deeply nested
t('dashboard.statistics.totalCourses')  // "Total Courses"
```

### 3. Translating Mock Data

For content like class names, assignments, etc., use the helper functions:

```typescript
'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { mockClasses } from '@/app/data/mockData';
import { getTranslatedClass } from '@/app/data/mockDataTranslations';

export default function ClassList() {
  const { language } = useLanguage();

  return (
    <div>
      {mockClasses.map((cls) => {
        const translated = getTranslatedClass(cls.id, language);
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

## Project Structure

```
app/
├── contexts/
│   └── LanguageContext.tsx    # Language context provider
├── components/
│   └── ui/
│       └── SimpleLanguageSwitcher.tsx  # Language switcher component
├── data/
│   ├── mockData.ts                     # Base mock data (IDs, dates, etc.)
│   └── mockDataTranslations.ts         # Translated content
└── layout.tsx                           # Root layout with LanguageProvider

messages/
├── en.json    # English translations
├── zh.json    # Chinese translations
└── es.json    # Spanish translations
```

---

## Adding New Translations

### Step 1: Add to Translation Files

Edit all three files: `messages/en.json`, `messages/zh.json`, `messages/es.json`

**messages/en.json:**
```json
{
  "mySection": {
    "title": "My New Section",
    "subtitle": "This is a subtitle"
  }
}
```

**messages/zh.json:**
```json
{
  "mySection": {
    "title": "我的新部分",
    "subtitle": "这是一个副标题"
  }
}
```

**messages/es.json:**
```json
{
  "mySection": {
    "title": "Mi Nueva Sección",
    "subtitle": "Este es un subtítulo"
  }
}
```

### Step 2: Use in Component

```typescript
const { t } = useLanguage();

return (
  <div>
    <h1>{t('mySection.title')}</h1>
    <p>{t('mySection.subtitle')}</p>
  </div>
);
```

---

## Adding New Mock Data Translations

### Step 1: Update mockDataTranslations.ts

```typescript
export const classTranslations = {
  en: {
    '804': {
      name: 'Chemistry Basics',
      progress: 'Chapter 3 Reactions',
      subject: 'Chemistry',
    },
  },
  zh: {
    '804': {
      name: '化学基础',
      progress: '第3章 反应',
      subject: '化学',
    },
  },
  es: {
    '804': {
      name: 'Química Básica',
      progress: 'Capítulo 3 Reacciones',
      subject: 'Química',
    },
  },
};
```

### Step 2: Use in Component

```typescript
const { language } = useLanguage();
const translated = getTranslatedClass('804', language);

console.log(translated.name);  // "Chemistry Basics" / "化学基础" / "Química Básica"
```

---

## Language Switcher

The language switcher is already integrated in `TopNav`. You can also use it anywhere:

```typescript
import { LanguageSwitcher } from '@/app/components/ui';

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <LanguageSwitcher />
    </div>
  );
}
```

---

## Example: Converting a Page to Support i18n

### Before (Hard-coded English):

```typescript
'use client';

export default function MyPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back!</p>
      <button>Save Changes</button>
    </div>
  );
}
```

### After (Multi-language):

```typescript
'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function MyPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.welcome')}</p>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

---

## Best Practices

### 1. Organize Translations by Section

```json
{
  "common": { "save": "Save", "cancel": "Cancel" },
  "dashboard": { "title": "Dashboard" },
  "classes": { "title": "Classes" }
}
```

### 2. Keep Translation Keys Consistent

Ensure all language files have the same structure:

✅ **Good:**
```json
// en.json
{ "common": { "save": "Save" } }
// zh.json  
{ "common": { "save": "保存" } }
```

❌ **Bad:**
```json
// en.json
{ "common": { "save": "Save" } }
// zh.json - missing "save" key!
{ "common": { "cancel": "取消" } }
```

### 3. Separate UI and Content Translations

- **UI translations** (buttons, labels, etc.) → `messages/*.json`
- **Content translations** (class names, assignments, etc.) → `mockDataTranslations.ts`

### 4. Use Descriptive Keys

```typescript
// ✅ Good - Clear and specific
t('dashboard.statistics.totalCourses')

// ❌ Bad - Too generic
t('total')
```

---

## Available Helper Functions

### For Mock Data:

```typescript
import { 
  getTranslatedClass,
  getTranslatedAssignment, 
  getTranslatedMaterial,
  getTranslatedAnnouncement 
} from '@/app/data/mockDataTranslations';

const { language } = useLanguage();

// Get translated class info
const classInfo = getTranslatedClass('801', language);
// Returns: { name: '...', progress: '...', subject: '...' }

// Get translated assignment
const assignment = getTranslatedAssignment('A20251012_001', language);
// Returns: { title: '...', subject: '...' }

// Get translated material
const material = getTranslatedMaterial('M001', language);
// Returns: { title: '...', description: '...', subject: '...' }

// Get translated announcement
const announcement = getTranslatedAnnouncement('ANN001', language);
// Returns: { title: '...', content: '...' }
```

---

## Testing Languages

### Method 1: Use Language Switcher

Click the language switcher (flag icon) in the top navigation bar.

### Method 2: Set Default in Browser

Open browser console and run:
```javascript
localStorage.setItem('language', 'zh');  // or 'es', 'en'
location.reload();
```

### Method 3: Clear Language Preference

```javascript
localStorage.removeItem('language');
location.reload();  // Will use default (English)
```

---

## Troubleshooting

### Issue: Translations not showing

**Solution:**
1. Check that the key exists in all three language files
2. Verify the component is wrapped in `LanguageProvider` (should be automatic via root layout)
3. Check browser console for warnings about missing keys

### Issue: Mock data not translated

**Solution:**
1. Ensure you're using the helper functions (`getTranslated*`)
2. Verify the ID exists in `mockDataTranslations.ts`
3. Check that you're passing the correct `language` parameter

### Issue: Language doesn't persist after reload

**Solution:**
- Check that localStorage is enabled in your browser
- Clear browser cache and try again

---

## Migration Checklist

When converting a page to support multiple languages:

- [ ] Import `useLanguage` hook
- [ ] Replace hard-coded text with `t('key')` calls
- [ ] Add translation keys to all three language files
- [ ] For mock data, import and use helper functions
- [ ] Test in all three languages

---

## Complete Example

```typescript
'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { mockClasses } from '@/app/data/mockData';
import { getTranslatedClass } from '@/app/data/mockDataTranslations';
import { Card, Button } from '@/app/components/ui';

export default function ClassesPage() {
  const { t, language } = useLanguage();

  return (
    <div>
      {/* UI translations */}
      <h1>{t('classes.title')}</h1>
      <p>{t('classes.myClasses')}</p>

      {/* Mock data translations */}
      {mockClasses.map((cls) => {
        const translated = getTranslatedClass(cls.id, language);
        return (
          <Card key={cls.id}>
            <h3>{translated.name}</h3>
            <p>{translated.subject}</p>
            <p>{translated.progress}</p>
            <p>Teacher: {cls.teacher}</p> {/* Names don't need translation */}
            <Button>{t('common.view')}</Button>
          </Card>
        );
      })}
    </div>
  );
}
```

---

## Why This Approach?

✅ **Simple**: No complex routing or URL changes  
✅ **Fast**: Instant language switching without page reload  
✅ **Flexible**: Easy to add new languages  
✅ **Clean**: No need to move all pages to locale directories  
✅ **Persistent**: Language preference saved in localStorage  
✅ **Educational**: Perfect for learning and mock projects  

---

**Last Updated:** October 20, 2025

