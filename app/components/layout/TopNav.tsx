'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LanguageSwitcher } from '../ui';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { mockClasses, mockAssignments } from '../../data/mockData';
import styles from './TopNav.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopNavProps {
  customBreadcrumbs?: BreadcrumbItem[];
}

const TopNav: React.FC<TopNavProps> = ({ customBreadcrumbs }) => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const translate = (key: string) => {
    // Map common navigation keys to translations
    const keyMap: Record<string, string> = {
      'dashboard': t('nav.dashboard'),
      'classes': t('classes.myClasses'),
      'overview': t('classes.overview'),
      'assignments': t('classes.assignments'),
      'grades': t('classes.grades'),
      'materials': t('classes.materials'),
      'members': t('classes.members'),
      'communication': t('nav.messages'),
      'insight-tools': 'Insight Tools',
      'magic-toolkits': t('nav.resources'),
      'resource-library': t('nav.resources'),
      'settings': t('nav.settings'),
      'ai-tutor': 'AI Tutor',
      'wellness-chat': 'Wellness Chat',
      'achievements': 'Achievements',
      'mistake-analysis': 'Mistake Analysis',
      'practice-generator': 'Practice Generator',
      'performance': 'Performance Dashboard',
    };
    return keyMap[key] || key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Generate breadcrumbs from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return customBreadcrumbs.map(item => ({
        ...item,
        label: translate(item.label.toLowerCase().replace(/\s+/g, '-')),
      }));
    }

    if (!pathname) return [];

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Determine the root section based on the first segment
    const rootSection = segments[0];

    // Handle class-related routes (most complex case)
    if (pathname.startsWith('/class')) {
      // Start with Classes as L1
      breadcrumbs.push({ label: translate('classes'), href: '/class' });
      
      // Check if we're in a specific class page
      const classIdMatch = pathname.match(/\/class\/(\d+)/);
      
      if (classIdMatch) {
        const classId = classIdMatch[1];
        // Find the class to get its name
        const classData = mockClasses.find(c => c.id === classId);
        const className = classData ? classData.name : `Class ${classId}`;
        
        breadcrumbs.push({ label: className, href: `/class/${classId}/overview` });
        
        // Check for subpage (overview, assignments, grades, materials, members)
        const subPageMatch = pathname.match(/\/class\/\d+\/(overview|assignments|grades|materials|members)/);
        
        if (subPageMatch) {
          const subPage = subPageMatch[1];
          
          // If not overview, add the subpage to breadcrumb
          if (subPage !== 'overview') {
            breadcrumbs.push({ label: translate(subPage), href: `/class/${classId}/${subPage}` });
          } else {
            // For overview, show it as current page
            breadcrumbs.push({ label: translate('overview') });
          }
          
          // Check if we're in an assignment detail page
          const assignmentIdMatch = pathname.match(/\/assignments\/([^/]+)$/);
          if (assignmentIdMatch) {
            const assignmentId = assignmentIdMatch[1];
            // Try to find the assignment to get its name
            const assignment = mockAssignments.find(a => a.id === assignmentId);
            const assignmentName = assignment ? assignment.title : assignmentId;
            breadcrumbs.push({ label: assignmentName });
          }
        }
      }
      
      return breadcrumbs;
    }

    // Handle dashboard routes
    if (pathname.startsWith('/dashboard') || pathname === '/') {
      breadcrumbs.push({ label: translate('dashboard'), href: '/dashboard' });
      
      // If there are additional segments after dashboard, add them
      if (segments.length > 1) {
        segments.slice(1).forEach((segment, index) => {
          if (!/^\d+$/.test(segment)) {
            const path = '/dashboard/' + segments.slice(1, index + 2).join('/');
            breadcrumbs.push({ label: translate(segment), href: index === segments.length - 2 ? undefined : path });
          }
        });
      }
      
      return breadcrumbs;
    }

    // Handle other top-level sections (Insight Tools, Communication, Resource Library, Settings)
    const topLevelSections = ['insight-tools', 'magic-toolkits', 'communication', 'resource-library', 'settings'];
    
    if (topLevelSections.includes(rootSection)) {
      // Start with the section name as L1
      breadcrumbs.push({ label: translate(rootSection), href: `/${rootSection}` });
      
      // Add sub-pages if any
      if (segments.length > 1) {
        segments.slice(1).forEach((segment, index) => {
          if (!/^\d+$/.test(segment)) {
            const path = '/' + segments.slice(0, index + 2).join('/');
            const isLast = index === segments.length - 2;
            breadcrumbs.push({ label: translate(segment), href: isLast ? undefined : path });
          }
        });
      }
      
      return breadcrumbs;
    }

    // Default fallback - build from segments
    segments.forEach((segment, index) => {
      if (!/^\d+$/.test(segment)) {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const label = translate(segment);
        
        if (index === segments.length - 1) {
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

export default TopNav;

