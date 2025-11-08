'use client';

import React from 'react';
import styles from './settingsLayout.module.css';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <div className={styles.settingsLayout}>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;

