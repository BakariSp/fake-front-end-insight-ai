'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { mockClasses } from '../../data/mockData';
import styles from './Sidebar.module.css';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  children?: NavItem[];
  isDynamic?: boolean;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/student/dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M3 4h6v6H3V4zm8 0h6v4h-6V4zM3 12h6v4H3v-4zm8 0h6v4h-6v-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'class',
    label: 'Class',
    href: '/student/class',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <rect x="3" y="4" width="14" height="12" rx="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 8h6M7 12h4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    isDynamic: true,
  },
  {
    id: 'insight-tools',
    label: 'Insight Tools',
    href: '/student/insight-tools',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M8 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: 'AI',
  },
  {
    id: 'communication',
    label: 'Communication',
    href: '/student/communication',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M17 6H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m2 7 8 5 8-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: 'NEW',
  },
  {
    id: 'resource-library',
    label: 'Resource Library',
    href: '/student/resource-library',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M4 4h12v12H4V4zm2 2v8m4-8v8m4-8v8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/student/settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <circle cx="10" cy="10" r="3" strokeWidth="1.5"/>
        <path d="M10 2v2m0 12v2M2 10h2m12 0h2m-2.929-5.071l-1.414 1.414M7.343 14.657l-1.414 1.414m9.142 0l-1.414-1.414M7.343 5.343L5.929 3.929" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [currentClassId, setCurrentClassId] = useState<string | null>(null);
  
  // Extract classId from pathname and manage expanded state
  useEffect(() => {
    const classIdMatch = pathname?.match(/\/student\/class\/(\d+)/);
    
    if (classIdMatch) {
      // We're in a class detail page (e.g., /student/class/801/overview or /student/class/801/assignments)
      const classId = classIdMatch[1];
      setCurrentClassId(classId);
      if (!expandedItems.includes('class')) {
        setExpandedItems(prev => [...prev, 'class']);
      }
    } else if (pathname === '/student/class') {
      // On class list page, collapse the class menu
      setCurrentClassId(null);
      setExpandedItems(prev => prev.filter(id => id !== 'class'));
    } else if (!pathname?.startsWith('/student/class')) {
      // Not in class section at all
      setCurrentClassId(null);
    }
  }, [pathname]);
  
  const toggleExpanded = (id: string, e?: React.MouseEvent) => {
    if (id === 'class') {
      // If clicking class item, navigate to class list page
      return;
    }
    e?.preventDefault();
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const isActive = (href: string) => {
    if (href === '/student/class') {
      return pathname === '/student/class';
    }
    return pathname === href || pathname?.startsWith(href + '/');
  };
  
  // Get dynamic class submenu items
  const getClassSubmenu = () => {
    if (!currentClassId) return [];
    
    const currentClass = mockClasses.find(c => c.id === currentClassId);
    if (!currentClass) return [];
    
    return [
      { 
        id: 'overview', 
        label: 'Overview', 
        href: `/student/class/${currentClassId}/overview`, 
        icon: null 
      },
      { 
        id: 'assignments', 
        label: 'Assignments', 
        href: `/student/class/${currentClassId}/assignments`, 
        icon: null 
      },
      { 
        id: 'grades', 
        label: 'My Grades', 
        href: `/student/class/${currentClassId}/grades`, 
        icon: null 
      },
      { 
        id: 'materials', 
        label: 'Materials', 
        href: `/student/class/${currentClassId}/materials`, 
        icon: null 
      },
      { 
        id: 'members', 
        label: 'Class Members', 
        href: `/student/class/${currentClassId}/members`, 
        icon: null 
      },
    ];
  };
  
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.header}>
        <div className={styles.logoImage}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="var(--primary-blue)"/>
            <rect x="12" y="12" width="16" height="16" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M16 20h8M20 16v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      {/* User Profile */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <Avatar 
            name="Emma Wilson"
            size="medium"
          />
          <div className={styles.userDetails}>
            <p className={styles.userName}>Emma Wilson</p>
            <p className={styles.userRole}>Student</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map(item => {
            // For dynamic class menu, get submenu based on current class
            const submenuItems = item.isDynamic ? getClassSubmenu() : item.children;
            const hasSubmenu = submenuItems && submenuItems.length > 0;
            
            return (
              <li key={item.id} className={styles.navItem}>
                {hasSubmenu ? (
                  <>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navLabel}>{item.label}</span>
                      {item.badge && (
                        <span className={styles.navBadge}>
                          <Badge variant="info" size="small">{item.badge}</Badge>
                        </span>
                      )}
                      {expandedItems.includes(item.id) && (
                        <span className={`${styles.expandIcon} ${styles.expanded}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </Link>
                    {expandedItems.includes(item.id) && (
                      <ul className={styles.subNav}>
                        {submenuItems.map(child => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              className={`${styles.subNavLink} ${isActive(child.href) ? styles.active : ''}`}
                            >
                              {child.label}
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
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.badge && (
                      <span className={styles.navBadge}>
                        <Badge variant="info" size="small">{item.badge}</Badge>
                      </span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
