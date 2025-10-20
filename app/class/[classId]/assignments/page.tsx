'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import { Card, Button, Badge, Select, Table, Tabs, EmptyState, SearchBar } from '../../../components/ui';
import type { TableColumn, Tab } from '../../../components/ui';
import { mockAssignments } from '../../../data/mockData';
import styles from './assignments.module.css';

const AssignmentsPage = () => {
  const params = useParams();
  const classId = params.classId as string;
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredAssignments = (status?: string) => {
    let filtered = mockAssignments;
    
    if (status) {
      filtered = filtered.filter(a => a.status === status);
    }
    
    if (filterSubject !== 'all') {
      filtered = filtered.filter(a => a.subject === filterSubject);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const assignmentColumns: TableColumn[] = [
    {
      key: 'title',
      title: 'Assignment Title',
      dataIndex: 'title',
      render: (value: string, record: any) => (
        <div className={styles.assignmentCell}>
          <div className={styles.assignmentIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="4" width="14" height="12" rx="1" stroke="var(--primary-blue)" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className={styles.assignmentInfo}>
            <h3 className={styles.assignmentTitle}>{value}</h3>
            <p className={styles.assignmentSubject}>{record.subject}</p>
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
          onClick={() => window.location.href = `/class/${classId}/assignments/${value}`}
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

  return (
    <MainLayout showRightSidebar={false}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.headerTitle}>My Assignments</h1>
            <p className={styles.headerDescription}>Track and manage all your assignments in one place</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <Card className={styles.filterSection}>
        <div className={styles.filterContent}>
          <div className={styles.searchWrapper}>
            <SearchBar
              placeholder="Search assignments by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              fullWidth
            />
          </div>
          <Select
            options={[
              { value: 'all', label: 'All Subjects' },
              { value: 'Math', label: 'Math' },
              { value: 'English', label: 'English' },
              { value: 'Physics', label: 'Physics' },
            ]}
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          />
        </div>
      </Card>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryCardValue}>
            {mockAssignments.length}
          </div>
          <div className={styles.summaryCardLabel}>Total Assignments</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={`${styles.summaryCardValue} ${styles.warning}`}>
            {mockAssignments.filter(a => a.status === 'unsent').length}
          </div>
          <div className={styles.summaryCardLabel}>Not Submitted</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={`${styles.summaryCardValue} ${styles.info}`}>
            {mockAssignments.filter(a => a.status === 'sent').length}
          </div>
          <div className={styles.summaryCardLabel}>Awaiting Grade</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={`${styles.summaryCardValue} ${styles.success}`}>
            {mockAssignments.filter(a => a.status === 'graded').length}
          </div>
          <div className={styles.summaryCardLabel}>Graded</div>
        </div>
      </div>

      {/* Assignments Table with Tabs */}
      <Card className={styles.tableContainer}>
        <Tabs tabs={tabs} />
      </Card>
    </MainLayout>
  );
};

export default AssignmentsPage;

