# 🌍 i18n (Internationalization) - Quick Reference

## Overview

This project uses a **simple, context-based** i18n solution. No complex routing, no URL changes - just easy language switching!

### 🎯 Key Features

- ✅ **Simple**: Context API + localStorage
- ✅ **3 Languages**: English, Chinese (简体), Spanish
- ✅ **Instant Switch**: No page reload needed
- ✅ **Persistent**: Language saved in browser
- ✅ **No URL Changes**: All pages stay at original paths

---

## 🚀 Quick Start

### 1. Use in Any Component

```typescript
'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <button>{t('common.save')}</button>
      <p>Current: {language}</p>
    </div>
  );
}
```

### 2. Translate Mock Data

```typescript
import { useLanguage } from '@/app/contexts/LanguageContext';
import { getTranslatedClass } from '@/app/data/mockDataTranslations';

const { language } = useLanguage();
const translated = getTranslatedClass('801', language);
// { name: '...', subject: '...', progress: '...' }
```

---

## 📁 Files to Know

| File | Purpose |
|------|---------|
| `app/contexts/LanguageContext.tsx` | Main i18n provider |
| `messages/en.json` | English translations |
| `messages/zh.json` | Chinese translations |
| `messages/es.json` | Spanish translations |
| `app/data/mockDataTranslations.ts` | Mock data translations |
| `app/components/ui/SimpleLanguageSwitcher.tsx` | Language switcher UI |
| `SIMPLE_I18N_GUIDE.md` | **Full documentation** |

---

## 📖 Translation Keys Format

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  },
  "dashboard": {
    "title": "Dashboard",
    "statistics": {
      "totalCourses": "Total Courses"
    }
  }
}
```

Use with dot notation:
```typescript
t('common.save')                          // "Save"
t('dashboard.title')                      // "Dashboard"  
t('dashboard.statistics.totalCourses')    // "Total Courses"
```

---

## 🔧 Adding New Translations

1. **Add to all 3 language files** (`messages/en.json`, `zh.json`, `es.json`)
2. **Use in component** with `t('your.new.key')`
3. **Test** in all languages using the switcher

---

## 📚 Full Documentation

**See `SIMPLE_I18N_GUIDE.md` for:**
- Complete usage examples
- How to translate mock data
- Adding new languages
- Best practices
- Troubleshooting
- Migration checklist

---

## 🎨 Example Page

Check `app/dashboard/page.tsx` to see a complete example of:
- UI translations (`t('key')`)
- Mock data translations (`getTranslated*()`)
- Language-aware rendering

---

**For questions, see the full guide: `SIMPLE_I18N_GUIDE.md`**

