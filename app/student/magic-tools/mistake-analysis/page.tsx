'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Tabs, Chart } from '@ui';
import styles from './mistakeAnalysis.module.css';

interface Mistake {
  id: string;
  subject: string;
  topic: string;
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  date: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  attempts: number;
  mastered: boolean;
}

interface ErrorPattern {
  category: string;
  categoryZh: string;
  count: number;
  percentage: number;
  color: string;
  icon: string;
}

export default function MistakeAnalysisPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<'mistakes' | 'patterns' | 'practice'>('mistakes');

  // Mock data for mistakes
  const mistakes: Mistake[] = [
    {
      id: '1',
      subject: 'Math',
      topic: 'Fractions',
      question: 'What is 3/4 + 1/2?',
      yourAnswer: '4/6',
      correctAnswer: '5/4 or 1 1/4',
      explanation: 'To add fractions, you need a common denominator. The LCD of 4 and 2 is 4. So 1/2 = 2/4. Then 3/4 + 2/4 = 5/4.',
      date: new Date('2025-10-18'),
      difficulty: 'medium',
      attempts: 2,
      mastered: false,
    },
    {
      id: '2',
      subject: 'English',
      topic: 'Grammar',
      question: 'Choose the correct form: He ____ to school every day.',
      yourAnswer: 'go',
      correctAnswer: 'goes',
      explanation: 'With third person singular (he, she, it), we add -s or -es to the verb in present simple tense.',
      date: new Date('2025-10-17'),
      difficulty: 'easy',
      attempts: 1,
      mastered: true,
    },
    {
      id: '3',
      subject: 'Science',
      topic: 'Photosynthesis',
      question: 'What gas do plants release during photosynthesis?',
      yourAnswer: 'Carbon dioxide',
      correctAnswer: 'Oxygen',
      explanation: 'During photosynthesis, plants take in carbon dioxide and release oxygen as a byproduct.',
      date: new Date('2025-10-16'),
      difficulty: 'medium',
      attempts: 3,
      mastered: false,
    },
    {
      id: '4',
      subject: 'Math',
      topic: 'Algebra',
      question: 'Solve for x: 2x + 5 = 13',
      yourAnswer: 'x = 5',
      correctAnswer: 'x = 4',
      explanation: 'Subtract 5 from both sides: 2x = 8. Then divide by 2: x = 4.',
      date: new Date('2025-10-15'),
      difficulty: 'medium',
      attempts: 2,
      mastered: true,
    },
    {
      id: '5',
      subject: 'English',
      topic: 'Vocabulary',
      question: 'What does "meticulous" mean?',
      yourAnswer: 'Careless',
      correctAnswer: 'Very careful and precise',
      explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
      date: new Date('2025-10-14'),
      difficulty: 'hard',
      attempts: 1,
      mastered: false,
    },
  ];

  // Error patterns analysis
  const errorPatterns: ErrorPattern[] = [
    {
      category: 'Calculation Errors',
      categoryZh: '计算错误',
      count: 15,
      percentage: 35,
      color: '#EF4444',
      icon: '🔢',
    },
    {
      category: 'Concept Misunderstanding',
      categoryZh: '概念理解错误',
      count: 12,
      percentage: 28,
      color: '#F59E0B',
      icon: '💡',
    },
    {
      category: 'Grammar Mistakes',
      categoryZh: '语法错误',
      count: 8,
      percentage: 19,
      color: '#8B5CF6',
      icon: '📝',
    },
    {
      category: 'Vocabulary Gaps',
      categoryZh: '词汇缺失',
      count: 5,
      percentage: 12,
      color: '#10B981',
      icon: '📖',
    },
    {
      category: 'Careless Mistakes',
      categoryZh: '粗心错误',
      count: 3,
      percentage: 6,
      color: '#6B7280',
      icon: '⚠️',
    },
  ];

  const subjects = ['all', 'Math', 'English', 'Science'];

  const filteredMistakes = selectedSubject === 'all'
    ? mistakes
    : mistakes.filter(m => m.subject === selectedSubject);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const generatePractice = (mistake: Mistake) => {
    router.push(`/student/magic-tools/practice-generator?topic=${mistake.topic}&subject=${mistake.subject}`);
  };

  const reviewMistake = (mistake: Mistake) => {
    router.push(`/student/magic-tools/ai-tutor?mode=homework&question=${mistake.id}`);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className={styles.backButton}
        >
          ← Back
        </Button>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.icon}>📊</span>
            Mistake Analysis
          </h1>
          <p className={styles.subtitle}>错题分析 - Learn from your mistakes and improve</p>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#FEE2E2' }}>❌</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{mistakes.length}</div>
            <div className={styles.statLabel}>Total Mistakes 总错题</div>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#DCFCE7' }}>✅</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{mistakes.filter(m => m.mastered).length}</div>
            <div className={styles.statLabel}>Mastered 已掌握</div>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#FEF3C7' }}>🔄</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{mistakes.filter(m => !m.mastered).length}</div>
            <div className={styles.statLabel}>Need Review 需复习</div>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#E0E7FF' }}>📈</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>72%</div>
            <div className={styles.statLabel}>Improvement Rate 改进率</div>
          </div>
        </Card>
      </div>

      {/* View Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${selectedView === 'mistakes' ? styles.active : ''}`}
          onClick={() => setSelectedView('mistakes')}
        >
          <span className={styles.tabIcon}>📋</span>
          Mistake List 错题列表
        </button>
        <button
          className={`${styles.tabButton} ${selectedView === 'patterns' ? styles.active : ''}`}
          onClick={() => setSelectedView('patterns')}
        >
          <span className={styles.tabIcon}>📊</span>
          Error Patterns 错误模式
        </button>
        <button
          className={`${styles.tabButton} ${selectedView === 'practice' ? styles.active : ''}`}
          onClick={() => setSelectedView('practice')}
        >
          <span className={styles.tabIcon}>✍️</span>
          Practice Plan 练习计划
        </button>
      </div>

      {/* Mistake List View */}
      {selectedView === 'mistakes' && (
        <>
          {/* Subject Filter */}
          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Filter by Subject 按科目筛选:</label>
            <div className={styles.subjectFilters}>
              {subjects.map((subject) => (
                <button
                  key={subject}
                  className={`${styles.subjectButton} ${selectedSubject === subject ? styles.active : ''}`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject === 'all' ? 'All Subjects' : subject}
                </button>
              ))}
            </div>
          </div>

          {/* Mistakes List */}
          <div className={styles.mistakesList}>
            {filteredMistakes.map((mistake) => (
              <Card key={mistake.id} className={styles.mistakeCard}>
                <div className={styles.mistakeHeader}>
                  <div className={styles.mistakeSubject}>
                    <span className={styles.subjectBadge}>{mistake.subject}</span>
                    <span className={styles.topicBadge}>{mistake.topic}</span>
                  </div>
                  <div className={styles.mistakeStatus}>
                    {mistake.mastered ? (
                      <span className={styles.masteredBadge}>✅ Mastered</span>
                    ) : (
                      <span className={styles.needsReviewBadge}>🔄 Needs Review</span>
                    )}
                  </div>
                </div>

                <div className={styles.mistakeContent}>
                  <div className={styles.questionSection}>
                    <strong>Question 题目:</strong>
                    <p>{mistake.question}</p>
                  </div>

                  <div className={styles.answersSection}>
                    <div className={styles.answerBox} style={{ borderColor: '#EF4444' }}>
                      <strong>Your Answer 你的答案:</strong>
                      <p>{mistake.yourAnswer}</p>
                    </div>
                    <div className={styles.answerBox} style={{ borderColor: '#10B981' }}>
                      <strong>Correct Answer 正确答案:</strong>
                      <p>{mistake.correctAnswer}</p>
                    </div>
                  </div>

                  <div className={styles.explanationSection}>
                    <strong>💡 Explanation 解释:</strong>
                    <p>{mistake.explanation}</p>
                  </div>

                  <div className={styles.mistakeFooter}>
                    <div className={styles.mistakeInfo}>
                      <span 
                        className={styles.difficultyBadge}
                        style={{ backgroundColor: getDifficultyColor(mistake.difficulty) }}
                      >
                        {mistake.difficulty}
                      </span>
                      <span className={styles.attemptsBadge}>
                        🔄 {mistake.attempts} attempt{mistake.attempts > 1 ? 's' : ''}
                      </span>
                      <span className={styles.dateBadge}>
                        📅 {mistake.date.toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.mistakeActions}>
                      <Button
                        variant="secondary"
                        onClick={() => reviewMistake(mistake)}
                      >
                        Ask AI Tutor 问AI老师
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => generatePractice(mistake)}
                      >
                        Practice Similar 类似练习
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Error Patterns View */}
      {selectedView === 'patterns' && (
        <div className={styles.patternsView}>
          <Card className={styles.patternsCard}>
            <h3 className={styles.sectionTitle}>📊 Error Distribution 错误分布</h3>
            <div className={styles.patternsList}>
              {errorPatterns.map((pattern, index) => (
                <div key={index} className={styles.patternItem}>
                  <div className={styles.patternInfo}>
                    <span className={styles.patternIcon}>{pattern.icon}</span>
                    <div className={styles.patternText}>
                      <div className={styles.patternCategory}>{pattern.category}</div>
                      <div className={styles.patternCategoryZh}>{pattern.categoryZh}</div>
                    </div>
                  </div>
                  <div className={styles.patternStats}>
                    <div className={styles.patternCount}>{pattern.count} mistakes</div>
                    <div className={styles.patternBar}>
                      <div 
                        className={styles.patternBarFill}
                        style={{ 
                          width: `${pattern.percentage}%`,
                          backgroundColor: pattern.color
                        }}
                      />
                    </div>
                    <div className={styles.patternPercentage}>{pattern.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.insightsCard}>
            <h3 className={styles.sectionTitle}>💡 AI Insights & Recommendations</h3>
            <div className={styles.insightsList}>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>🎯</span>
                <div className={styles.insightContent}>
                  <strong>Focus Area:</strong> You make the most mistakes in calculation. Practice more arithmetic problems to improve accuracy.
                </div>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>📈</span>
                <div className={styles.insightContent}>
                  <strong>Progress:</strong> Your grammar mistakes have decreased by 40% this month. Keep it up!
                </div>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>💪</span>
                <div className={styles.insightContent}>
                  <strong>Strength:</strong> You excel at mastering mistakes - 40% mastery rate is excellent!
                </div>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>🔔</span>
                <div className={styles.insightContent}>
                  <strong>Tip:</strong> Review your fraction problems before the upcoming test. Spend 15 minutes daily on this topic.
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Practice Plan View */}
      {selectedView === 'practice' && (
        <div className={styles.practiceView}>
          <Card className={styles.practiceCard}>
            <h3 className={styles.sectionTitle}>✍️ Personalized Practice Plan 个性化练习计划</h3>
            <p className={styles.practiceDescription}>
              Based on your mistake analysis, here's your recommended practice schedule:
            </p>
            
            <div className={styles.practicePlan}>
              <div className={styles.planDay}>
                <div className={styles.planDayHeader}>
                  <span className={styles.planDayIcon}>📅</span>
                  <span className={styles.planDayTitle}>Monday - Fractions Focus</span>
                </div>
                <div className={styles.planTasks}>
                  <div className={styles.planTask}>
                    <input type="checkbox" className={styles.taskCheckbox} />
                    <span>Complete 10 fraction addition problems</span>
                  </div>
                  <div className={styles.planTask}>
                    <input type="checkbox" className={styles.taskCheckbox} />
                    <span>Review LCD concept with AI Tutor</span>
                  </div>
                </div>
              </div>

              <div className={styles.planDay}>
                <div className={styles.planDayHeader}>
                  <span className={styles.planDayIcon}>📅</span>
                  <span className={styles.planDayTitle}>Tuesday - Grammar Practice</span>
                </div>
                <div className={styles.planTasks}>
                  <div className={styles.planTask}>
                    <input type="checkbox" className={styles.taskCheckbox} />
                    <span>Review present simple tense rules</span>
                  </div>
                  <div className={styles.planTask}>
                    <input type="checkbox" className={styles.taskCheckbox} />
                    <span>Complete 15 grammar exercises</span>
                  </div>
                </div>
              </div>

              <div className={styles.planDay}>
                <div className={styles.planDayHeader}>
                  <span className={styles.planDayIcon}>📅</span>
                  <span className={styles.planDayTitle}>Wednesday - Science Review</span>
                </div>
                <div className={styles.planTasks}>
                  <div className={styles.planTask}>
                    <input type="checkbox" className={styles.taskCheckbox} />
                    <span>Watch photosynthesis video</span>
                  </div>
                  <div className={styles.planTask}>
                    <input type="checkbox" className={styles.taskCheckbox} />
                    <span>Take photosynthesis quiz</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.planActions}>
              <Button variant="primary" onClick={() => router.push('/student/magic-tools/practice-generator')}>
                Start Practice Session 开始练习
              </Button>
              <Button variant="secondary" onClick={() => router.push('/student/magic-tools/ai-tutor')}>
                Get AI Help 获取AI帮助
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
    </MainLayout>
  );
}

