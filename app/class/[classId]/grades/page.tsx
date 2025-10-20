'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import { Card, Button, Badge, Select, Table, Chart, StatCard } from '../../../components/ui';
import type { TableColumn } from '../../../components/ui';
import { mockGrades } from '../../../data/mockData';
import styles from './grades.module.css';

const GradesPage = () => {
  const params = useParams();
  const classId = params.classId as string;
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredGrades = selectedSubject === 'all' 
    ? mockGrades 
    : mockGrades.filter(g => g.subject === selectedSubject);

  // Calculate statistics
  const averageScore = filteredGrades.reduce((acc, g) => acc + (g.score / g.maxScore * 100), 0) / filteredGrades.length;
  const highestScore = Math.max(...filteredGrades.map(g => g.score / g.maxScore * 100));
  const lowestScore = Math.min(...filteredGrades.map(g => g.score / g.maxScore * 100));

  // Chart data for grade trends
  const trendData = filteredGrades.slice(-6).map(g => ({
    label: new Date(g.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.round(g.score / g.maxScore * 100),
  }));

  // Subject performance data
  const subjectPerformance = ['Math', 'English', 'Physics'].map(subject => {
    const subjectGrades = mockGrades.filter(g => g.subject === subject);
    const avg = subjectGrades.reduce((acc, g) => acc + (g.score / g.maxScore * 100), 0) / subjectGrades.length;
    return { subject, average: avg || 0, count: subjectGrades.length };
  });

  const gradeColumns: TableColumn[] = [
    {
      key: 'assignment',
      title: 'Assignment',
      dataIndex: 'assignmentName',
      render: (value: string, record: any) => (
        <div>
          <div className="font-medium text-[var(--gray-900)]">{value}</div>
          <div className="text-xs text-[var(--gray-500)]">{record.subject}</div>
        </div>
      ),
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      width: '120px',
      render: (value: string) => (
        <span className="text-sm text-[var(--gray-700)]">
          {new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
    },
    {
      key: 'score',
      title: 'Score',
      dataIndex: 'score',
      width: '120px',
      align: 'center',
      render: (value: number, record: any) => {
        const percentage = (value / record.maxScore * 100);
        const color = percentage >= 90 ? 'success' : percentage >= 80 ? 'info' : percentage >= 70 ? 'warning' : 'error';
        return (
          <Badge variant={color as any}>
            {value} / {record.maxScore}
          </Badge>
        );
      },
    },
    {
      key: 'percentage',
      title: 'Percentage',
      dataIndex: 'score',
      width: '120px',
      align: 'center',
      render: (value: number, record: any) => {
        const percentage = (value / record.maxScore * 100).toFixed(1);
        return (
          <span className="text-sm font-semibold text-[var(--gray-900)]">
            {percentage}%
          </span>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'assignmentId',
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

  return (
    <MainLayout>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>My Grades</h1>
          <p className={styles.headerDescription}>Track your academic performance and progress</p>
        </div>
        <Select
          options={[
            { value: 'all', label: 'All Subjects' },
            { value: 'Math', label: 'Math' },
            { value: 'English', label: 'English' },
            { value: 'Physics', label: 'Physics' },
          ]}
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        />
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Average Score"
          value={`${averageScore.toFixed(1)}%`}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          color="var(--primary-blue)"
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Highest Score"
          value={`${highestScore.toFixed(1)}%`}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          color="var(--success-green)"
        />
        <StatCard
          title="Total Graded"
          value={filteredGrades.length}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
              <path d="M9 11h6M9 15h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          color="var(--purple)"
        />
      </div>

      <div className={styles.contentGrid}>
        {/* Grade Trend Chart */}
        <Card className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Grade Trends</h2>
          </div>
          <div style={{ flex: 1, minHeight: 0, marginBottom: '1rem' }}>
            <Chart data={trendData} height={280} />
          </div>
          <div className={styles.chartFooter}>
            <div className={styles.chartStats}>
              <div className={styles.chartStat}>
                <div className={styles.chartStatLabel}>Trending</div>
                <div className={`${styles.chartStatValue} ${styles.success}`}>↑ 5.2%</div>
              </div>
              <div className={styles.chartStat}>
                <div className={styles.chartStatLabel}>Best Subject</div>
                <div className={`${styles.chartStatValue} ${styles.primary}`}>English</div>
              </div>
              <div className={styles.chartStat}>
                <div className={styles.chartStatLabel}>Assignments</div>
                <div className={`${styles.chartStatValue} ${styles.primary}`}>{filteredGrades.length}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Subject Performance */}
        <Card className={styles.subjectCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Subject Performance</h2>
          </div>
          <div className={styles.subjectList}>
            {subjectPerformance.map((subject) => (
              <div key={subject.subject} className={styles.subjectItem}>
                <div className={styles.subjectHeader}>
                  <span className={styles.subjectName}>{subject.subject}</span>
                  <span className={styles.subjectScore}>
                    {subject.average.toFixed(1)}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${subject.average}%` }}
                  />
                </div>
                <div className={styles.subjectCount}>
                  {subject.count} assignments
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="primary" 
            size="small" 
            fullWidth 
            onClick={() => window.location.href = '/magic-toolkits/analysis'}
          >
            View Detailed Analysis
          </Button>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className={styles.insightsCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>AI Learning Insights</h2>
        </div>
        <div className={styles.insightsGrid}>
          <div className={`${styles.insightItem} ${styles.success}`}>
            <div className={`${styles.insightIcon} ${styles.success}`}>✓</div>
            <div className={styles.insightContent}>
              <h3 className={`${styles.insightTitle} ${styles.success}`}>Strong Areas</h3>
              <p className={`${styles.insightText} ${styles.success}`}>
                Excellent performance in Reading Comprehension and Grammar
              </p>
            </div>
          </div>
          <div className={`${styles.insightItem} ${styles.warning}`}>
            <div className={`${styles.insightIcon} ${styles.warning}`}>!</div>
            <div className={styles.insightContent}>
              <h3 className={`${styles.insightTitle} ${styles.warning}`}>Needs Attention</h3>
              <p className={`${styles.insightText} ${styles.warning}`}>
                Focus on Complex Problem Solving and Motion Physics
              </p>
            </div>
          </div>
          <div className={`${styles.insightItem} ${styles.info}`}>
            <div className={`${styles.insightIcon} ${styles.info}`}>→</div>
            <div className={styles.insightContent}>
              <h3 className={`${styles.insightTitle} ${styles.info}`}>Recommended</h3>
              <p className={`${styles.insightText} ${styles.info}`}>
                Review Chapter 2 concepts and practice more exercises
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Grades Table */}
      <Card className={styles.gradesSection}>
        <div className={styles.gradesSectionHeader}>
          <h2 className={styles.sectionTitle}>Grade History</h2>
          <Button variant="ghost" size="small">
            Download Report
          </Button>
        </div>
        <Table columns={gradeColumns} data={filteredGrades} />
      </Card>
    </MainLayout>
  );
};

export default GradesPage;

