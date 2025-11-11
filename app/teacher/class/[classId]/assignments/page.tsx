'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Button, Badge, Tabs, Table, EmptyState, SearchBar } from '@ui';
import type { TableColumn, Tab } from '@ui';
import { mockClassAssignments } from './mockData';
import styles from './assignments.module.css';

const TeacherClassAssignmentsPage = () => {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const [searchQuery, setSearchQuery] = useState('');

  // 筛选作业
  const getFilteredAssignments = (status?: string) => {
    let filtered = mockClassAssignments.filter(a => a.classId === classId);
    
    if (status) {
      filtered = filtered.filter(a => a.status === status);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // 获取状态标签配置
  const getStatusBadgeConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return { label: 'Draft', variant: 'warning' as const };
      case 'published':
        return { label: 'Published', variant: 'info' as const };
      case 'graded':
        return { label: 'Graded', variant: 'success' as const };
      default:
        return { label: status, variant: 'secondary' as const };
    }
  };

  // 表格列定义
  const columns: TableColumn[] = [
    {
      key: 'title',
      title: 'Assignment Title',
      dataIndex: 'title',
      render: (value: string, record: any) => (
        <div className={styles.assignmentTitleCell}>
          <h3 className={styles.assignmentTitle}>{value}</h3>
          <div className={styles.assignmentMeta}>
            <span className={styles.subject}>{record.subject}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.points}>{record.totalPoints} pts</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.questionCount}>{record.questions.length} questions</span>
          </div>
        </div>
      ),
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      dataIndex: 'dueDate',
      width: '150px',
      render: (value: string) => (
        <div className={styles.dateCell}>
          <div className={styles.date}>{new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          <div className={styles.time}>{new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '120px',
      render: (value: string) => {
        const config = getStatusBadgeConfig(value);
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      key: 'stats',
      title: 'Submissions',
      dataIndex: 'stats',
      width: '150px',
      render: (stats: any) => (
        <div className={styles.statsCell}>
          <div className={styles.statsProgress}>
            <div className={styles.statsBar}>
              <div 
                className={styles.statsBarFill}
                style={{ width: `${(stats.submitted / stats.totalStudents) * 100}%` }}
              />
            </div>
            <span className={styles.statsText}>{stats.submitted}/{stats.totalStudents}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'avgScore',
      title: 'Avg Score',
      dataIndex: 'stats',
      width: '100px',
      align: 'center',
      render: (stats: any) => (
        stats.avgScore ? (
          <span className={styles.avgScore}>{stats.avgScore.toFixed(1)}</span>
        ) : (
          <span className={styles.noScore}>-</span>
        )
      ),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'id',
      width: '150px',
      align: 'right',
      render: (id: string, record: any) => (
        <div className={styles.actionButtons}>
          {record.status === 'draft' && (
            <Button 
              variant="ghost" 
              size="small"
              onClick={() => router.push(`/teacher/assignments/${id}/edit`)}
            >
              Edit
            </Button>
          )}
          {record.status === 'published' && (
            <Button 
              variant="ghost" 
              size="small"
              onClick={() => router.push(`/teacher/class/${classId}/assignments/${id}`)}
            >
              Monitor
            </Button>
          )}
          {record.status === 'graded' && (
            <Button 
              variant="primary" 
              size="small"
              onClick={() => router.push(`/teacher/class/${classId}/assignments/${id}`)}
            >
              View Results
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Tab配置
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
            <Table columns={columns} data={getFilteredAssignments()} />
          ) : (
            <EmptyState
              icon={
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 28h24M20 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
              title="No assignments found"
              description="Create your first assignment to get started."
            />
          )}
        </div>
      ),
    },
    {
      key: 'draft',
      label: `Draft (${getFilteredAssignments('draft').length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M12 2L14 4L6 12H4V10L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10 4L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments('draft').length > 0 ? (
            <Table columns={columns} data={getFilteredAssignments('draft')} />
          ) : (
            <EmptyState
              title="No draft assignments"
              description="All your assignments have been published."
            />
          )}
        </div>
      ),
    },
    {
      key: 'published',
      label: `Published (${getFilteredAssignments('published').length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 8l7-6 7 6v7a1 1 0 01-1 1H3a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M6 15V9h6v6" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments('published').length > 0 ? (
            <Table columns={columns} data={getFilteredAssignments('published')} />
          ) : (
            <EmptyState
              title="No published assignments"
              description="Publish your draft assignments to make them available to students."
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
          <path d="M9 2L11 7h5l-4 3.5L14 16l-5-3.5L4 16l2-5.5L2 7h5z" fill="currentColor"/>
        </svg>
      ),
      content: (
        <div>
          {getFilteredAssignments('graded').length > 0 ? (
            <Table columns={columns} data={getFilteredAssignments('graded')} />
          ) : (
            <EmptyState
              title="No graded assignments"
              description="Assignments with AI grading completed will appear here."
            />
          )}
        </div>
      ),
    },
  ];

  const stats = {
    total: getFilteredAssignments().length,
    draft: getFilteredAssignments('draft').length,
    published: getFilteredAssignments('published').length,
    graded: getFilteredAssignments('graded').length,
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Class Assignments</h1>
          <p className={styles.pageSubtitle}>
            {mockClassAssignments.find(a => a.classId === classId)?.className || 'Class'}
          </p>
        </div>
        <div className={styles.headerRight}>
          <Button 
            variant="primary"
            onClick={() => router.push('/teacher/assignments/new')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total Assignments</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.warning}`}>{stats.draft}</div>
          <div className={styles.statLabel}>Drafts</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.info}`}>{stats.published}</div>
          <div className={styles.statLabel}>Published</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.success}`}>{stats.graded}</div>
          <div className={styles.statLabel}>Graded</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <SearchBar
          placeholder="Search assignments by title or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          fullWidth
        />
      </div>

      {/* Assignments Table with Tabs */}
      <Card className={styles.tableCard}>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default TeacherClassAssignmentsPage;

