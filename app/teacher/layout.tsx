'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TeacherTopNav from './components/TeacherTopNav';
import styles from './teacherLayout.module.css';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClassOpen, setIsClassOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      href: '/teacher',
    },
    {
      id: 'magic-toolkits',
      label: 'Magic Toolkits',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2l2 6 6 1-5 4 2 6-5-3-5 3 2-6-5-4 6-1 2-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      href: '/teacher/insight-tools',
    },
    {
      id: 'class',
      label: 'Class',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 5h16M2 5v10a1 1 0 001 1h14a1 1 0 001-1V5M2 5l8-3 8 3" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      hasSubmenu: true,
      isOpen: isClassOpen,
      onToggle: () => setIsClassOpen(!isClassOpen),
      submenu: [
        { label: 'All Classes', href: '/teacher/classes' },
        { label: 'Assignments', href: '/teacher/assignments' },
        { label: 'Grades', href: '/teacher/grades' },
      ],
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17 8.5c0 3.5-3.1 6.5-7 6.5-.7 0-1.4-.1-2-.3L4 17l1.3-3.7C4.5 12.4 4 11 4 9.5 4 6 7.1 3 11 3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="14.5" cy="5.5" r="2.5" fill="#FF4D4F"/>
        </svg>
      ),
      href: '/teacher/communication',
    },
    {
      id: 'resource-library',
      label: 'Resource Library',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 5h12M4 5v11a1 1 0 001 1h10a1 1 0 001-1V5M4 5l2-3h8l2 3M8 9v4M12 9v4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      href: '/teacher/resource-library',
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="3" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="3" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="3" cy="15" r="1.5" fill="currentColor"/>
        </svg>
      ),
      href: '/teacher/tasks',
      badge: 'Coming Soon',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 2v2M10 16v2M18 10h-2M4 10H2M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4M15.5 15.5l-1.4-1.4M5.9 5.9L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      href: '/teacher/settings',
      badge: 'Coming Soon',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/teacher') {
      return pathname === '/teacher';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#4F7FFF"/>
              <path d="M20 10l8 6v14h-6v-8h-4v8h-6V16l8-6z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* User Profile */}
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#E8EEFF"/>
              <circle cx="20" cy="15" r="6" fill="#4F7FFF"/>
              <path d="M8 35c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="#4F7FFF"/>
            </svg>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Jone Copper</div>
            <div className={styles.userRole}>Math teacher</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles.navItemWrapper}>
              {item.hasSubmenu ? (
                <>
                  <button
                    className={`${styles.navItem} ${item.isOpen ? styles.navItemActive : ''}`}
                    onClick={item.onToggle}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <svg
                      className={`${styles.navArrow} ${item.isOpen ? styles.navArrowOpen : ''}`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  {item.isOpen && (
                    <div className={styles.submenu}>
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`${styles.submenuItem} ${
                            pathname === subItem.href || pathname?.startsWith(subItem.href)
                              ? styles.submenuItemActive
                              : ''
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={`${styles.navItem} ${isActive(item.href || '') ? styles.navItemActive : ''} ${
                    item.badge ? styles.navItemDisabled : ''
                  }`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <TeacherTopNav />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

