'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import styles from './AdminTopNav.module.css';

export default function AdminTopNav() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const languages = [
    { code: 'zh', label: '简体中文' },
    { code: 'en', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  // Generate breadcrumb based on current pathname
  const getBreadcrumb = () => {
    const paths = pathname?.split('/').filter(Boolean) || [];
    
    const breadcrumbMap: Record<string, string> = {
      'admin': t('admin.common.platform'),
      'dashboard': t('admin.nav.dashboard'),
      'users': t('admin.nav.users'),
      'students': t('admin.users.students.title'),
      'teachers': t('admin.users.teachers.title'),
      'parents': t('admin.users.parents.title'),
      'classes': t('admin.nav.classes'),
      'notifications': t('admin.nav.notifications'),
      'create': t('admin.notifications.create.title'),
      'reports': t('admin.nav.reports'),
      'settings': t('admin.nav.settings'),
      'permissions': t('admin.nav.permissions'),
    };

    return paths.map(path => breadcrumbMap[path] || path);
  };

  const breadcrumbs = getBreadcrumb();

  // Generate breadcrumb paths for navigation
  const getBreadcrumbPaths = () => {
    const paths = pathname?.split('/').filter(Boolean) || [];
    return paths.map((_, index) => {
      return '/' + paths.slice(0, index + 1).join('/');
    });
  };

  const breadcrumbPaths = getBreadcrumbPaths();

  return (
    <header className={styles.topNav}>
      <div className={styles.breadcrumb}>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
            {index < breadcrumbs.length - 1 ? (
              <Link href={breadcrumbPaths[index]} className={styles.breadcrumbLink}>
                {crumb}
              </Link>
            ) : (
              <span className={styles.breadcrumbItem}>{crumb}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.actions}>
        {/* Current Time */}
        <div className={styles.timeDisplay}>
          <svg className={styles.timeIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <circle cx="8" cy="8" r="6" strokeWidth="1.5"/>
            <path d="M8 5v3l2 2" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className={styles.timeText}>
            {currentTime.toLocaleString(language === 'zh' ? 'zh-CN' : language === 'zh-TW' ? 'zh-TW' : 'en-US', {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {/* Notifications */}
        <button className={styles.actionButton}>
          <svg className={styles.actionIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
            <path d="M13.5 6.5c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5c0 3.5-1.5 4.5-1.5 4.5h10s-1.5-1-1.5-4.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 14.5c.4.4.9.5 1.4.5s1-.1 1.4-.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles.badge}>5</span>
        </button>

        {/* Messages */}
        <button className={styles.actionButton}>
          <svg className={styles.actionIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
            <path d="M15 11.5c0 .828-.448 1.5-1 1.5H5l-3 3V3c0-.552.448-1 1-1h11c.552 0 1 .448 1 1v8.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="7" r="0.5" fill="currentColor"/>
            <circle cx="9" cy="7" r="0.5" fill="currentColor"/>
            <circle cx="12" cy="7" r="0.5" fill="currentColor"/>
          </svg>
          <span className={styles.badge}>12</span>
        </button>

        {/* Language Switcher */}
        <div className={styles.languageSwitcher}>
          <button 
            className={styles.actionButton}
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            <svg className={styles.actionIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor">
              <circle cx="9" cy="9" r="7" strokeWidth="1.5"/>
              <path d="M3 9h12M9 3c1.5 1.5 2.5 4 2.5 6s-1 4.5-2.5 6M9 3c-1.5 1.5-2.5 4-2.5 6s1 4.5 2.5 6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className={styles.actionText}>{currentLang.label}</span>
          </button>
          {showLangMenu && (
            <div className={styles.langMenu}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.langMenuItem} ${language === lang.code ? styles.langMenuItemActive : ''}`}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setShowLangMenu(false);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <circle cx="8" cy="8" r="6" strokeWidth="1.5"/>
                    <path d="M2 8h12M8 2c1.2 1.2 2 3 2 6s-.8 4.8-2 6M8 2c-1.2 1.2-2 3-2 6s.8 4.8 2 6" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

