'use client';

import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopNav from './components/AdminTopNav';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <AdminTopNav />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

