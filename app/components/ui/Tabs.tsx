'use client';

import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveKey?: string;
  className?: string;
  style?: 'default' | 'pill' | 'card';
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultActiveKey, 
  className = '',
  style = 'default'
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key);

  const activeTab = tabs.find(tab => tab.key === activeKey);

  // Extract label and count from label string like "All (5)"
  const parseLabel = (label: string) => {
    const match = label.match(/^(.+?)\s*\((\d+)\)$/);
    if (match) {
      return {
        text: match[1].trim(),
        count: match[2]
      };
    }
    return {
      text: label,
      count: null
    };
  };

  const containerClass = [
    styles.tabsContainer,
    style === 'pill' && styles.pillStyle,
    style === 'card' && styles.cardStyle,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <div className={styles.tabsHeader}>
        {tabs.map(tab => {
          const { text, count } = parseLabel(tab.label);
          const isActive = activeKey === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            >
              {tab.icon && (
                <span className={styles.tabIcon}>{tab.icon}</span>
              )}
              <span className={styles.tabLabel}>
                <span>{text}</span>
                {count && (
                  <span className={styles.tabCount}>{count}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.tabsContent}>
        {activeTab?.content}
      </div>
    </div>
  );
};

export default Tabs;

