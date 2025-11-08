'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './settingsLayout.module.css';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'account',
      label: 'Account',
      href: '/teacher/settings/account',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 17c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      description: 'Profile picture, name, email, password'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      href: '/teacher/settings/notifications',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4a5 5 0 00-5 5c0 4-2 5-2 5h14s-2-1-2-5a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.5 17a1.5 1.5 0 01-3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Email, push, and in-app notifications'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      href: '/teacher/settings/preferences',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16.5 10a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 2v2M10 16v2M18 10h-2M4 10H2M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4M15.5 15.5l-1.4-1.4M5.9 5.9L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      description: 'Layout, teaching formats, language'
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      href: '/teacher/settings/privacy',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="5" y="9" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 9V6a3 3 0 116 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="13" r="1" fill="currentColor"/>
        </svg>
      ),
      description: 'Password, 2FA, profile visibility'
    },
    {
      id: 'about',
      label: 'About Insight AI',
      href: '/teacher/settings/about',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 14v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="7" r="0.5" fill="currentColor"/>
        </svg>
      ),
      description: 'Version, help center, feedback'
    }
  ];

  const isActive = (href: string) => {
    if (pathname === '/teacher/settings' && href === '/teacher/settings/account') {
      return true;
    }
    return pathname === href;
  };

  return (
    <div className={styles.settingsLayout}>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Settings</h1>
          <p className={styles.sidebarSubtitle}>
            Manage your account and preferences
          </p>
        </div>
        
        <div className={styles.navList}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${isActive(item.href) ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemIcon}>
                {item.icon}
              </div>
              <div className={styles.navItemContent}>
                <div className={styles.navItemLabel}>{item.label}</div>
                <div className={styles.navItemDescription}>{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;

