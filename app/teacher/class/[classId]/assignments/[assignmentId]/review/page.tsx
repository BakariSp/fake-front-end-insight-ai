'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, Button, Badge } from '@ui';
import { 
  getAssignmentById, 
  getSubmissionsByAssignmentId,
  getAnalyticsByAssignmentId 
} from '../../mockData';
import { getStatusConfig, getStatusMessage, getAnalyticsPlaceholder } from '../../statusHelper';
import type { StudentSubmission, StudentAnswer, FillBlankAnswer, AssignmentStatus } from '../../types';
import styles from './review.module.css';

const ReviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const classId = params.classId as string;
  const assignmentId = params.assignmentId as string;
  const studentIdParam = searchParams.get('student');
  
  const assignment = getAssignmentById(assignmentId);
  const submissions = getSubmissionsByAssignmentId(assignmentId);
  const analytics = getAnalyticsByAssignmentId(assignmentId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editedSubmission, setEditedSubmission] = useState<StudentSubmission | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // 题型筛选状态
  const [questionTypeFilters, setQuestionTypeFilters] = useState({
    choice: true,
    'fill-blank': true,
    essay: true,
  });

  // 删除作业
  const handleDeleteAssignment = () => {
    if (confirm(`确定要删除作业"${assignment?.title}"吗？\n\n⚠️ 此操作无法撤销！所有学生的提交数据也将被删除！`)) {
      // TODO: 调用API删除作业
      console.log('删除作业:', assignmentId);
      alert('作业已删除');
      router.push(`/teacher/class/${classId}/assignments`);
    }
  };

  useEffect(() => {
    if (studentIdParam) {
      const index = submissions.findIndex(s => s.studentId === studentIdParam);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [studentIdParam]);

  useEffect(() => {
    if (submissions[currentIndex]) {
      setEditedSubmission(JSON.parse(JSON.stringify(submissions[currentIndex])));
      setHasChanges(false);
    }
  }, [currentIndex]);

  if (!assignment) {
    return <div className={styles.loading}>Assignment not found</div>;
  }

  const status = assignment.status;
  const statusConfig = getStatusConfig(status);
  const statusMsg = getStatusMessage(status, assignment.stats);

  // ==================== 状态 1: DRAFT - 作业预览 ====================
  const renderDraftView = () => {
    return (
      <div className={styles.draftContainer}>
        {/* 顶部导航栏 */}
        <div className={styles.topNav}>
          <Button 
            variant="ghost" 
            onClick={() => router.push(`/teacher/class/${classId}/assignments`)}
            className={styles.backButton}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </Button>
          
          <h1 className={styles.pageTitle}>{assignment.title}</h1>

          {/* 省略号菜单 */}
          <div className={styles.menuWrapper}>
            <button 
              className={styles.menuButton}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="More options"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
              </svg>
            </button>
            
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <button 
                  className={styles.menuItem}
                  onClick={() => {
                    router.push(`/teacher/assignments/${assignmentId}/edit`);
                    setShowMenu(false);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11 2L13 4L5 12H3V10L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M9 4L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  编辑作业
                </button>
                <div className={styles.menuDivider}></div>
                <button 
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={() => {
                    setShowMenu(false);
                    handleDeleteAssignment();
                  }}
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

        <div className={styles.statusBanner} style={{ backgroundColor: statusConfig.bgColor, borderLeftColor: statusConfig.color }}>
          <div className={styles.bannerIcon}>{statusMsg.icon}</div>
          <div className={styles.bannerContent}>
            <h3 className={styles.bannerTitle}>{statusMsg.title}</h3>
            <p className={styles.bannerDescription}>{statusMsg.description}</p>
          </div>
        </div>

        <Card className={styles.previewCard}>
          <h2 className={styles.cardTitle}>作业内容预览</h2>
          <div className={styles.assignmentMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>总分:</span>
              <span className={styles.metaValue}>{assignment.totalPoints}分</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>题目数:</span>
              <span className={styles.metaValue}>{assignment.questions.length}题</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>截止时间:</span>
              <span className={styles.metaValue}>
                {new Date(assignment.dueDate).toLocaleString('zh-CN')}
              </span>
            </div>
          </div>

          {assignment.description && (
            <div className={styles.description}>
              <p>{assignment.description}</p>
            </div>
          )}

          <div className={styles.questionsList}>
            {assignment.questions.map((question, index) => (
              <div key={question.id} className={styles.questionPreview}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionNumber}>第 {index + 1} 题</span>
                  <Badge variant={
                    question.type === 'choice' ? 'info' : 
                    question.type === 'fill-blank' ? 'warning' : 
                    'secondary'
                  }>
                    {question.type === 'choice' ? '选择题' : 
                     question.type === 'fill-blank' ? '填空题' : 
                     '问答题'}
                  </Badge>
                  <span className={styles.questionPoints}>{question.points}分</span>
                </div>
                <div className={styles.questionContent}>{question.content}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className={styles.placeholderCard}>
          <div className={styles.placeholderIcon}>📊</div>
          <h3 className={styles.placeholderTitle}>统计分析</h3>
          <p className={styles.placeholderText}>作业发布并收到学生提交后，这里将显示详细的统计分析数据</p>
        </div>
      </div>
    );
  };

  // ==================== 状态 2: PUBLISHED - 收集中 ====================
  const renderPublishedView = () => {
    const submittedStudents = submissions.filter(s => s.status === 'submitted' || s.status === 'graded');
    const notSubmittedStudents = submissions.filter(s => s.status === 'not_submitted');

    return (
      <div className={styles.publishedContainer}>
        {/* 顶部导航栏 */}
        <div className={styles.topNav}>
          <Button 
            variant="ghost" 
            onClick={() => router.push(`/teacher/class/${classId}/assignments`)}
            className={styles.backButton}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </Button>
          
          <h1 className={styles.pageTitle}>{assignment.title}</h1>

          {/* 省略号菜单 */}
          <div className={styles.menuWrapper}>
            <button 
              className={styles.menuButton}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="More options"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
              </svg>
            </button>
            
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <button 
                  className={styles.menuItem}
                  onClick={() => {
                    router.push(`/teacher/class/${classId}/assignments/${assignmentId}`);
                    setShowMenu(false);
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
                  onClick={() => {
                    setShowMenu(false);
                    handleDeleteAssignment();
                  }}
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

        <div className={styles.statusBanner} style={{ backgroundColor: statusConfig.bgColor, borderLeftColor: statusConfig.color }}>
          <div className={styles.bannerIcon}>{statusMsg.icon}</div>
          <div className={styles.bannerContent}>
            <h3 className={styles.bannerTitle}>{statusMsg.title}</h3>
            <p className={styles.bannerDescription}>{statusMsg.description}</p>
          </div>
        </div>

        <div className={styles.statsCards}>
          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#E3F2FD' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="#4F7FFF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#4F7FFF" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{submittedStudents.length}</div>
              <div className={styles.statLabel}>已提交</div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#FFF3E0' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#FF9800" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="#FF9800" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{notSubmittedStudents.length}</div>
              <div className={styles.statLabel}>待提交</div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#F9F0FF' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="#722ED1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{((submittedStudents.length / submissions.length) * 100).toFixed(0)}%</div>
              <div className={styles.statLabel}>提交率</div>
            </div>
          </Card>
        </div>

        {/* 学生列表 */}
        <Card>
          <div className={styles.listHeader}>
            <h2 className={styles.cardTitle}>学生提交情况</h2>
            <div className={styles.listTabs}>
              <button className={`${styles.listTab} ${styles.active}`}>
                全部 ({submissions.length})
              </button>
              <button className={styles.listTab}>
                已提交 ({submittedStudents.length})
              </button>
              <button className={styles.listTab}>
                未提交 ({notSubmittedStudents.length})
              </button>
            </div>
          </div>

          <div className={styles.studentList}>
            {submissions.map((submission) => (
              <div key={submission.id} className={styles.studentItem}>
                <div className={styles.studentAvatar}>
                  <img src={submission.studentAvatar} alt={submission.studentName} />
                </div>
                <div className={styles.studentInfo}>
                  <h4 className={styles.studentName}>{submission.studentName}</h4>
                  {submission.submitTime ? (
                    <p className={styles.submitTime}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1a6 6 0 100 12A6 6 0 007 1z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 4v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {submission.submitTime}
                    </p>
                  ) : (
                    <p className={styles.notSubmitted}>未提交</p>
                  )}
                </div>
                <div className={styles.studentStatus}>
                  {submission.submitTime ? (
                    <Badge variant="success">已提交</Badge>
                  ) : (
                    <Badge variant="warning">待提交</Badge>
                  )}
                </div>
                {submission.submitTime && (
                  <Button 
                    variant="ghost" 
                    size="small"
                    onClick={() => {
                      const index = submissions.findIndex(s => s.id === submission.id);
                      setCurrentIndex(index);
                      // 滚动到顶部查看作业详情
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    查看
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* AI分析占位符 */}
        <div className={styles.placeholderCard}>
          <div className={styles.placeholderIcon}>🤖</div>
          <h3 className={styles.placeholderTitle}>AI分析报告</h3>
          <p className={styles.placeholderText}>作业截止后，可以启动AI批改。批改完成后将生成详细的分析报告</p>
        </div>
      </div>
    );
  };

  // ==================== 状态 3 & 4: GRADING/GRADED - 批改视图 ====================
  const renderGradingView = () => {
    if (!editedSubmission || submissions.length === 0) {
      return renderPublishedView(); // 如果没有提交，显示 published 视图
  }

  const currentSubmission = editedSubmission;

  // 更新答案的教师评分
  const updateTeacherScore = (questionId: string, score: number) => {
    const answer = currentSubmission.answers.find(a => a.questionId === questionId);
    if (answer) {
      answer.teacherScore = score;
      setHasChanges(true);
      updateTotalScore();
    }
  };

  // 更新答案的教师评语
  const updateTeacherComment = (questionId: string, comment: string) => {
    const answer = currentSubmission.answers.find(a => a.questionId === questionId);
    if (answer) {
      answer.teacherComment = comment;
      setHasChanges(true);
    }
  };

  // 计算总分
  const updateTotalScore = () => {
    const total = currentSubmission.answers.reduce((sum, answer) => {
      const score = answer.teacherScore !== undefined ? answer.teacherScore : (answer.aiScore || 0);
      return sum + score;
    }, 0);
    currentSubmission.teacherScore = total;
  };

  // 保存评分
  const handleSave = () => {
    console.log('Saving submission:', currentSubmission);
      alert('评分已保存！');
    setHasChanges(false);
  };

  // 导航到上一个学生
  const handlePrevious = () => {
    if (hasChanges) {
        if (!confirm('您有未保存的更改。是否放弃更改？')) {
        return;
      }
    }
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  // 导航到下一个学生
  const handleNext = () => {
    if (hasChanges) {
        if (!confirm('您有未保存的更改。是否放弃更改？')) {
        return;
      }
    }
    setCurrentIndex(Math.min(submissions.length - 1, currentIndex + 1));
  };

    // 渲染答案内容
  const renderAnswer = (answer: StudentAnswer, question: any) => {
    if (question.type === 'choice') {
      if (answer.isCorrect) {
        return (
          <div className={styles.choiceAnswerCompact}>
            <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <span className={styles.correctText}>回答正确</span>
          </div>
        );
      }
      
      const studentAnswerIndex = answer.answer as number;
      const correctAnswerIndex = question.correctAnswer as number;
      
      return (
        <div className={styles.choiceAnswerDetailed}>
          <div className={styles.answerComparison}>
            <div className={styles.comparisonItem}>
              <div className={styles.comparisonLabel}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                  学生选择:
              </div>
              <div className={`${styles.comparisonValue} ${styles.incorrect}`}>
                {question.options?.[studentAnswerIndex]}
              </div>
            </div>
            <div className={styles.comparisonItem}>
              <div className={styles.comparisonLabel}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                  正确答案:
              </div>
              <div className={`${styles.comparisonValue} ${styles.correct}`}>
                {question.options?.[correctAnswerIndex]}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (question.type === 'fill-blank') {
      const blanks = answer.answer as FillBlankAnswer[];
      const allCorrect = blanks.every(b => b.isCorrect);
      
      if (allCorrect) {
        return (
          <div className={styles.fillBlankAnswerCompact}>
            <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <span className={styles.correctText}>全部填空正确 ({blanks.length}处)</span>
          </div>
        );
      }
      
      return (
        <div className={styles.fillBlankAnswer}>
          {blanks.map((blank, index) => {
            const correctAnswers = question.blanks?.[index]?.correctAnswers || [];
            return (
              <div key={blank.blankId} className={styles.blankItem}>
                  <div className={styles.blankLabel}>空格 {index + 1}:</div>
                <div className={styles.blankComparison}>
                  <div className={`${styles.blankValue} ${blank.isCorrect ? styles.correct : styles.incorrect}`}>
                    {blank.isCorrect ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {blank.answer}
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {blank.answer}
                      </>
                    )}
                  </div>
                  {!blank.isCorrect && (
                    <div className={styles.blankCorrectAnswers}>
                      <span className={styles.correctLabel}>✓</span>
                      {correctAnswers.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (question.type === 'essay') {
      return (
        <div className={styles.essayAnswer}>
          <div className={styles.essayContent}>{answer.answer as string}</div>
          {question.keywords && question.keywords.length > 0 && (
            <div className={styles.keywords}>
                <span className={styles.keywordsLabel}>关键概念:</span>
              <div className={styles.keywordsList}>
                {question.keywords.map((keyword: string, i: number) => (
                  <span key={i} className={styles.keyword}>{keyword}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return <div className={styles.defaultAnswer}>{String(answer.answer)}</div>;
  };

  // 渲染问题和答案卡片
  const renderQuestionCard = (answer: StudentAnswer, index: number) => {
    const question = assignment.questions.find(q => q.id === answer.questionId);
    if (!question) return null;

    const finalScore = answer.teacherScore !== undefined ? answer.teacherScore : answer.aiScore;
    
    // 根据题目类型和得分情况确定卡片样式
    const getCardClassName = () => {
      // 选择题：根据是否正确判断
      if (question.type === 'choice') {
        return answer.isCorrect ? styles.correctCard : styles.needsReviewCard;
      }
      
      // 填空题：检查所有空是否都正确
      if (question.type === 'fill-blank') {
        const blanks = answer.answer as any[];
        const allCorrect = blanks && blanks.every((b: any) => b.isCorrect);
        return allCorrect ? styles.correctCard : styles.needsReviewCard;
      }
      
      // 问答题：根据得分率判断（80%以上为绿色，否则为红色需要检查）
      if (question.type === 'essay') {
        const scoreRate = (finalScore || 0) / question.points;
        return scoreRate >= 0.8 ? styles.correctCard : styles.needsReviewCard;
      }
      
      return styles.needsReviewCard;
    };

    return (
      <Card key={answer.questionId} className={`${styles.questionCard} ${getCardClassName()}`}>
        <div className={styles.questionNumberHeader}>
          <div className={styles.headerLeft}>
              <span className={styles.questionNumberLarge}>第 {index + 1} 题</span>
            <Badge variant={
              question.type === 'choice' ? 'info' : 
              question.type === 'fill-blank' ? 'warning' : 
              'secondary'
            }>
                {question.type === 'choice' ? '选择题' : 
                 question.type === 'fill-blank' ? '填空题' : 
                 '问答题'}
            </Badge>
            {/* 状态指示器 */}
            {(() => {
              // 判断是否正确/优秀
              let isGood = false;
              
              if (question.type === 'choice') {
                isGood = answer.isCorrect ?? false;
              } else if (question.type === 'fill-blank') {
                const blanks = answer.answer as any[];
                isGood = blanks && blanks.every((b: any) => b.isCorrect);
              } else if (question.type === 'essay') {
                const scoreRate = (finalScore || 0) / question.points;
                isGood = scoreRate >= 0.8;
              }
              
              return isGood ? (
                <div className={styles.correctBadge}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {question.type === 'essay' ? '优秀' : '正确'}
                </div>
              ) : (
                <div className={styles.needsReviewBadge}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4v4M8 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  需要检查
                </div>
              );
            })()}
          </div>
          <div className={styles.headerRight}>
            <span className={styles.pointsBadge}>
                {finalScore || 0} / {question.points} 分
            </span>
          </div>
        </div>

        <div className={styles.questionContent}>
          <div className={`${styles.questionBlock} ${answer.isCorrect ? styles.compactBlock : ''}`}>
            <div className={styles.questionText}>{question.content}</div>
            {question.type === 'choice' && question.options && (
              <div className={`${styles.questionOptions} ${answer.isCorrect ? styles.compactOptions : ''}`}>
                {question.options.map((option, i) => {
                  const isStudentAnswer = i === (answer.answer as number);
                  const isCorrectAnswer = i === (question.correctAnswer as number);
                  return (
                    <div 
                      key={i} 
                      className={`${styles.optionItem} ${
                        isCorrectAnswer ? styles.correctOption : 
                        isStudentAnswer && !answer.isCorrect ? styles.incorrectOption : 
                        ''
                      }`}
                    >
                      {isCorrectAnswer && <span className={styles.optionIcon}>✓</span>}
                      {isStudentAnswer && !answer.isCorrect && <span className={styles.optionIcon}>✗</span>}
                      {option}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

            {(question.type === 'fill-blank' || question.type === 'essay') && (
            <div className={styles.answerBlock}>
              <div className={styles.answerContent}>
                {renderAnswer(answer, question)}
              </div>
            </div>
          )}

            {answer.aiScore !== undefined && !answer.isCorrect && (
            <div className={styles.aiBlock}>
              <div className={styles.aiBlockHeader}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.5 5.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z" fill="currentColor"/>
                </svg>
                  <span className={styles.aiLabel}>AI评分</span>
                <span className={styles.aiScore}>{answer.aiScore} / {question.points}</span>
                </div>
                {answer.aiComment && (
                  <div className={styles.aiComment}>{answer.aiComment}</div>
              )}
            </div>
          )}

          <div className={styles.teacherBlock}>
            <div className={styles.teacherControls}>
              <div className={styles.scoreControl}>
                  <label className={styles.controlLabel}>教师评分:</label>
                <div className={styles.scoreInputGroup}>
                  <input
                    type="number"
                    min="0"
                    max={question.points}
                    value={answer.teacherScore !== undefined ? answer.teacherScore : answer.aiScore || 0}
                    onChange={(e) => updateTeacherScore(answer.questionId, parseFloat(e.target.value) || 0)}
                    className={styles.scoreInput}
                  />
                  <span className={styles.scoreMax}>/ {question.points}</span>
                  {answer.teacherScore !== undefined && answer.teacherScore !== answer.aiScore && (
                      <span className={styles.scoreChanged}>已修改</span>
                  )}
                </div>
              </div>
              {!answer.isCorrect && (
                <div className={styles.commentControl}>
                    <label className={styles.controlLabel}>评语:</label>
                  <textarea
                    value={answer.teacherComment || ''}
                    onChange={(e) => updateTeacherComment(answer.questionId, e.target.value)}
                      placeholder="为学生添加个性化评语..."
                    className={styles.commentTextarea}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const progress = {
    current: currentIndex + 1,
    total: submissions.length,
    percentage: ((currentIndex + 1) / submissions.length) * 100
  };

    return (
      <div className={styles.pageContainer}>
        {/* Fixed Top Bar */}
        <div className={styles.fixedTopBar}>
          <Button 
            variant="ghost" 
            onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}`)}
            className={styles.backButton}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </Button>

          <div className={styles.topBarCenter}>
            <h1 className={styles.compactTitle}>批改作业</h1>
            <span className={styles.assignmentTitle}>{assignment.title}</span>
          </div>

          <div className={styles.topBarRight}>
            {/* 省略号菜单 */}
            <div className={styles.menuWrapper}>
              <button 
                className={styles.menuButton}
                onClick={() => setShowMenu(!showMenu)}
                aria-label="More options"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                  <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                  <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                </svg>
              </button>
              
              {showMenu && (
                <div className={styles.dropdownMenu}>
                  <button 
                    className={styles.menuItem}
                    onClick={() => {
                      router.push(`/teacher/class/${classId}/assignments/${assignmentId}`);
                      setShowMenu(false);
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
                    onClick={() => {
                      setShowMenu(false);
                      handleDeleteAssignment();
                    }}
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

      <div className={styles.contentWrapper}>
          {/* Fixed Left Sidebar */}
        <div className={styles.sidebarFixed}>
          {/* Progress Section */}
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>批改进度</span>
              <span className={styles.progressCount}>{progress.current} / {progress.total}</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          <div className={styles.studentInfoCard}>
            <div className={styles.studentHeader}>
              <img 
                src={currentSubmission.studentAvatar} 
                alt={currentSubmission.studentName}
                className={styles.studentAvatar}
              />
              <div className={styles.studentDetails}>
                <h3 className={styles.studentName}>{currentSubmission.studentName}</h3>
                <p className={styles.submitTime}>
                    {currentSubmission.submitTime || '未提交'}
                </p>
              </div>
            </div>

            <div className={styles.scoresSummary}>
              <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>AI评分</span>
                <span className={styles.summaryValue}>{currentSubmission.aiScore || '-'}</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>教师评分</span>
                <span className={styles.summaryValue}>
                  {currentSubmission.teacherScore !== undefined 
                    ? currentSubmission.teacherScore 
                    : '-'}
                </span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>总分</span>
                <span className={styles.summaryValue}>{assignment.totalPoints}</span>
                </div>
            </div>
          </div>

          {/* Question Type Filter */}
          <div className={styles.filterSection}>
            <div className={styles.filterHeader}>
              <span className={styles.filterTitle}>题型筛选</span>
              <span className={styles.filterCount}>
                {currentSubmission.answers.filter(answer => {
                  const question = assignment.questions.find(q => q.id === answer.questionId);
                  return question && questionTypeFilters[question.type as keyof typeof questionTypeFilters];
                }).length} / {currentSubmission.answers.length}
              </span>
            </div>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterChip} ${questionTypeFilters.choice ? styles.filterChipActive : ''}`}
                onClick={() => setQuestionTypeFilters(prev => ({ ...prev, choice: !prev.choice }))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  {questionTypeFilters.choice && <circle cx="8" cy="8" r="3" fill="currentColor"/>}
                </svg>
                <span>选择题</span>
                <span className={styles.filterChipCount}>
                  {assignment.questions.filter(q => q.type === 'choice').length}
                </span>
              </button>
              <button
                className={`${styles.filterChip} ${questionTypeFilters['fill-blank'] ? styles.filterChipActive : ''}`}
                onClick={() => setQuestionTypeFilters(prev => ({ ...prev, 'fill-blank': !prev['fill-blank'] }))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="6" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  {questionTypeFilters['fill-blank'] && <rect x="4" y="7.5" width="8" height="1" fill="currentColor"/>}
                </svg>
                <span>填空题</span>
                <span className={styles.filterChipCount}>
                  {assignment.questions.filter(q => q.type === 'fill-blank').length}
                </span>
              </button>
              <button
                className={`${styles.filterChip} ${questionTypeFilters.essay ? styles.filterChipActive : ''}`}
                onClick={() => setQuestionTypeFilters(prev => ({ ...prev, essay: !prev.essay }))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3h12M2 6h12M2 9h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  {questionTypeFilters.essay && <circle cx="12" cy="12" r="2" fill="currentColor"/>}
                </svg>
                <span>问答题</span>
                <span className={styles.filterChipCount}>
                  {assignment.questions.filter(q => q.type === 'essay').length}
                </span>
              </button>
            </div>
            <button 
              className={styles.filterResetBottom}
              onClick={() => setQuestionTypeFilters({ choice: true, 'fill-blank': true, essay: true })}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 5H6M12 5L9 2M12 5L9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 9H8M2 9L5 6M2 9L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              重置筛选
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigationButtons}>
            <Button 
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              fullWidth
              className={styles.navButton}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                上一个
            </Button>
            <Button 
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === submissions.length - 1}
              fullWidth
              className={styles.navButton}
            >
                下一个
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>

          {/* Save Button */}
          <Button 
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges}
            fullWidth
            className={styles.saveButtonMain}
          >
              {hasChanges ? '💾 保存更改' : '✓ 已保存'}
          </Button>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.questionsContainer}>
              {currentSubmission.answers
                .map((answer, index) => ({ answer, index, question: assignment.questions.find(q => q.id === answer.questionId) }))
                .filter(({ question }) => question && questionTypeFilters[question.type as keyof typeof questionTypeFilters])
                .map(({ answer, index }) => 
                  renderQuestionCard(answer, index)
                )}
          </div>
        </div>
      </div>
    </div>
  );
  };

  // 根据状态渲染不同视图
  switch (status) {
    case 'draft':
      return renderDraftView();
    case 'published':
      return renderPublishedView();
    case 'grading':
    case 'graded':
      return renderGradingView();
    default:
      return renderDraftView();
  }
};

export default ReviewPage;
