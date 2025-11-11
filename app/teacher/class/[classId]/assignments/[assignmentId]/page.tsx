'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Button, Badge, Tabs } from '@ui';
import type { Tab } from '@ui';
import { 
  getAssignmentById, 
  getSubmissionsByAssignmentId, 
  getAnalyticsByAssignmentId 
} from '../mockData';
import styles from './assignmentDetail.module.css';

const AssignmentDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const assignmentId = params.assignmentId as string;
  
  const assignment = getAssignmentById(assignmentId);
  const submissions = getSubmissionsByAssignmentId(assignmentId);
  const analytics = getAnalyticsByAssignmentId(assignmentId);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  // 渲染分数分布图表
  const renderScoreDistribution = () => {
    if (!analytics) return null;

    const maxCount = Math.max(...analytics.scoreDistribution.map(s => s.count));

    return (
      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Score Distribution</h3>
        <div className={styles.barChart}>
          {analytics.scoreDistribution.map((range, index) => (
            <div key={index} className={styles.barGroup}>
              <div className={styles.barWrapper}>
                <div 
                  className={styles.bar}
                  style={{ 
                    height: `${(range.count / maxCount) * 100}%`,
                    backgroundColor: getScoreRangeColor(range.range)
                  }}
                >
                  <span className={styles.barValue}>{range.count}</span>
                </div>
              </div>
              <div className={styles.barLabel}>{range.range}</div>
              <div className={styles.barPercentage}>{range.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 获取分数区间颜色
  const getScoreRangeColor = (range: string) => {
    if (range.startsWith('90')) return 'var(--success-green)';
    if (range.startsWith('80')) return 'var(--primary-blue)';
    if (range.startsWith('70')) return 'var(--warning-yellow)';
    if (range.startsWith('60')) return 'var(--warning-orange)';
    return 'var(--error-red)';
  };

  // 渲染题目难度分析
  const renderQuestionDifficulty = () => {
    if (!analytics) return null;

    return (
      <div className={styles.difficultySection}>
        <h3 className={styles.sectionTitle}>Question Difficulty Analysis</h3>
        <div className={styles.difficultyList}>
          {analytics.questionDifficulty.map((q, index) => (
            <div key={q.questionId} className={styles.difficultyCard}>
              <div className={styles.difficultyHeader}>
                <div className={styles.questionInfo}>
                  <span className={styles.questionNumber}>Q{index + 1}</span>
                  <span className={styles.questionTitle}>{q.questionTitle}</span>
                </div>
                <Badge 
                  variant={
                    q.difficulty === 'easy' ? 'success' : 
                    q.difficulty === 'medium' ? 'warning' : 
                    'danger'
                  }
                >
                  {q.difficulty.toUpperCase()}
                </Badge>
              </div>
              <div className={styles.difficultyStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Correct Rate:</span>
                  <span className={styles.statValue}>{q.correctRate}%</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Avg Score:</span>
                  <span className={styles.statValue}>{q.avgScore.toFixed(1)}</span>
                </div>
              </div>
              {q.commonMistakes && q.commonMistakes.length > 0 && (
                <div className={styles.mistakes}>
                  <div className={styles.mistakesTitle}>Common Mistakes:</div>
                  <ul className={styles.mistakesList}>
                    {q.commonMistakes.map((mistake, i) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染薄弱点分析
  const renderWeakPoints = () => {
    if (!analytics || !analytics.weakPoints.length) return null;

    return (
      <div className={styles.weakPointsSection}>
        <h3 className={styles.sectionTitle}>Weak Points Analysis</h3>
        <div className={styles.weakPointsList}>
          {analytics.weakPoints.map((point) => (
            <div key={point.id} className={styles.weakPointCard}>
              <div className={styles.weakPointHeader}>
                <h4 className={styles.weakPointTopic}>{point.topic}</h4>
                <div className={styles.affectedBadge}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM14 14a6 6 0 00-12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {point.affectedStudents} students ({point.percentage}%)
                </div>
              </div>
              <p className={styles.weakPointDescription}>{point.description}</p>
              <div className={styles.weakPointSuggestions}>
                <div className={styles.suggestionsTitle}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Suggestions:
                </div>
                <ul className={styles.suggestionsList}>
                  {point.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染优秀表现
  const renderStrengths = () => {
    if (!analytics || !analytics.strengths.length) return null;

    return (
      <div className={styles.strengthsSection}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12 7h5l-4 3.5L15 16l-5-3.5L5 16l2-5.5L3 7h5z" fill="var(--success-green)"/>
          </svg>
          Strengths
        </h3>
        <ul className={styles.strengthsList}>
          {analytics.strengths.map((strength, i) => (
            <li key={i} className={styles.strengthItem}>{strength}</li>
          ))}
        </ul>
      </div>
    );
  };

  // 渲染学生列表
  const renderStudentList = () => {
    return (
      <div className={styles.studentListSection}>
        <div className={styles.studentListHeader}>
          <h3 className={styles.sectionTitle}>Student Submissions</h3>
          <Button 
            variant="primary"
            onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review`)}
          >
            Start Review
          </Button>
        </div>
        <div className={styles.studentList}>
          {submissions.map((submission) => (
            <div key={submission.id} className={styles.studentCard}>
              <div className={styles.studentAvatar}>
                <img src={submission.studentAvatar} alt={submission.studentName} />
              </div>
              <div className={styles.studentInfo}>
                <h4 className={styles.studentName}>{submission.studentName}</h4>
                <p className={styles.submitTime}>
                  {submission.submitTime ? `Submitted: ${submission.submitTime}` : 'Not submitted'}
                </p>
              </div>
              <div className={styles.studentScore}>
                {submission.aiScore !== undefined ? (
                  <>
                    <div className={styles.scoreValue}>{submission.aiScore}</div>
                    <div className={styles.scoreLabel}>AI Score</div>
                  </>
                ) : (
                  <div className={styles.noScore}>-</div>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="small"
                onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review?student=${submission.studentId}`)}
              >
                Review
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Overview Tab
  const overviewTab = (
    <div className={styles.overviewContent}>
      {/* 整体统计卡片 */}
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--primary-blue-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.submitted}/{assignment.stats.totalStudents}</div>
            <div className={styles.statLabel}>Submissions</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--success-green-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 9h7l-5.5 4L19 22l-7-5-7 5 2.5-9L2 9h7z" fill="var(--success-green)"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.avgScore?.toFixed(1) || '-'}</div>
            <div className={styles.statLabel}>Average Score</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--warning-yellow-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--warning-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.maxScore || '-'}</div>
            <div className={styles.statLabel}>Highest Score</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--error-red-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--error-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.minScore || '-'}</div>
            <div className={styles.statLabel}>Lowest Score</div>
          </div>
        </div>
      </div>

      {/* 分数分布 */}
      <Card className={styles.card}>
        {renderScoreDistribution()}
      </Card>

      {/* 优秀表现 */}
      {renderStrengths()}
    </div>
  );

  // Analysis Tab
  const analysisTab = (
    <div className={styles.analysisContent}>
      <Card className={styles.card}>
        {renderQuestionDifficulty()}
      </Card>
      
      <Card className={styles.card}>
        {renderWeakPoints()}
      </Card>
    </div>
  );

  // Students Tab
  const studentsTab = (
    <div className={styles.studentsContent}>
      {renderStudentList()}
    </div>
  );

  const tabs: Tab[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      content: overviewTab,
    },
    {
      key: 'analysis',
      label: 'Analysis',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 14l4-4 3 3 7-7M16 6v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: analysisTab,
    },
    {
      key: 'students',
      label: `Students (${submissions.length})`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M12 10a4 4 0 100-8 4 4 0 000 8zM2 16a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      content: studentsTab,
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <Button 
          variant="ghost" 
          onClick={() => router.push(`/teacher/class/${classId}/assignments`)}
          className={styles.backButton}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Button>
        
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>{assignment.title}</h1>
            <div className={styles.headerMeta}>
              <Badge variant={assignment.status === 'graded' ? 'success' : 'info'}>
                {assignment.status === 'graded' ? 'Graded' : 'Published'}
              </Badge>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.subject}>{assignment.subject}</span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.dueDate}>Due: {assignment.dueDate}</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <Button 
              variant="primary"
              onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review`)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12 7h5l-4 3.5L15 16l-5-3.5L5 16l2-5.5L3 7h5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              Start Review
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default AssignmentDetailPage;

