'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Badge, Select, Table, Tabs, EmptyState, SearchBar } from '@ui';
import type { TableColumn, Tab } from '@ui';
import { mockAssignments } from '@data/mockData';
import styles from './assignments.module.css';

const AssignmentsPage = () => {
  const params = useParams();
  const classId = params.classId as string;
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredAssignments = (status?: string) => {
    let filtered = mockAssignments.filter(a => a.classId === classId);
    
    if (status) {
      filtered = filtered.filter(a => a.status === status);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Get assignment type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online_quiz':
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 6h6M6 9h4M6 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="13" cy="4" r="2" fill="var(--primary-blue)"/>
          </svg>
        );
      case 'file_upload':
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 2H5a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6l-4-4z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 2v4h4M9 9v4M7 11l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'text':
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="3" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Get assignment type label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'online_quiz': return 'Online Quiz';
      case 'file_upload': return 'File Upload';
      case 'text': return 'Text Assignment';
      default: return type;
    }
  };

  const assignmentColumns: TableColumn[] = [
    {
      key: 'title',
      title: 'Assignment Title',
      dataIndex: 'title',
      render: (value: string, record: any) => (
        <div className={styles.assignmentCell}>
          <div className={`${styles.assignmentIcon} ${styles[record.type]}`}>
            {getTypeIcon(record.type)}
          </div>
          <div className={styles.assignmentInfo}>
            <h3 className={styles.assignmentTitle}>{value}</h3>
            <div className={styles.assignmentMeta}>
              <span className={styles.assignmentType}>{getTypeLabel(record.type)}</span>
              {record.type === 'online_quiz' && record.totalPoints && (
                <span className={styles.assignmentPoints}>• {record.totalPoints} pts</span>
              )}
              {record.type === 'online_quiz' && record.duration && (
                <span className={styles.assignmentDuration}>• {record.duration} min</span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      dataIndex: 'dueDate',
      width: '130px',
      render: (value: string) => (
        <span className="text-sm text-[var(--gray-700)]">{value}</span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '130px',
      render: (value: string) => {
        const statusConfig = {
          unsent: { label: 'Not Submitted', variant: 'warning' as const },
          sent: { label: 'Submitted', variant: 'info' as const },
          graded: { label: 'Graded', variant: 'success' as const },
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      key: 'submitTime',
      title: 'Submit Time',
      dataIndex: 'submitTime',
      width: '150px',
      render: (value?: string) => (
        <span className="text-sm text-[var(--gray-700)]">{value || '-'}</span>
      ),
    },
    {
      key: 'score',
      title: 'AI Score',
      dataIndex: 'aiScore',
      width: '100px',
      align: 'center',
      render: (value?: number) => (
        value ? (
          <span className="text-sm font-semibold text-[var(--success-green)]">{value} / 100</span>
        ) : (
          <span className="text-sm text-[var(--gray-400)]">-</span>
        )
      ),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'id',
      width: '100px',
      align: 'right',
      render: (value: string) => (
        <Button 
          variant="ghost" 
          size="small"
          onClick={() => window.location.href = `/student/class/${classId}/assignments/${value}`}
        >
          View
        </Button>
      ),
    },
  ];

  const tabs: Tab[] = [
    {
      key: 'all',
      label: `All (${getFilteredAssignments().length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments().length > 0 ? (
            <Table columns={assignmentColumns} data={getFilteredAssignments()} />
          ) : (
            <EmptyState
              icon={
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 28h24M20 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
              title="No assignments found"
              description="There are no assignments matching your filters."
            />
          )}
        </div>
      ),
    },
    {
      key: 'unsent',
      label: `Not Submitted (${getFilteredAssignments('unsent').length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 6v3M9 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments('unsent').length > 0 ? (
            <Table columns={assignmentColumns} data={getFilteredAssignments('unsent')} />
          ) : (
            <EmptyState
              icon={
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2"/>
                  <path d="M32 24v16M24 32h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
              title="All caught up!"
              description="You don't have any pending assignments to submit."
            />
          )}
        </div>
      ),
    },
    {
      key: 'sent',
      label: `Submitted (${getFilteredAssignments('sent').length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M15 5.5l-6 6-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments('sent').length > 0 ? (
            <Table columns={assignmentColumns} data={getFilteredAssignments('sent')} />
          ) : (
            <EmptyState
              title="No submitted assignments"
              description="Assignments you submit will appear here."
            />
          )}
        </div>
      ),
    },
    {
      key: 'graded',
      label: `Graded (${getFilteredAssignments('graded').length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2L11 7h5l-4 3.5L14 16l-5-3.5L4 16l2-5.5L2 7h5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments('graded').length > 0 ? (
            <Table columns={assignmentColumns} data={getFilteredAssignments('graded')} />
          ) : (
            <EmptyState
              title="No graded assignments"
              description="Graded assignments will appear here once your teacher reviews them."
            />
          )}
        </div>
      ),
    },
  ];

  // Get urgent assignments (due within 3 days)
  const urgentAssignments = mockAssignments.filter(a => {
    if (a.status !== 'unsent') return false;
    const dueDate = new Date(a.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  });

  const stats = {
    total: mockAssignments.length,
    notSubmitted: mockAssignments.filter(a => a.status === 'unsent').length,
    submitted: mockAssignments.filter(a => a.status === 'sent').length,
    graded: mockAssignments.filter(a => a.status === 'graded').length,
  };

  return (
    <MainLayout showRightSidebar={false}>
      {/* Header with Inline Stats */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>My Assignments</h1>
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{stats.total}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={`${styles.statValue} ${styles.warning}`}>{stats.notSubmitted}</span>
                <span className={styles.statLabel}>Pending</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={`${styles.statValue} ${styles.info}`}>{stats.submitted}</span>
                <span className={styles.statLabel}>Submitted</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={`${styles.statValue} ${styles.success}`}>{stats.graded}</span>
                <span className={styles.statLabel}>Graded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Alert Banner */}
      {urgentAssignments.length > 0 && (
        <div className={styles.alertBanner}>
          <div className={styles.alertIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6v4m0 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.alertContent}>
            <h3 className={styles.alertTitle}>Urgent: {urgentAssignments.length} assignment{urgentAssignments.length > 1 ? 's' : ''} due soon</h3>
            <p className={styles.alertDescription}>
              {urgentAssignments.map(a => a.title).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Filter Section - Compact */}
      <div className={styles.filterSection}>
        <SearchBar
          placeholder="Search assignments by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          fullWidth
        />
      </div>

      {/* Assignments Table with Tabs */}
      <Card className={styles.tableContainer}>
        <Tabs tabs={tabs} />
      </Card>
    </MainLayout>
  );
};

export default AssignmentsPage;

