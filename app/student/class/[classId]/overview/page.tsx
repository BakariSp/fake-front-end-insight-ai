'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Badge, Select, Chart, Table, TableColumn } from '@ui';
import { mockClasses, mockAccuracyData, mockMaterials, mockAssignments } from '@data/mockData';
import styles from './overview.module.css';

const ClassOverviewPage = () => {
  const params = useParams();
  const classId = params.classId as string;
  const [selectedMonth, setSelectedMonth] = useState('Oct');

  // Find the class
  const classData = mockClasses.find(c => c.id === classId);
  
  if (!classData) {
    return (
      <MainLayout showRightSidebar={true}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Class not found</h1>
        </div>
      </MainLayout>
    );
  }

  // Filter assignments for this class
  const classAssignments = mockAssignments.filter(a => a.classId === classId);

  const assignmentColumns: TableColumn[] = [
    {
      key: 'courseName',
      title: 'Course Name',
      dataIndex: 'title',
      render: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary-blue-light)] rounded flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="4" width="14" height="12" rx="1" stroke="var(--primary-blue)" strokeWidth="1.5"/>
              <path d="M7 8h6M7 12h4" stroke="var(--primary-blue)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-medium text-[var(--gray-900)]">{value}</div>
            <div className="text-xs text-[var(--gray-500)]">{record.subject} Lessons</div>
          </div>
        </div>
      ),
    },
    {
      key: 'class',
      title: 'Class',
      dataIndex: 'classId',
      width: '100px',
    },
    {
      key: 'submissionRate',
      title: 'Submission rate',
      dataIndex: 'status',
      width: '150px',
      render: (value: string) => (
        <span className="text-sm text-[var(--gray-700)]">
          {value === 'graded' || value === 'sent' ? '1/1' : '/'}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '120px',
      render: (value: string) => {
        const statusConfig = {
          unsent: { label: 'Unsent', variant: 'warning' as const },
          sent: { label: 'Sent', variant: 'info' as const },
          graded: { label: 'Sent', variant: 'success' as const },
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      key: 'details',
      title: 'Details',
      dataIndex: 'id',
      width: '100px',
      align: 'center',
      render: (value: string) => (
        <Button 
          variant="ghost" 
          size="small"
          onClick={() => window.location.href = `/student/class/${classId}/assignments/${value}`}
        >
          <span className="text-[var(--primary-blue)]">View</span>
        </Button>
      ),
    },
  ];

  // Calculate class stats
  const totalAssignments = classAssignments.length;
  const completedAssignments = classAssignments.filter(a => a.status === 'graded').length;
  const pendingAssignments = classAssignments.filter(a => a.status === 'unsent').length;
  const avgScore = classAssignments.filter(a => a.aiScore).reduce((acc, a) => acc + (a.aiScore || 0), 0) / 
    classAssignments.filter(a => a.aiScore).length || 0;

  return (
    <MainLayout showRightSidebar={true}>
      {/* Enhanced Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div className={styles.classIcon}>
            {classData.name.charAt(0)}
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.classTitle}>{classData.name}</h1>
            <div className={styles.teacherInfo}>
              <svg className={styles.teacherIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Instructor: {classData.teacher}</span>
            </div>
          </div>
        </div>
        <div className={styles.headerMeta}>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div>
              <span className={styles.metaLabel}>Subject: </span>
              <span className={styles.metaValue}>{classData.subject}</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className={styles.metaLabel}>Progress: </span>
              <span className={styles.metaValue}>{classData.progress}</span>
            </div>
          </div>
          {classData.nextClass && (
            <div className={styles.metaItem}>
              <svg className={styles.metaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <span className={styles.metaLabel}>Next Class: </span>
                <span className={styles.metaValue}>{classData.nextClass}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.primary}`}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className={styles.statValue}>{totalAssignments}</div>
          <div className={styles.statLabel}>Total Assignments</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.success}`}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={styles.statValue}>{completedAssignments}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.warning}`}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={styles.statValue}>{pendingAssignments}</div>
          <div className={styles.statLabel}>Pending</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.info}`}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className={styles.statValue}>{avgScore > 0 ? avgScore.toFixed(0) : '-'}</div>
          <div className={styles.statLabel}>Avg Score</div>
        </div>
      </div>

      {/* Course Description */}
      <Card className={styles.descriptionCard}>
        <div className={styles.descriptionHeader}>
          <svg className={styles.descriptionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className={styles.descriptionTitle}>Course Description</h2>
        </div>
        <div className={styles.descriptionContent}>
          This course acts as an introductory guide to pivotal mathematical domains. It's designed for beginners, 
          aiming to systematically impart core concepts and basic application methods of algebra, geometry, 
          surface effects, and probability, laying a solid foundation for further mathematical learning.
        </div>
      </Card>

      {/* Assignment Table - Priority #1 */}
      <Card className={styles.assignmentSection}>
        <div className={styles.sectionHeader}>
          <svg className={styles.sectionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h2 className={styles.sectionTitle}>Assignments</h2>
        </div>
        <Table columns={assignmentColumns} data={classAssignments} />
      </Card>

      <div className={styles.contentGrid}>
        {/* Accuracy Rate Chart */}
        <Card className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Accuracy Rate</h2>
            <Select
              options={[
                { value: 'Oct', label: 'Oct' },
                { value: 'Sep', label: 'Sep' },
                { value: 'Aug', label: 'Aug' },
              ]}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
          <div style={{ flex: 1, minHeight: 0, marginBottom: '1rem' }}>
            <Chart data={mockAccuracyData} height={220} />
          </div>
          <div className={styles.accuracyFooter}>
            <span className={styles.accuracyLabel}>Current accuracy</span>
            <span className={styles.accuracyValue}>40%</span>
          </div>
        </Card>

        {/* Materials - Limited to 5 items */}
        <Card className={styles.materialsCard}>
          <div className={styles.materialsHeader}>
            <h2 className={styles.cardTitle}>Learning Materials</h2>
            <div className={styles.materialsTabs}>
              <button className={`${styles.materialTab} ${styles.active}`}>Recent</button>
              <button className={styles.materialTab}>All</button>
            </div>
          </div>
          <div className={styles.materialsList}>
            {mockMaterials.slice(0, 5).map((material) => (
              <div key={material.id} className={styles.materialItem}>
                <div className={styles.materialContent}>
                  <div className={styles.materialIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 2v4M9 14v4M5 6h4M15 6h4M7 6a2 2 0 0 1 2-2M9 16a2 2 0 0 1-2-2M17 6a2 2 0 0 0-2-2M15 16a2 2 0 0 0 2-2" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.materialInfo}>
                    <div className={styles.materialTitle}>{material.title}</div>
                    <div className={styles.materialDate}>{material.uploadDate}</div>
                  </div>
                </div>
                <Button variant="primary" size="small">
                  Go
                </Button>
              </div>
            ))}
          </div>
          <div className={styles.materialsFooter}>
            <Button 
              variant="ghost" 
              fullWidth
              onClick={() => window.location.href = `/student/class/${classId}/materials`}
            >
              View All Materials →
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClassOverviewPage;

