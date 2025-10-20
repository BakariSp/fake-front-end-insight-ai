'use client';

import React from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import TopNav from './TopNav';
import styles from './MainLayout.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  showRightSidebar?: boolean;
  customBreadcrumbs?: BreadcrumbItem[];
  noPadding?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showRightSidebar = false, customBreadcrumbs, noPadding = false }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      
      <main className={`${styles.main} ${showRightSidebar ? styles.withRightSidebar : ''} ${noPadding ? styles.noPadding : ''}`}>
        <TopNav customBreadcrumbs={customBreadcrumbs} />
        <div className={`${styles.content} ${noPadding ? styles.contentNoPadding : ''}`}>
          {children}
        </div>
      </main>
      
      {showRightSidebar && <RightSidebar />}
    </div>
  );
};

export default MainLayout;

