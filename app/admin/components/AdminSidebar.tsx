'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './AdminSidebar.module.css';

interface NavItem {
  icon: React.ReactNode;
  labelKey: string;
  href: string;
  badge?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M3 4h6v6H3V4zm8 0h6v4h-6V4zM3 12h6v4H3v-4zm8 0h6v4h-6v-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    labelKey: 'admin.nav.dashboard',
    href: '/admin/dashboard',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M10 3c-1.5 0-2.5 1-2.5 2.5v1c-1.5.5-2.5 2-2.5 3.5 0 0 0 6 5 6s5-6 5-6c0-1.5-1-3-2.5-3.5v-1C12.5 4 11.5 3 10 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    labelKey: 'admin.nav.notifications',
    href: '/admin/notifications',
    badge: 'CORE',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <rect x="6" y="8" width="8" height="9" rx="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 8V6a2 2 0 0 1 4 0v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
    labelKey: 'admin.nav.permissions',
    href: '/admin/permissions',
    badge: 'CORE',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <circle cx="10" cy="7" r="3" strokeWidth="1.5"/>
        <path d="M4 17c0-3 2.5-5 6-5s6 2 6 5" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="15" cy="7" r="2" strokeWidth="1.5"/>
        <path d="M18 15c0-1.5-1-2.5-2.5-2.5" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    labelKey: 'admin.nav.users',
    href: '/admin/users',
    children: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <circle cx="10" cy="7" r="3" strokeWidth="1.5"/>
            <path d="M4 17c0-3 2.5-5 6-5s6 2 6 5" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 10h3m-1.5-1.5v3" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ),
        labelKey: 'admin.nav.teachers',
        href: '/admin/users/teachers',
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <circle cx="10" cy="8" r="3" strokeWidth="1.5"/>
            <path d="M4 17c0-3 2.5-5 6-5s6 2 6 5" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7 5L10 3l3 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        labelKey: 'admin.nav.students',
        href: '/admin/users/students',
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <circle cx="7" cy="7" r="2.5" strokeWidth="1.5"/>
            <circle cx="13" cy="7" r="2.5" strokeWidth="1.5"/>
            <path d="M2 16c0-2 1.5-3.5 4-3.5M18 16c0-2-1.5-3.5-4-3.5M10 17c0-1.5-1-2.5-2.5-2.5S5 15.5 5 17m5 0c0-1.5 1-2.5 2.5-2.5S15 15.5 15 17" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ),
        labelKey: 'admin.nav.parents',
        href: '/admin/users/parents',
      },
    ],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M2 9l8-6 8 6v8H2V9z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 17v-5h6v5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 3v2" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    labelKey: 'admin.nav.classes',
    href: '/admin/classes',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="14" height="14" rx="1" strokeWidth="1.5"/>
        <path d="M7 7v6M10 6v8M13 9v4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    labelKey: 'admin.nav.reports',
    href: '/admin/reports',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <circle cx="10" cy="10" r="3" strokeWidth="1.5"/>
        <path d="M10 2v2m0 12v2M2 10h2m12 0h2m-2.929-5.071l-1.414 1.414M7.343 14.657l-1.414 1.414m9.142 0l-1.414-1.414M7.343 5.343L5.929 3.929" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    labelKey: 'admin.nav.settings',
    href: '/admin/settings',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const toggleExpand = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.header}>
        <div className={styles.logoImage}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="var(--primary-blue)"/>
            <path d="M20 10l-10 8v14h8v-8h4v8h8V18l-10-8z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* User Profile */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <Avatar 
            name="Principal Zhang"
            size="medium"
          />
          <div className={styles.userDetails}>
            <p className={styles.userName}>Principal Zhang</p>
            <p className={styles.userRole}>Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              {item.children ? (
                <>
                  <button
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                    onClick={() => toggleExpand(item.href)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{t(item.labelKey)}</span>
                    {item.badge && (
                      <span className={styles.navBadge}>
                        <Badge variant="warning" size="small">{item.badge}</Badge>
                      </span>
                    )}
                    <span className={`${styles.expandIcon} ${expandedItem === item.href ? styles.expanded : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {expandedItem === item.href && (
                    <ul className={styles.subNav}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`${styles.subNavLink} ${isActive(child.href) ? styles.active : ''}`}
                          >
                            <span className={styles.navIcon}>{child.icon}</span>
                            <span>{t(child.labelKey)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{t(item.labelKey)}</span>
                  {item.badge && (
                    <span className={styles.navBadge}>
                      <Badge variant="warning" size="small">{item.badge}</Badge>
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <Link href="/login" className={styles.logoutButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M8 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 14l4-4-4-4M17 10H7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{t('nav.logout')}</span>
        </Link>
      </div>
    </aside>
  );
}

