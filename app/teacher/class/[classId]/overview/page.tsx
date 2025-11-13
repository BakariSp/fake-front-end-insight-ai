'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Button } from '@ui';
import styles from './overview.module.css';

const ClassOverviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;

  // Mock class data - in a real app, this would come from an API
  const classData = {
    id: classId,
    name: classId === 'class-001' ? 'Grade 10-A' : classId === 'class-002' ? 'Grade 11-B' : 'Grade 9-C',
    subject: 'Mathematics',
    students: 28,
    teacher: 'teacher1',
    description: 'Advanced mathematics course focusing on algebra, geometry, and calculus fundamentals.',
  };

  const quickStats = [
    {
      label: 'Total Students',
      value: '28',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#4F7FFF',
    },
    {
      label: 'Active Assignments',
      value: '2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#52C41A',
    },
    {
      label: 'Avg Performance',
      value: '78.5%',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#FF9800',
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <Button 
          variant="ghost" 
          onClick={() => router.push('/teacher/classes')}
          className={styles.backButton}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Back to Classes
        </Button>

        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>{classData.name}</h1>
            <p className={styles.pageSubtitle}>{classData.subject}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        {quickStats.map((stat, index) => (
          <Card key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className={styles.actionsCard}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionButtons}>
          <Button
            variant="primary"
            onClick={() => router.push(`/teacher/class/${classId}/assignments`)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            View Assignments
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/teacher/assignments/new')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Create New Assignment
          </Button>
        </div>
      </Card>

      {/* Class Description */}
      <Card className={styles.descriptionCard}>
        <h2 className={styles.sectionTitle}>About This Class</h2>
        <p className={styles.description}>{classData.description}</p>
      </Card>
    </div>
  );
};

export default ClassOverviewPage;

