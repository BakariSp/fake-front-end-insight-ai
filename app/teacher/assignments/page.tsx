'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './assignments.module.css';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  totalPoints: number;
  taskCount: number;
  status: 'draft' | 'published' | 'archived';
  classCount: number;
  submissionRate?: number;
}

export default function AssignmentsPage() {
  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: '第一单元综合练习',
      subject: '数学',
      dueDate: '2025-11-20',
      totalPoints: 100,
      taskCount: 5,
      status: 'published',
      classCount: 2,
      submissionRate: 67
    },
    {
      id: '2',
      title: '函数与方程测验',
      subject: '数学',
      dueDate: '2025-11-25',
      totalPoints: 80,
      taskCount: 4,
      status: 'published',
      classCount: 3,
      submissionRate: 95
    },
    {
      id: '3',
      title: '期中复习作业',
      subject: '数学',
      dueDate: '2025-11-30',
      totalPoints: 150,
      taskCount: 8,
      status: 'draft',
      classCount: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#52c41a';
      case 'draft': return '#faad14';
      case 'archived': return '#8c8c8c';
      default: return '#d9d9d9';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return '已发布';
      case 'draft': return '草稿';
      case 'archived': return '已归档';
      default: return status;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>作业管理</h1>
          <p className={styles.subtitle}>创建、编辑和管理您的作业</p>
        </div>
        <Link href="/teacher/assignments/new">
          <button className={styles.createButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            创建新作业
          </button>
        </Link>
      </div>

      <div className={styles.filters}>
        <button className={styles.filterButton + ' ' + styles.active}>全部</button>
        <button className={styles.filterButton}>已发布</button>
        <button className={styles.filterButton}>草稿</button>
        <button className={styles.filterButton}>已归档</button>
      </div>

      <div className={styles.assignmentList}>
        {assignments.map(assignment => (
          <div key={assignment.id} className={styles.assignmentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <h3>{assignment.title}</h3>
                <span 
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(assignment.status) }}
                >
                  {getStatusLabel(assignment.status)}
                </span>
              </div>
              <div className={styles.cardActions}>
                {assignment.status === 'draft' && (
                  <Link href={`/teacher/assignments/${assignment.id}/edit`}>
                    <button className={styles.editButton}>编辑</button>
                  </Link>
                )}
                {assignment.status === 'published' && (
                  <button className={styles.viewButton}>查看</button>
                )}
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>科目:</span>
                  <span className={styles.infoValue}>{assignment.subject}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>截止时间:</span>
                  <span className={styles.infoValue}>{assignment.dueDate}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>任务数:</span>
                  <span className={styles.infoValue}>{assignment.taskCount} 个</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>总分:</span>
                  <span className={styles.infoValue}>{assignment.totalPoints} 分</span>
                </div>
              </div>

              {assignment.status === 'published' && (
                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span>提交进度</span>
                    <span className={styles.progressValue}>{assignment.submissionRate}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${assignment.submissionRate}%` }}
                    />
                  </div>
                  <div className={styles.classInfo}>
                    {assignment.classCount} 个班级
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>还没有作业</h3>
          <p>点击"创建新作业"按钮开始创建</p>
          <Link href="/teacher/assignments/new">
            <button className={styles.createButtonLarge}>创建新作业</button>
          </Link>
        </div>
      )}
    </div>
  );
}

