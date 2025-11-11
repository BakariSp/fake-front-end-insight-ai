'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, Button, Badge } from '@ui';
import { 
  getAssignmentById, 
  getSubmissionsByAssignmentId 
} from '../../mockData';
import type { StudentSubmission, StudentAnswer, FillBlankAnswer } from '../../types';
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
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editedSubmission, setEditedSubmission] = useState<StudentSubmission | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [questionTypeFilter, setQuestionTypeFilter] = useState<'all' | 'choice' | 'fill-blank' | 'essay'>('all');

  useEffect(() => {
    if (studentIdParam) {
      const index = submissions.findIndex(s => s.studentId === studentIdParam);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [studentIdParam, submissions]);

  useEffect(() => {
    if (submissions[currentIndex]) {
      setEditedSubmission(JSON.parse(JSON.stringify(submissions[currentIndex])));
      setHasChanges(false);
    }
  }, [currentIndex, submissions]);

  if (!assignment || !submissions.length || !editedSubmission) {
    return <div className={styles.loading}>Loading...</div>;
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
    // 这里应该调用API保存数据
    console.log('Saving submission:', currentSubmission);
    alert('Changes saved successfully!');
    setHasChanges(false);
  };

  // 导航到上一个学生
  const handlePrevious = () => {
    if (hasChanges) {
      if (!confirm('You have unsaved changes. Do you want to discard them?')) {
        return;
      }
    }
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  // 导航到下一个学生
  const handleNext = () => {
    if (hasChanges) {
      if (!confirm('You have unsaved changes. Do you want to discard them?')) {
        return;
      }
    }
    setCurrentIndex(Math.min(submissions.length - 1, currentIndex + 1));
  };

  // 渲染答案内容
  const renderAnswer = (answer: StudentAnswer, question: any) => {
    if (question.type === 'choice') {
      const selectedOption = question.options?.[answer.answer as number];
      return (
        <div className={styles.choiceAnswer}>
          <div className={`${styles.selectedOption} ${answer.isCorrect ? styles.correct : styles.incorrect}`}>
            {selectedOption}
          </div>
          {question.correctAnswer !== undefined && (
            <div className={styles.correctAnswer}>
              <span className={styles.correctLabel}>Correct Answer:</span>
              {question.options?.[question.correctAnswer as number]}
            </div>
          )}
        </div>
      );
    }

    if (question.type === 'fill-blank') {
      const blanks = answer.answer as FillBlankAnswer[];
      return (
        <div className={styles.fillBlankAnswer}>
          {blanks.map((blank, index) => {
            const correctAnswers = question.blanks?.[index]?.correctAnswers || [];
            return (
              <div key={blank.blankId} className={styles.blankItem}>
                <div className={styles.blankLabel}>Blank {index + 1}:</div>
                <div className={`${styles.blankAnswer} ${blank.isCorrect ? styles.correct : styles.incorrect}`}>
                  {blank.answer}
                </div>
                {!blank.isCorrect && (
                  <div className={styles.correctAnswer}>
                    <span className={styles.correctLabel}>Acceptable answers:</span>
                    {correctAnswers.join(', ')}
                  </div>
                )}
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
              <span className={styles.keywordsLabel}>Key concepts:</span>
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

  // 获取过滤后的答案
  const getFilteredAnswers = () => {
    if (questionTypeFilter === 'all') {
      return currentSubmission.answers;
    }
    return currentSubmission.answers.filter(answer => {
      const question = assignment.questions.find(q => q.id === answer.questionId);
      return question && question.type === questionTypeFilter;
    });
  };

  // 渲染问题和答案卡片
  const renderQuestionCard = (answer: StudentAnswer, index: number) => {
    const question = assignment.questions.find(q => q.id === answer.questionId);
    if (!question) return null;

    const finalScore = answer.teacherScore !== undefined ? answer.teacherScore : answer.aiScore;

    return (
      <Card key={answer.questionId} className={styles.questionCard}>
        {/* 1. 题号 - 最显眼 */}
        <div className={styles.questionNumberHeader}>
          <span className={styles.questionNumberLarge}>Question {index + 1}</span>
          <div className={styles.questionMeta}>
            <Badge variant={
              question.type === 'choice' ? 'info' : 
              question.type === 'fill-blank' ? 'warning' : 
              'secondary'
            }>
              {question.type === 'choice' ? 'Multiple Choice' : 
               question.type === 'fill-blank' ? 'Fill in the Blank' : 
               'Essay'}
            </Badge>
            <span className={styles.pointsBadge}>{question.points} pts</span>
          </div>
        </div>

        {/* 2. 题干 - 第二优先级 */}
        <div className={styles.questionBlock}>
          <div className={styles.blockTitle}>
            <span className={styles.blockNumber}>1</span>
            Question
          </div>
          <div className={styles.questionText}>{question.content}</div>
          {question.options && question.options.length > 0 && (
            <div className={styles.questionOptions}>
              {question.options.map((option, i) => (
                <div key={i} className={styles.optionItem}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. 学生回答 - 第三优先级 */}
        <div className={styles.answerBlock}>
          <div className={styles.blockTitle}>
            <span className={styles.blockNumber}>2</span>
            Student's Answer
          </div>
          <div className={styles.answerContent}>
            {renderAnswer(answer, question)}
          </div>
        </div>

        {/* 4. AI评分 - 第四优先级 */}
        {answer.aiScore !== undefined && (
          <div className={styles.aiBlock}>
            <div className={styles.blockTitle}>
              <span className={styles.blockNumber}>3</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L10.5 6h5l-4 3 1.5 5-4.5-3-4.5 3 1.5-5-4-3h5z" fill="currentColor"/>
              </svg>
              AI Assessment
            </div>
            <div className={styles.aiScoreDisplay}>
              <span className={styles.aiScoreLabel}>AI Score:</span>
              <span className={styles.aiScoreValue}>{answer.aiScore} / {question.points}</span>
            </div>
            {answer.aiComment && (
              <div className={styles.aiReasonBlock}>
                <div className={styles.aiReasonLabel}>Why this score?</div>
                <div className={styles.aiReasonText}>{answer.aiComment}</div>
              </div>
            )}
          </div>
        )}

        {/* 5. 教师修改区 - 最后，操作区域 */}
        <div className={styles.teacherBlock}>
          <div className={styles.blockTitle}>
            <span className={styles.blockNumber}>4</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 9a3 3 0 100-6 3 3 0 000 6zM15 17a6 6 0 00-12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Your Assessment
          </div>
          <div className={styles.teacherControls}>
            <div className={styles.scoreControl}>
              <label className={styles.controlLabel}>Adjust Score:</label>
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
                  <span className={styles.scoreChanged}>Modified</span>
                )}
              </div>
            </div>
            <div className={styles.commentControl}>
              <label className={styles.controlLabel}>Add Your Feedback:</label>
              <textarea
                value={answer.teacherComment || ''}
                onChange={(e) => updateTeacherComment(answer.questionId, e.target.value)}
                placeholder="Add personalized feedback for the student..."
                className={styles.commentTextarea}
                rows={4}
              />
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
      {/* Header */}
      <div className={styles.pageHeader}>
        <Button 
          variant="ghost" 
          onClick={() => router.push(`/teacher/class/${classId}/assignments/${assignmentId}`)}
          className={styles.backButton}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Results
        </Button>

        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <h1 className={styles.pageTitle}>Review Submissions</h1>
            <p className={styles.pageSubtitle}>{assignment.title}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            Reviewing: {progress.current} of {progress.total}
          </span>
          <span className={styles.progressPercentage}>
            {progress.percentage.toFixed(0)}% Complete
          </span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Card className={styles.studentInfo}>
            <div className={styles.studentHeader}>
              <img 
                src={currentSubmission.studentAvatar} 
                alt={currentSubmission.studentName}
                className={styles.studentAvatar}
              />
              <div className={styles.studentDetails}>
                <h3 className={styles.studentName}>{currentSubmission.studentName}</h3>
                <p className={styles.submitTime}>
                  {currentSubmission.submitTime 
                    ? `Submitted: ${currentSubmission.submitTime}` 
                    : 'Not submitted'}
                </p>
              </div>
            </div>

            <div className={styles.scoresSummary}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>AI Score:</span>
                <span className={styles.summaryValue}>{currentSubmission.aiScore || '-'}</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Teacher Score:</span>
                <span className={styles.summaryValue}>
                  {currentSubmission.teacherScore !== undefined 
                    ? currentSubmission.teacherScore 
                    : '-'}
                </span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Points:</span>
                <span className={styles.summaryValue}>{assignment.totalPoints}</span>
              </div>
            </div>
          </Card>

          {/* Question Type Filter */}
          <Card className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 4h16M5 9h10M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className={styles.filterTitle}>Filter by Question Type</span>
            </div>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterButton} ${questionTypeFilter === 'all' ? styles.filterButtonActive : ''}`}
                onClick={() => setQuestionTypeFilter('all')}
              >
                <span className={styles.filterDot}></span>
                All Questions
                <span className={styles.filterCount}>{currentSubmission.answers.length}</span>
              </button>
              <button
                className={`${styles.filterButton} ${questionTypeFilter === 'choice' ? styles.filterButtonActive : ''}`}
                onClick={() => setQuestionTypeFilter('choice')}
              >
                <span className={styles.filterDot}></span>
                Multiple Choice
                <span className={styles.filterCount}>
                  {currentSubmission.answers.filter(a => {
                    const q = assignment.questions.find(q => q.id === a.questionId);
                    return q?.type === 'choice';
                  }).length}
                </span>
              </button>
              <button
                className={`${styles.filterButton} ${questionTypeFilter === 'fill-blank' ? styles.filterButtonActive : ''}`}
                onClick={() => setQuestionTypeFilter('fill-blank')}
              >
                <span className={styles.filterDot}></span>
                Fill in the Blank
                <span className={styles.filterCount}>
                  {currentSubmission.answers.filter(a => {
                    const q = assignment.questions.find(q => q.id === a.questionId);
                    return q?.type === 'fill-blank';
                  }).length}
                </span>
              </button>
              <button
                className={`${styles.filterButton} ${questionTypeFilter === 'essay' ? styles.filterButtonActive : ''}`}
                onClick={() => setQuestionTypeFilter('essay')}
              >
                <span className={styles.filterDot}></span>
                Essay / Open-ended
                <span className={styles.filterCount}>
                  {currentSubmission.answers.filter(a => {
                    const q = assignment.questions.find(q => q.id === a.questionId);
                    return q?.type === 'essay';
                  }).length}
                </span>
              </button>
            </div>
            {questionTypeFilter !== 'all' && (
              <button 
                className={styles.clearFilterButton}
                onClick={() => setQuestionTypeFilter('all')}
              >
                Clear Filter
              </button>
            )}
          </Card>

          {/* Navigation */}
          <div className={styles.navigation}>
            <Button 
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              fullWidth
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous Student
            </Button>
            <Button 
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === submissions.length - 1}
              fullWidth
            >
              Next Student
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>

          {/* Save Button */}
          <Button 
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges}
            fullWidth
            className={styles.saveButton}
          >
            {hasChanges ? 'Save Changes' : 'No Changes'}
          </Button>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {questionTypeFilter !== 'all' && (
            <div className={styles.filterBanner}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 3h12M4 7h8M6 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Showing only: <strong>
                {questionTypeFilter === 'choice' ? 'Multiple Choice' : 
                 questionTypeFilter === 'fill-blank' ? 'Fill in the Blank' : 
                 'Essay / Open-ended'}
              </strong> questions
              <button 
                className={styles.clearFilterLink}
                onClick={() => setQuestionTypeFilter('all')}
              >
                Show all
              </button>
            </div>
          )}
          <div className={styles.questionsContainer}>
            {getFilteredAnswers().length > 0 ? (
              getFilteredAnswers().map((answer, index) => 
                renderQuestionCard(answer, index)
              )
            ) : (
              <div className={styles.noQuestions}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3>No questions match this filter</h3>
                <p>Try selecting a different question type or clear the filter to see all questions.</p>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className={styles.bottomActions}>
            <Button 
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </Button>
            
            <Button 
              variant="primary"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save & Continue
            </Button>

            <Button 
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === submissions.length - 1}
            >
              Next
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

