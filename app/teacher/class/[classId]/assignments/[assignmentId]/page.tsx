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

type ActiveDetailView = 'submissions' | 'avgScore' | 'maxScore' | 'minScore' | null;

const AssignmentDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const assignmentId = params.assignmentId as string;
  const [showFullContent, setShowFullContent] = useState(false);
  const [activeDetailView, setActiveDetailView] = useState<ActiveDetailView>(null);
  
  const assignment = getAssignmentById(assignmentId);
  const submissions = getSubmissionsByAssignmentId(assignmentId);
  const analytics = getAnalyticsByAssignmentId(assignmentId);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  // Check if assignment is past due date
  const isPastDue = new Date(assignment.dueDate) < new Date();
  const hasSubmissions = assignment.stats.submitted > 0;
  const hasAIGrading = assignment.status === 'graded' && analytics;

  // Toggle detail view
  const handleStatClick = (view: ActiveDetailView) => {
    setActiveDetailView(activeDetailView === view ? null : view);
  };

  // Get submitted and not submitted students
  const submittedStudents = submissions.filter(s => s.submitTime);
  const notSubmittedStudents = submissions.filter(s => !s.submitTime);

  // 渲染提交状态指示器
  const renderSubmissionIndicator = () => {
    const submissionRate = (assignment.stats.submitted / assignment.stats.totalStudents) * 100;
    const allSubmitted = assignment.stats.submitted === assignment.stats.totalStudents;

    return (
      <Card className={styles.submissionIndicatorCard}>
        <div className={styles.submissionIndicator}>
          <div className={styles.indicatorHeader}>
            <div className={styles.indicatorTitle}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 8v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15 3l2 2-7 7-3 1 1-3 7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Submission Status
            </div>
            <div className={styles.submissionCount}>
              <span className={styles.submitted}>{assignment.stats.submitted}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.total}>{assignment.stats.totalStudents}</span>
            </div>
          </div>
          
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${allSubmitted ? styles.complete : ''}`}
                style={{ width: `${submissionRate}%` }}
              />
            </div>
            <span className={styles.progressText}>{submissionRate.toFixed(0)}% submitted</span>
          </div>

          {!allSubmitted && isPastDue && (
            <div className={styles.incompleteWarning}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 6v3M8 11h.01M15 8A7 7 0 111 8a7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>{assignment.stats.notSubmitted} student(s) haven't submitted yet. You can still review available submissions.</span>
            </div>
          )}

          {allSubmitted && (
            <div className={styles.completeMessage}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 4L6 11 3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>All students have submitted their work!</span>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // 渲染作业内容预览（紧凑版）
  const renderAssignmentPreview = () => {
    return (
      <Card className={styles.assignmentPreviewCard}>
        <div className={styles.assignmentPreview}>
          <div className={styles.previewHeader}>
            <h3 className={styles.previewTitle}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 1H3a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V5l-5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M11 1v4h4M9 9H5M13 13H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Assignment Content
            </h3>
            <Button 
              variant="ghost" 
              size="small"
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? 'Hide Details' : 'View Details'}
            </Button>
          </div>

          <div className={styles.previewMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Total Points:</span>
              <span className={styles.metaValue}>{assignment.totalPoints}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Questions:</span>
              <span className={styles.metaValue}>{assignment.questions.length}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Due Date:</span>
              <span className={styles.metaValue}>
                {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {assignment.description && (
            <div className={styles.previewDescription}>
              <p>{assignment.description}</p>
            </div>
          )}

          {showFullContent && (
            <div className={styles.questionsList}>
              <h4 className={styles.questionsTitle}>Questions:</h4>
              {assignment.questions.map((question, index) => (
                <div key={question.id} className={styles.questionItem}>
                  <div className={styles.questionHeader}>
                    <span className={styles.questionNumber}>Q{index + 1}</span>
                    <span className={styles.questionType}>
                      {question.type === 'choice' ? 'Multiple Choice' : 
                       question.type === 'fill-blank' ? 'Fill in Blank' : 'Essay'}
                    </span>
                    <span className={styles.questionPoints}>{question.points} pts</span>
                  </div>
                  <div className={styles.questionContent}>
                    {question.content.length > 100 && !showFullContent 
                      ? `${question.content.substring(0, 100)}...` 
                      : question.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  };

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

  // 渲染详细信息区域 - 根据点击的统计卡片显示
  const renderDetailView = () => {
    if (!activeDetailView) return null;

    switch (activeDetailView) {
      case 'submissions':
        return renderSubmissionsDetail();
      case 'avgScore':
        return renderScoreDistributionDetail();
      case 'maxScore':
        return renderTopStudentsDetail();
      case 'minScore':
        return renderBottomStudentsDetail();
      default:
        return null;
    }
  };

  // 提交详情 - 显示已提交和未提交学生
  const renderSubmissionsDetail = () => {
    return (
      <Card className={styles.detailCard}>
        <div className={styles.detailHeader}>
          <h3 className={styles.detailTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Submission Details
          </h3>
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => setActiveDetailView(null)}
          >
            Close
          </Button>
        </div>

        <div className={styles.submissionTabs}>
          <div className={styles.tabHeader}>
            <button className={`${styles.tab} ${styles.activeTab}`}>
              All Students ({submissions.length})
            </button>
            <button className={styles.tab}>
              Submitted ({submittedStudents.length})
            </button>
            <button className={styles.tab}>
              Not Submitted ({notSubmittedStudents.length})
            </button>
          </div>
        </div>

        <div className={styles.studentTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCol}>Student</div>
            <div className={styles.tableCol}>Status</div>
            <div className={styles.tableCol}>Submit Time</div>
            <div className={styles.tableCol}>Score</div>
            <div className={styles.tableCol}>Action</div>
          </div>
          <div className={styles.tableBody}>
            {/* Not submitted students first - highlighted */}
            {notSubmittedStudents.map((submission) => (
              <div key={submission.id} className={`${styles.tableRow} ${styles.notSubmitted}`}>
                <div className={styles.tableCol}>
                  <div className={styles.studentInfo}>
                    <img src={submission.studentAvatar} alt={submission.studentName} className={styles.tableAvatar} />
                    <span className={styles.studentName}>{submission.studentName}</span>
                  </div>
                </div>
                <div className={styles.tableCol}>
                  <Badge variant="warning">Not Submitted</Badge>
                </div>
                <div className={styles.tableCol}>
                  <span className={styles.emptyText}>-</span>
                </div>
                <div className={styles.tableCol}>
                  <span className={styles.emptyText}>-</span>
                </div>
                <div className={styles.tableCol}>
                  <span className={styles.disabledText}>-</span>
                </div>
              </div>
            ))}
            {/* Submitted students */}
            {submittedStudents.map((submission) => (
              <div key={submission.id} className={styles.tableRow}>
                <div className={styles.tableCol}>
                  <div className={styles.studentInfo}>
                    <img src={submission.studentAvatar} alt={submission.studentName} className={styles.tableAvatar} />
                    <span className={styles.studentName}>{submission.studentName}</span>
                  </div>
                </div>
                <div className={styles.tableCol}>
                  <Badge variant="success">Submitted</Badge>
                </div>
                <div className={styles.tableCol}>
                  <span className={styles.submitTime}>{submission.submitTime}</span>
                </div>
                <div className={styles.tableCol}>
                  {submission.aiScore !== undefined ? (
                    <span className={styles.scoreDisplay}>{submission.aiScore} / {assignment.totalPoints}</span>
                  ) : (
                    <span className={styles.emptyText}>-</span>
                  )}
                </div>
                <div className={styles.tableCol}>
                  <Button 
                    variant="ghost" 
                    size="small"
                    onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review?student=${submission.studentId}`)}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  // 分数分布详情
  const renderScoreDistributionDetail = () => {
    if (!analytics) return null;

    return (
      <Card className={styles.detailCard}>
        <div className={styles.detailHeader}>
          <h3 className={styles.detailTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 2L15 9h7l-5.5 4L19 22l-7-5-7 5 2.5-9L2 9h7z" fill="currentColor"/>
            </svg>
            Score Distribution
          </h3>
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => setActiveDetailView(null)}
          >
            Close
          </Button>
        </div>

        {renderScoreDistribution()}
        
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <div className={styles.statBoxLabel}>Average</div>
            <div className={styles.statBoxValue}>{assignment.stats.avgScore?.toFixed(1) || '-'}</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statBoxLabel}>Median</div>
            <div className={styles.statBoxValue}>{assignment.stats.avgScore ? (assignment.stats.avgScore - 2).toFixed(1) : '-'}</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statBoxLabel}>Std Dev</div>
            <div className={styles.statBoxValue}>{assignment.stats.avgScore ? '12.3' : '-'}</div>
          </div>
        </div>
      </Card>
    );
  };

  // 最高分学生详情
  const renderTopStudentsDetail = () => {
    const topStudents = [...submissions]
      .filter(s => s.aiScore !== undefined)
      .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
      .slice(0, 10);

    return (
      <Card className={styles.detailCard}>
        <div className={styles.detailHeader}>
          <h3 className={styles.detailTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Top Performers
          </h3>
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => setActiveDetailView(null)}
          >
            Close
          </Button>
        </div>

        <div className={styles.topStudentsList}>
          {topStudents.map((submission, index) => (
            <div key={submission.id} className={styles.rankCard}>
              <div className={styles.rankBadge} data-rank={index + 1}>
                {index + 1}
              </div>
              <div className={styles.studentInfo}>
                <img src={submission.studentAvatar} alt={submission.studentName} className={styles.tableAvatar} />
                <span className={styles.studentName}>{submission.studentName}</span>
              </div>
              <div className={styles.scoreInfo}>
                <span className={styles.scoreValue}>{submission.aiScore}</span>
                <span className={styles.scoreMax}>/ {assignment.totalPoints}</span>
              </div>
              <Button 
                variant="ghost" 
                size="small"
                onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review?student=${submission.studentId}`)}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // 最低分学生详情
  const renderBottomStudentsDetail = () => {
    const bottomStudents = [...submissions]
      .filter(s => s.aiScore !== undefined)
      .sort((a, b) => (a.aiScore || 0) - (b.aiScore || 0))
      .slice(0, 10);

    return (
      <Card className={styles.detailCard}>
        <div className={styles.detailHeader}>
          <h3 className={styles.detailTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Students Needing Support
          </h3>
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => setActiveDetailView(null)}
          >
            Close
          </Button>
        </div>

        <div className={styles.bottomStudentsList}>
          {bottomStudents.map((submission) => (
            <div key={submission.id} className={styles.supportCard}>
              <div className={styles.studentInfo}>
                <img src={submission.studentAvatar} alt={submission.studentName} className={styles.tableAvatar} />
                <div>
                  <div className={styles.studentName}>{submission.studentName}</div>
                  <div className={styles.scoreWarning}>
                    Score: {submission.aiScore} / {assignment.totalPoints}
                    {submission.aiScore && submission.aiScore < assignment.totalPoints * 0.6 && (
                      <span className={styles.lowScoreBadge}>Needs attention</span>
                    )}
                  </div>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="small"
                onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review?student=${submission.studentId}`)}
              >
                Review
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Overview Tab
  const overviewTab = (
    <div className={styles.overviewContent}>
      {/* 整体统计卡片 - 现在可点击 */}
      <div className={styles.statsCards}>
        <button 
          className={`${styles.statCard} ${styles.clickable} ${activeDetailView === 'submissions' ? styles.active : ''}`}
          onClick={() => handleStatClick('submissions')}
        >
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
          <div className={styles.clickHint}>Click to view details</div>
        </button>
        
        <button 
          className={`${styles.statCard} ${styles.clickable} ${activeDetailView === 'avgScore' ? styles.active : ''}`}
          onClick={() => handleStatClick('avgScore')}
          disabled={!hasAIGrading}
        >
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--success-green-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 9h7l-5.5 4L19 22l-7-5-7 5 2.5-9L2 9h7z" fill="var(--success-green)"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.avgScore?.toFixed(1) || '-'}</div>
            <div className={styles.statLabel}>Average Score</div>
          </div>
          {hasAIGrading && <div className={styles.clickHint}>Click to view details</div>}
        </button>

        <button 
          className={`${styles.statCard} ${styles.clickable} ${activeDetailView === 'maxScore' ? styles.active : ''}`}
          onClick={() => handleStatClick('maxScore')}
          disabled={!hasAIGrading}
        >
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--warning-yellow-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--warning-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.maxScore || '-'}</div>
            <div className={styles.statLabel}>Highest Score</div>
          </div>
          {hasAIGrading && <div className={styles.clickHint}>Click to view details</div>}
        </button>

        <button 
          className={`${styles.statCard} ${styles.clickable} ${activeDetailView === 'minScore' ? styles.active : ''}`}
          onClick={() => handleStatClick('minScore')}
          disabled={!hasAIGrading}
        >
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--error-red-light)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--error-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{assignment.stats.minScore || '-'}</div>
            <div className={styles.statLabel}>Lowest Score</div>
          </div>
          {hasAIGrading && <div className={styles.clickHint}>Click to view details</div>}
        </button>
      </div>

      {/* 详细信息展示区域 */}
      {renderDetailView()}

      {/* 只在没有详细视图时显示分数分布 */}
      {!activeDetailView && hasAIGrading && (
        <Card className={styles.card}>
          {renderScoreDistribution()}
        </Card>
      )}

      {/* 优秀表现 */}
      {!activeDetailView && renderStrengths()}
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
              <Badge variant={
                assignment.status === 'graded' ? 'success' : 
                assignment.status === 'published' ? 'info' : 
                'warning'
              }>
                {assignment.status === 'graded' ? 'Graded' : 
                 assignment.status === 'published' ? 'Published' : 
                 'Draft'}
              </Badge>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.subject}>{assignment.subject}</span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.dueDate}>
                Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              {isPastDue && (
                <>
                  <span className={styles.metaDivider}>•</span>
                  <span className={styles.pastDue}>Past Due</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.headerRight}>
            {/* Show different buttons based on state */}
            {!isPastDue && (
              <Button 
                variant="secondary"
                onClick={() => setShowFullContent(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                View Assignment
              </Button>
            )}
            {isPastDue && hasSubmissions && (
              <Button 
                variant="primary"
                onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}/review`)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12 7h5l-4 3.5L15 16l-5-3.5L5 16l2-5.5L3 7h5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                {hasAIGrading ? 'Review Results' : 'Start Review'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content - Reorganized based on priority */}
      <div className={styles.content}>
        {/* Consolidated Submission Status Bar - shown for all states */}
        <div className={styles.submissionSection}>
          {renderSubmissionIndicator()}
        </div>

        {/* Priority 1: AI Grading Results (if available) */}
        {hasAIGrading && (
          <div className={styles.aiGradingSection}>
            <Tabs tabs={tabs} />
          </div>
        )}

        {/* Priority 2: Assignment Content Preview (compact) */}
        {!hasAIGrading && (
          <div className={styles.previewSection}>
            {renderAssignmentPreview()}
          </div>
        )}

        {/* If no AI grading but has submissions, show student list */}
        {!hasAIGrading && isPastDue && hasSubmissions && (
          <div className={styles.studentsSection}>
            <Tabs tabs={[
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
            ]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetailPage;

