'use client';

import React from 'react';
import styles from './TabNav.module.css';

export interface TabNavItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  href?: string;
}

export interface TabNavProps {
  tabs: TabNavItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

const TabNav: React.FC<TabNavProps> = ({ 
  tabs, 
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`${styles.tabNav} ${className}`}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
          >
            {tab.icon && (
              <span className={styles.tabIcon}>{tab.icon}</span>
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNav;

