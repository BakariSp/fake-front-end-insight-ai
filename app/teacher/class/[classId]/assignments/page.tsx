'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@ui';
import { mockClassAssignments } from './mockData';
import styles from './assignments.module.css';

const TeacherClassAssignmentsPage = () => {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 关闭菜单当点击外部时
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 筛选作业
  const allAssignments = mockClassAssignments.filter(a => a.classId === classId);
  
  const getFilteredAssignments = () => {
    if (activeFilter === 'all') return allAssignments;
    return allAssignments.filter(a => a.status === activeFilter);
  };

  const filteredAssignments = getFilteredAssignments();

  // 删除作业
  const handleDeleteAssignment = (assignmentId: string, assignmentTitle: string) => {
    if (confirm(`确定要删除作业"${assignmentTitle}"吗？\n\n⚠️ 此操作无法撤销！`)) {
      // TODO: 调用API删除作业
      console.log('删除作业:', assignmentId);
      alert('作业已删除');
      setOpenMenuId(null);
    }
  };

  // 切换菜单
  const toggleMenu = (assignmentId: string) => {
    setOpenMenuId(openMenuId === assignmentId ? null : assignmentId);
  };

  // 获取状态配置 - 四状态模型
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return { label: '草稿', color: '#FF9800', bgColor: '#FFF3E0' };
      case 'published':
        return { label: '收集中', color: '#4F7FFF', bgColor: '#E3F2FD' };
      case 'grading':
        return { label: '批改中', color: '#722ED1', bgColor: '#F9F0FF' };
      case 'graded':
        return { label: '已完成', color: '#52C41A', bgColor: '#F6FFED' };
      default:
        return { label: status, color: '#8C8C8C', bgColor: '#F5F5F5' };
    }
  };

  // Stats calculation
  const stats = {
    total: allAssignments.length,
    draft: allAssignments.filter(a => a.status === 'draft').length,
    published: allAssignments.filter(a => a.status === 'published').length,
    grading: allAssignments.filter(a => a.status === 'grading').length,
    graded: allAssignments.filter(a => a.status === 'graded').length,
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Assignments</h1>
        </div>
        <Button 
          variant="primary"
          onClick={() => router.push('/teacher/assignments/new')}
        >
          New Assignment
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          All
          <span className={styles.filterCount}>{stats.total}</span>
        </button>
        <button 
          className={`${styles.filterTab} ${activeFilter === 'draft' ? styles.active : ''}`}
          onClick={() => setActiveFilter('draft')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M12 2L14 4L6 12H4V10L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M10 4L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Draft
          <span className={styles.filterCount}>{stats.draft}</span>
        </button>
        <button 
          className={`${styles.filterTab} ${activeFilter === 'published' ? styles.active : ''}`}
          onClick={() => setActiveFilter('published')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Published
          <span className={styles.filterCount}>{stats.published}</span>
        </button>
        <button 
          className={`${styles.filterTab} ${activeFilter === 'grading' ? styles.active : ''}`}
          onClick={() => setActiveFilter('grading')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L11 7h5l-4 3.5L14 16l-5-3.5L4 16l2-5.5L2 7h5z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Grading
          <span className={styles.filterCount}>{stats.grading}</span>
        </button>
        <button 
          className={`${styles.filterTab} ${activeFilter === 'graded' ? styles.active : ''}`}
          onClick={() => setActiveFilter('graded')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L11 7h5l-4 3.5L14 16l-5-3.5L4 16l2-5.5L2 7h5z" fill="currentColor"/>
          </svg>
          Graded
          <span className={styles.filterCount}>{stats.graded}</span>
        </button>
      </div>

      {/* Assignments Table */}
      <div className={styles.assignmentsTable}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div className={styles.columnAssignment}>ASSIGNMENTS</div>
          <div className={styles.columnStatus}>STATUS</div>
          <div className={styles.columnAiGrading}>AI GRADING</div>
          <div className={styles.columnSubmissions}>SUBMISSIONS</div>
          <div className={styles.columnDate}>DUE DATE</div>
          <div className={styles.columnDetails}>DETAILS</div>
        </div>

        {/* Table Body */}
        <div className={styles.tableBody}>
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => {
              const statusConfig = getStatusConfig(assignment.status);
              const isPastDue = new Date(assignment.dueDate) < new Date();
              const hasSubmissions = assignment.stats.submitted > 0;
              const isGrading = assignment.status === 'grading';
              const isGraded = assignment.status === 'graded';
              
              return (
                <div key={assignment.id} className={styles.tableRow}>
                  <div className={styles.columnAssignment}>
                    <div className={styles.assignmentIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className={styles.assignmentInfo}>
                      <h3 className={styles.assignmentName}>{assignment.title}</h3>
                    </div>
                  </div>
                  <div className={styles.columnStatus}>
                    <span 
                      className={styles.statusBadge}
                      style={{ 
                        color: statusConfig.color, 
                        backgroundColor: statusConfig.bgColor 
                      }}
                    >
                      {statusConfig.label.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.columnAiGrading}>
                    {assignment.status === 'draft' ? (
                      <span className={styles.aiGradingNotAvailable}>-</span>
                    ) : isGraded && assignment.stats.avgScore ? (
                      <div className={styles.aiGradingCompleted}>
                        <div className={styles.aiGradingBadge}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L10 5.5L15 6L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6L6 5.5L8 1Z" fill="currentColor"/>
                          </svg>
                          <span className={styles.aiGradingLabel}>AI Graded</span>
                        </div>
                        <div className={styles.aiGradingScore}>
                          Avg: <strong>{assignment.stats.avgScore.toFixed(1)}</strong>
                        </div>
                      </div>
                    ) : isGrading ? (
                      <div className={styles.aiGradingInProgress}>
                        <div className={styles.aiGradingBadge}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.spinIcon}>
                            <path d="M8 2v4M8 10v4M2 8h4M10 8h4M4.93 4.93l2.83 2.83M8.24 8.24l2.83 2.83M4.93 11.07l2.83-2.83M8.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span className={styles.aiGradingLabel}>Grading...</span>
                        </div>
                        <div className={styles.aiGradingProgress}>
                          {assignment.stats.graded}/{assignment.stats.submitted}
                        </div>
                      </div>
                    ) : isPastDue && hasSubmissions ? (
                      <button 
                        className={styles.aiGradingReadyButton}
                        onClick={() => {
                          // TODO: Trigger AI grading
                          alert('Start AI Grading for: ' + assignment.title);
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L10 5.5L15 6L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6L6 5.5L8 1Z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        Start AI Grading
                      </button>
                    ) : (
                      <span className={styles.aiGradingPending}>Waiting...</span>
                    )}
                  </div>
                  <div className={styles.columnSubmissions}>
                    {assignment.status === 'draft' ? (
                      <span className={styles.submissionsText}>-</span>
                    ) : (
                      <div className={styles.submissionsWrapper}>
                        <span className={styles.submissionsText}>
                          {assignment.stats.submitted}/{assignment.stats.totalStudents}
                        </span>
                        <div className={styles.submissionsBar}>
                          <div 
                            className={styles.submissionsBarFill}
                            style={{ 
                              width: `${(assignment.stats.submitted / assignment.stats.totalStudents) * 100}%`,
                              backgroundColor: assignment.stats.submitted === assignment.stats.totalStudents ? '#52C41A' : '#4F7FFF'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.columnDate}>
                    {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                      month: '2-digit', 
                      day: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                  <div className={styles.columnDetails}>
                    <button 
                      className={styles.viewButton}
                      onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignment.id}`)}
                    >
                      View
                    </button>
                    
                    {/* 省略号菜单 */}
                    <div className={styles.menuWrapper} ref={openMenuId === assignment.id ? menuRef : null}>
                      <button 
                        className={styles.menuButton}
                        onClick={() => toggleMenu(assignment.id)}
                        aria-label="More options"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                          <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                          <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                        </svg>
                      </button>
                      
                      {openMenuId === assignment.id && (
                        <div className={styles.dropdownMenu}>
                          {assignment.status === 'draft' && (
                            <button 
                              className={styles.menuItem}
                              onClick={() => {
                                router.push(`/teacher/assignments/${assignment.id}/edit`);
                                setOpenMenuId(null);
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M11 2L13 4L5 12H3V10L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M9 4L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                              编辑作业
                            </button>
                          )}
                          <button 
                            className={styles.menuItem}
                            onClick={() => {
                              router.push(`/teacher/class/${classId}/assignments/${assignment.id}`);
                              setOpenMenuId(null);
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8 3a5 5 0 100 10A5 5 0 008 3z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M8 5.5v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            查看详情
                          </button>
                          <div className={styles.menuDivider}></div>
                          <button 
                            className={`${styles.menuItem} ${styles.menuItemDanger}`}
                            onClick={() => handleDeleteAssignment(assignment.id, assignment.title)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            删除作业
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 28h24M20 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>No assignments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassAssignmentsPage;

