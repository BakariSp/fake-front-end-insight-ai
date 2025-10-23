'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LanguageSwitcher } from '@ui';
import styles from './TeacherTopNav.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TeacherTopNavProps {
  customBreadcrumbs?: BreadcrumbItem[];
}

const TeacherTopNav: React.FC<TeacherTopNavProps> = ({ customBreadcrumbs }) => {
  const pathname = usePathname();

  const translate = (key: string) => {
    const keyMap: Record<string, string> = {
      'teacher': 'Dashboard',
      'dashboard': 'Dashboard',
      'resource-library': 'Resource Library',
      'communication': 'Communication',
      'classes': 'Classes',
      'assignments': 'Assignments',
      'grades': 'Grades',
      'settings': 'Settings',
      'tasks': 'Tasks',
      'magic-tools': 'Magic Toolkits',
      'announcements': 'School Announcements',
      'parents': 'Parent Notices',
      'collaboration': 'Teacher Collaboration',
      'contacts': 'Contacts',
    };
    return keyMap[key] || key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    if (!pathname) return [];

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Skip the 'teacher' segment and start from actual content
    const contentSegments = segments.slice(1);

    if (contentSegments.length === 0) {
      // We're at /teacher (root)
      breadcrumbs.push({ label: translate('dashboard') });
      return breadcrumbs;
    }

    // Add each segment as breadcrumb
    contentSegments.forEach((segment, index) => {
      if (!/^\d+$/.test(segment)) {
        const path = '/teacher/' + contentSegments.slice(0, index + 1).join('/');
        const label = translate(segment);
        
        if (index === contentSegments.length - 1) {
          breadcrumbs.push({ label });
        } else {
          breadcrumbs.push({ label, href: path });
        }
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className={styles.topNav}>
      <div className={styles.breadcrumbs}>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {item.href ? (
              <Link href={item.href} className={styles.breadcrumbLink}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.actions}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default TeacherTopNav;

