'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Chart, Progress } from '@ui';
import styles from './learning-analytics.module.css';

// ============== Type Definitions (Based on PRD G4) ==============

interface StudentInfo {
  studentId: string;
  name: string;
  grade: string;
  academicYear: string;
}

interface AssignmentPerformance {
  totalAssignments: number;
  submittedAssignments: number;
  gradedAssignments: number;
  pendingAssignments: number;
  submissionRate: number;
  onTimeRate: number;
  averageScore: number;
  scoreRange: {
    excellent: number;      // 90-100
    good: number;          // 80-89
    fair: number;          // 70-79
    needsImprovement: number; // <70
  };
}

interface ClassSummary {
  classId: string;
  className: string;
  subject: string;
  teacher: string;
  assignmentCount: number;
  averageScore: number;
  submissionRate: number;
  recentTrend: 'improving' | 'stable' | 'declining';
  lastSubmission: Date;
}

interface SubjectAnalysis {
  subject: string;
  assignmentCount: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  trend: 'improving' | 'stable' | 'declining';
  scoreHistory: Array<{
    date: Date;
    score: number;
    assignmentTitle: string;
  }>;
}

interface CommonMistake {
  subject: string;
  topic: string;
  mistakeCount: number;
  lastOccurred: Date;
  relatedAssignments: string[];
  aiSuggestion: string;
}

interface TrendAnalysis {
  overallTrend: 'improving' | 'stable' | 'declining';
  recentPerformance: {
    last7Days: { assignmentsCompleted: number; averageScore: number };
    last30Days: { assignmentsCompleted: number; averageScore: number };
  };
  strengthSubjects: string[];
  weaknessSubjects: string[];
  improvementRate: number;
}

interface LearningHabits {
  averageSubmissionTime: string;
  preferredStudyDays: string[];
  procrastinationRate: number;
  earlySubmissionRate: number;
}

interface StudentLearningProfile {
  studentInfo: StudentInfo;
  assignmentPerformance: AssignmentPerformance;
  classSummary: ClassSummary[];
  subjectAnalysis: SubjectAnalysis[];
  commonMistakes: CommonMistake[];
  trendAnalysis: TrendAnalysis;
  learningHabits: LearningHabits;
}

// ============== Main Component ==============

export default function LearningAnalyticsPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month');

  // ============== Mock Data (Based on PRD G4) ==============
  
  const learningProfile: StudentLearningProfile = {
    studentInfo: {
      studentId: "S2024001",
      name: "陳小明 Chan Siu Ming",
      grade: "中五 (S5)",
      academicYear: "2024-2025"
    },
    
    assignmentPerformance: {
      totalAssignments: 42,
      submittedAssignments: 40,
      gradedAssignments: 38,
      pendingAssignments: 2,
      submissionRate: 95.2,
      onTimeRate: 88.0,
      averageScore: 84.5,
      scoreRange: {
        excellent: 15,
        good: 18,
        fair: 4,
        needsImprovement: 1
      }
    },
    
    classSummary: [
      {
        classId: "C001",
        className: "中五A班數學 S5A Mathematics",
        subject: "數學 Mathematics",
        teacher: "黃老師 Mr. Wong",
        assignmentCount: 12,
        averageScore: 78.5,
        submissionRate: 100,
        recentTrend: "improving",
        lastSubmission: new Date("2024-11-15")
      },
      {
        classId: "C002",
        className: "中五A班英語 S5A English",
        subject: "英語 English",
        teacher: "Mrs. Lee",
        assignmentCount: 15,
        averageScore: 88.2,
        submissionRate: 93.3,
        recentTrend: "stable",
        lastSubmission: new Date("2024-11-14")
      },
      {
        classId: "C003",
        className: "中五A班物理 S5A Physics",
        subject: "物理 Physics",
        teacher: "陳老師 Dr. Chan",
        assignmentCount: 8,
        averageScore: 82.0,
        submissionRate: 100,
        recentTrend: "improving",
        lastSubmission: new Date("2024-11-13")
      },
      {
        classId: "C004",
        className: "中五A班化學 S5A Chemistry",
        subject: "化學 Chemistry",
        teacher: "林老師 Ms. Lam",
        assignmentCount: 7,
        averageScore: 85.5,
        submissionRate: 85.7,
        recentTrend: "stable",
        lastSubmission: new Date("2024-11-10")
      }
    ],
    
    subjectAnalysis: [
      {
        subject: "數學 Mathematics",
        assignmentCount: 12,
        averageScore: 78.5,
        highestScore: 95,
        lowestScore: 65,
        trend: "improving",
        scoreHistory: [
          { date: new Date("2024-10-01"), score: 72, assignmentTitle: "代數練習1 Algebra 1" },
          { date: new Date("2024-10-08"), score: 75, assignmentTitle: "代數練習2 Algebra 2" },
          { date: new Date("2024-10-15"), score: 82, assignmentTitle: "函數圖像 Functions" },
          { date: new Date("2024-10-22"), score: 85, assignmentTitle: "三角函數 Trigonometry" },
        ]
      },
      {
        subject: "英語 English",
        assignmentCount: 15,
        averageScore: 88.2,
        highestScore: 95,
        lowestScore: 80,
        trend: "stable",
        scoreHistory: [
          { date: new Date("2024-10-03"), score: 87, assignmentTitle: "Reading Comprehension 1" },
          { date: new Date("2024-10-10"), score: 89, assignmentTitle: "Essay Writing" },
          { date: new Date("2024-10-17"), score: 88, assignmentTitle: "Grammar Exercise" },
          { date: new Date("2024-10-24"), score: 90, assignmentTitle: "Literature Analysis" },
        ]
      },
      {
        subject: "物理 Physics",
        assignmentCount: 8,
        averageScore: 82.0,
        highestScore: 92,
        lowestScore: 70,
        trend: "improving",
        scoreHistory: [
          { date: new Date("2024-10-05"), score: 75, assignmentTitle: "力學基礎 Mechanics" },
          { date: new Date("2024-10-12"), score: 80, assignmentTitle: "運動學 Kinematics" },
          { date: new Date("2024-10-19"), score: 85, assignmentTitle: "能量守恆 Energy" },
          { date: new Date("2024-10-26"), score: 88, assignmentTitle: "電磁學 Electromagnetism" },
        ]
      },
      {
        subject: "化學 Chemistry",
        assignmentCount: 7,
        averageScore: 85.5,
        highestScore: 93,
        lowestScore: 78,
        trend: "stable",
        scoreHistory: [
          { date: new Date("2024-10-04"), score: 83, assignmentTitle: "化學鍵 Chemical Bonding" },
          { date: new Date("2024-10-11"), score: 86, assignmentTitle: "氧化還原 Redox" },
          { date: new Date("2024-10-18"), score: 85, assignmentTitle: "酸鹼反應 Acid-Base" },
          { date: new Date("2024-10-25"), score: 88, assignmentTitle: "有機化學 Organic Chem" },
        ]
      }
    ],
    
    commonMistakes: [
      {
        subject: "數學 Mathematics",
        topic: "二次方程求解 Quadratic Equations",
        mistakeCount: 5,
        lastOccurred: new Date("2024-11-10"),
        relatedAssignments: ["A001", "A005", "A012"],
        aiSuggestion: "建議復習配方法和求根公式的應用 Review completing the square and quadratic formula"
      },
      {
        subject: "物理 Physics",
        topic: "力學分析-自由體圖 Free Body Diagrams",
        mistakeCount: 3,
        lastOccurred: new Date("2024-11-12"),
        relatedAssignments: ["A018", "A022"],
        aiSuggestion: "練習繪製自由體圖，注意力的方向標注 Practice drawing FBDs with correct force directions"
      },
      {
        subject: "英語 English",
        topic: "寫作結構 Essay Structure",
        mistakeCount: 4,
        lastOccurred: new Date("2024-11-08"),
        relatedAssignments: ["A010", "A015", "A020"],
        aiSuggestion: "加強段落組織和論證邏輯 Strengthen paragraph organization and argumentation"
      },
      {
        subject: "化學 Chemistry",
        topic: "化學平衡計算 Equilibrium Calculations",
        mistakeCount: 2,
        lastOccurred: new Date("2024-11-05"),
        relatedAssignments: ["A025", "A028"],
        aiSuggestion: "重點復習Le Chatelier原理和平衡常數 Review Le Chatelier's principle and Kc/Kp"
      }
    ],
    
    trendAnalysis: {
      overallTrend: "improving",
      recentPerformance: {
        last7Days: {
          assignmentsCompleted: 3,
          averageScore: 87.3
        },
        last30Days: {
          assignmentsCompleted: 12,
          averageScore: 84.5
        }
      },
      strengthSubjects: ["英語 English", "化學 Chemistry", "經濟 Economics"],
      weaknessSubjects: ["數學 Mathematics", "物理 Physics"],
      improvementRate: 5.2
    },
    
  learningHabits: {
    averageSubmissionTime: "22:30",
    preferredStudyDays: [], // 暂不实现，需要行为日志追踪
    procrastinationRate: 35.0,
    earlySubmissionRate: 42.0
  }
  };

  // ============== Helper Functions ==============

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➡️';
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return '#10B981';
      case 'declining': return '#EF4444';
      case 'stable': return '#6B7280';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-HK', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getSubmissionRateColor = (rate: number) => {
    if (rate >= 90) return '#10B981';
    if (rate >= 75) return '#F59E0B';
    return '#EF4444';
  };

  // Chart data for progress
  const progressChartData = learningProfile.subjectAnalysis[0].scoreHistory.map(item => ({
    label: formatDate(item.date),
    value: item.score
  }));

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* Header */}
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
              Learning Analytics
            </h1>
            <p className={styles.subtitle}>學習統計分析 - Comprehensive analysis of your learning performance</p>
          </div>
        </div>

        {/* Student Info Card */}
        <Card className={styles.studentInfoCard}>
          <div className={styles.studentInfoContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>👨‍🎓</div>
            </div>
            <div className={styles.infoSection}>
              <h2 className={styles.studentName}>{learningProfile.studentInfo.name}</h2>
              <div className={styles.studentMeta}>
                <span className={styles.metaItem}>
                  <strong>學號 Student ID:</strong> {learningProfile.studentInfo.studentId}
                </span>
                <span className={styles.metaItem}>
                  <strong>年級 Grade:</strong> {learningProfile.studentInfo.grade}
                </span>
                <span className={styles.metaItem}>
                  <strong>學年 Academic Year:</strong> {learningProfile.studentInfo.academicYear}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeframe Filter */}
        <div className={styles.timeframeSection}>
          <button
            className={`${styles.timeframeBtn} ${selectedTimeframe === 'week' ? styles.active : ''}`}
            onClick={() => setSelectedTimeframe('week')}
          >
            This Week
          </button>
          <button
            className={`${styles.timeframeBtn} ${selectedTimeframe === 'month' ? styles.active : ''}`}
            onClick={() => setSelectedTimeframe('month')}
          >
            This Month
          </button>
          <button
            className={`${styles.timeframeBtn} ${selectedTimeframe === 'semester' ? styles.active : ''}`}
            onClick={() => setSelectedTimeframe('semester')}
          >
            This Semester
          </button>
        </div>

        {/* Overall Stats */}
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#EEF2FF' }}>📊</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{learningProfile.assignmentPerformance.totalAssignments}</div>
              <div className={styles.statLabel}>Total Assignments 總作業數</div>
              <div className={styles.statTrend} style={{ color: '#10B981' }}>
                {learningProfile.assignmentPerformance.submittedAssignments} submitted 已提交
              </div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#DCFCE7' }}>✅</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{learningProfile.assignmentPerformance.submissionRate}%</div>
              <div className={styles.statLabel}>Submission Rate 提交率</div>
              <div className={styles.statTrend}>
                On-time: {learningProfile.assignmentPerformance.onTimeRate}% 按時
              </div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#FEF3C7' }}>📈</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{learningProfile.assignmentPerformance.averageScore}%</div>
              <div className={styles.statLabel}>Average Score 平均分</div>
              <div className={styles.statTrend} style={{ color: '#10B981' }}>
                +{learningProfile.trendAnalysis.improvementRate}% improvement 進步
              </div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#E0E7FF' }}>🔥</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{getTrendIcon(learningProfile.trendAnalysis.overallTrend)}</div>
              <div className={styles.statLabel}>Overall Trend 整體趨勢</div>
              <div className={styles.statTrend} style={{ color: getTrendColor(learningProfile.trendAnalysis.overallTrend) }}>
                {learningProfile.trendAnalysis.overallTrend === 'improving' ? 'Improving 進步中' :
                 learningProfile.trendAnalysis.overallTrend === 'stable' ? 'Stable 穩定' : 'Needs Attention 需改善'}
              </div>
            </div>
          </Card>
        </div>

        {/* Score Distribution */}
        <Card className={styles.distributionCard}>
          <h3 className={styles.sectionTitle}>📊 Score Distribution 分數分佈</h3>
          <div className={styles.distributionGrid}>
            <div className={styles.distributionItem} style={{ background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)' }}>
              <div className={styles.distributionValue}>{learningProfile.assignmentPerformance.scoreRange.excellent}</div>
              <div className={styles.distributionLabel}>Excellent 優秀</div>
              <div className={styles.distributionRange}>90-100%</div>
            </div>
            <div className={styles.distributionItem} style={{ background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)' }}>
              <div className={styles.distributionValue}>{learningProfile.assignmentPerformance.scoreRange.good}</div>
              <div className={styles.distributionLabel}>Good 良好</div>
              <div className={styles.distributionRange}>80-89%</div>
            </div>
            <div className={styles.distributionItem} style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
              <div className={styles.distributionValue}>{learningProfile.assignmentPerformance.scoreRange.fair}</div>
              <div className={styles.distributionLabel}>Fair 一般</div>
              <div className={styles.distributionRange}>70-79%</div>
            </div>
            <div className={styles.distributionItem} style={{ background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)' }}>
              <div className={styles.distributionValue}>{learningProfile.assignmentPerformance.scoreRange.needsImprovement}</div>
              <div className={styles.distributionLabel}>Needs Work 需改善</div>
              <div className={styles.distributionRange}>&lt;70%</div>
            </div>
          </div>
        </Card>

        {/* Class Performance Table */}
        <Card className={styles.tableCard}>
          <h3 className={styles.sectionTitle}>📚 Class Performance 各班級表現</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.performanceTable}>
              <thead>
                <tr>
                  <th>Class 班級</th>
                  <th>Subject 科目</th>
                  <th>Teacher 教師</th>
                  <th>Assignments 作業數</th>
                  <th>Avg Score 平均分</th>
                  <th>Submission 提交率</th>
                  <th>Trend 趨勢</th>
                  <th>Last Submit 最後提交</th>
                </tr>
              </thead>
              <tbody>
                {learningProfile.classSummary.map((classItem) => (
                  <tr key={classItem.classId}>
                    <td className={styles.classNameCell}>{classItem.className}</td>
                    <td>{classItem.subject}</td>
                    <td>{classItem.teacher}</td>
                    <td className={styles.centerCell}>{classItem.assignmentCount}</td>
                    <td className={styles.scoreCell}>
                      <span style={{ 
                        color: classItem.averageScore >= 85 ? '#10B981' : 
                               classItem.averageScore >= 75 ? '#F59E0B' : '#EF4444',
                        fontWeight: 600
                      }}>
                        {classItem.averageScore}%
                      </span>
                    </td>
                    <td className={styles.centerCell}>
                      <span style={{ color: getSubmissionRateColor(classItem.submissionRate) }}>
                        {classItem.submissionRate}%
                      </span>
                    </td>
                    <td className={styles.trendCell}>
                      <span style={{ color: getTrendColor(classItem.recentTrend) }}>
                        {getTrendIcon(classItem.recentTrend)} {classItem.recentTrend}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{formatDate(classItem.lastSubmission)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Subject Performance Chart */}
        <Card className={styles.chartCard}>
          <h3 className={styles.sectionTitle}>📈 Subject Performance Trends 科目表現趨勢</h3>
          <div className={styles.subjectsGrid}>
            {learningProfile.subjectAnalysis.map((subject) => (
              <div key={subject.subject} className={styles.subjectCard}>
                <div className={styles.subjectHeader}>
                  <div className={styles.subjectName}>{subject.subject}</div>
                  <div className={styles.subjectTrend} style={{ color: getTrendColor(subject.trend) }}>
                    {getTrendIcon(subject.trend)}
                  </div>
                </div>
                <div className={styles.subjectStats}>
                  <div className={styles.mainScore}>{subject.averageScore}%</div>
                  <div className={styles.scoreRange}>
                    <span>H: {subject.highestScore}%</span>
                    <span>L: {subject.lowestScore}%</span>
                  </div>
                </div>
                <Progress percent={subject.averageScore} className={styles.subjectProgress} />
                <div className={styles.subjectMeta}>
                  {subject.assignmentCount} assignments
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Common Mistakes Analysis */}
        <Card className={styles.mistakesCard}>
          <h3 className={styles.sectionTitle}>⚠️ Common Mistakes 常見錯誤分析</h3>
          <div className={styles.mistakesGrid}>
            {learningProfile.commonMistakes.map((mistake, index) => (
              <div key={index} className={styles.mistakeItem}>
                <div className={styles.mistakeHeader}>
                  <div className={styles.mistakeSubject}>{mistake.subject}</div>
                  <div className={styles.mistakeCount}>
                    <span className={styles.countBadge}>{mistake.mistakeCount}x</span>
                  </div>
                </div>
                <div className={styles.mistakeTopic}>{mistake.topic}</div>
                <div className={styles.mistakeMeta}>
                  Last occurred: {formatDate(mistake.lastOccurred)}
                </div>
                <div className={styles.mistakeSuggestion}>
                  <span className={styles.suggestionIcon}>💡</span>
                  {mistake.aiSuggestion}
                </div>
                <div className={styles.relatedAssignments}>
                  Related: {mistake.relatedAssignments.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Habits */}
        <Card className={styles.habitsCard}>
          <h3 className={styles.sectionTitle}>⏰ Learning Habits 學習習慣分析</h3>
          <div className={styles.habitsGrid}>
            <div className={styles.habitItem}>
              <div className={styles.habitIcon}>🕐</div>
              <div className={styles.habitContent}>
                <div className={styles.habitValue}>{learningProfile.learningHabits.averageSubmissionTime}</div>
                <div className={styles.habitLabel}>Average Submission Time 平均提交時間</div>
              </div>
            </div>
            <div className={styles.habitItem}>
              <div className={styles.habitIcon}>⏰</div>
              <div className={styles.habitContent}>
                <div className={styles.habitValue}>{learningProfile.learningHabits.procrastinationRate}%</div>
                <div className={styles.habitLabel}>Procrastination Rate 拖延率</div>
                <div className={styles.habitHint}>Submitted within 24h of deadline</div>
              </div>
            </div>
            <div className={styles.habitItem}>
              <div className={styles.habitIcon}>⚡</div>
              <div className={styles.habitContent}>
                <div className={styles.habitValue}>{learningProfile.learningHabits.earlySubmissionRate}%</div>
                <div className={styles.habitLabel}>Early Submission Rate 提前提交率</div>
                <div className={styles.habitHint}>Submitted 48h+ before deadline</div>
              </div>
            </div>
            {learningProfile.learningHabits.preferredStudyDays.length > 0 && (
              <div className={styles.habitItem}>
                <div className={styles.habitIcon}>📅</div>
                <div className={styles.habitContent}>
                  <div className={styles.habitValue}>{learningProfile.learningHabits.preferredStudyDays.join(', ')}</div>
                  <div className={styles.habitLabel}>Preferred Study Days 常用學習日</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className={styles.insightsGrid}>
          <Card className={styles.insightCard} style={{ background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)' }}>
            <h3 className={styles.insightTitle}>
              <span className={styles.insightIcon}>💪</span>
              Your Strengths 你的優勢
            </h3>
            <ul className={styles.insightList}>
              {learningProfile.trendAnalysis.strengthSubjects.map((subject, index) => (
                <li key={index} className={styles.insightItem}>
                  <span className={styles.bulletIcon}>✓</span>
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
            <div className={styles.insightMeta}>
              Keep up the excellent work! 繼續保持！
            </div>
          </Card>

          <Card className={styles.insightCard} style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
            <h3 className={styles.insightTitle}>
              <span className={styles.insightIcon}>🎯</span>
              Areas to Improve 需要改善
            </h3>
            <ul className={styles.insightList}>
              {learningProfile.trendAnalysis.weaknessSubjects.map((subject, index) => (
                <li key={index} className={styles.insightItem}>
                  <span className={styles.bulletIcon}>→</span>
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
            <div className={styles.insightMeta}>
              Focus on these subjects for better results 重點關注這些科目
            </div>
          </Card>
        </div>

        {/* Recent Performance */}
        <Card className={styles.recentCard}>
          <h3 className={styles.sectionTitle}>🔥 Recent Performance 近期表現</h3>
          <div className={styles.recentGrid}>
            <div className={styles.recentItem}>
              <div className={styles.recentLabel}>Last 7 Days 最近7天</div>
              <div className={styles.recentStats}>
                <div className={styles.recentStat}>
                  <span className={styles.recentValue}>{learningProfile.trendAnalysis.recentPerformance.last7Days.assignmentsCompleted}</span>
                  <span className={styles.recentUnit}>assignments 作業</span>
                </div>
                <div className={styles.recentStat}>
                  <span className={styles.recentValue}>{learningProfile.trendAnalysis.recentPerformance.last7Days.averageScore}%</span>
                  <span className={styles.recentUnit}>avg score 平均分</span>
                </div>
              </div>
            </div>
            <div className={styles.recentItem}>
              <div className={styles.recentLabel}>Last 30 Days 最近30天</div>
              <div className={styles.recentStats}>
                <div className={styles.recentStat}>
                  <span className={styles.recentValue}>{learningProfile.trendAnalysis.recentPerformance.last30Days.assignmentsCompleted}</span>
                  <span className={styles.recentUnit}>assignments 作業</span>
                </div>
                <div className={styles.recentStat}>
                  <span className={styles.recentValue}>{learningProfile.trendAnalysis.recentPerformance.last30Days.averageScore}%</span>
                  <span className={styles.recentUnit}>avg score 平均分</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className={styles.actionsCard}>
          <h3 className={styles.actionsTitle}>🚀 Next Steps 下一步行動</h3>
          <p className={styles.actionsSubtitle}>
            Based on your learning analytics, here are recommended actions 根據你的學習數據，建議採取以下行動
          </p>
          <div className={styles.actionsGrid}>
            <Button
              variant="primary"
              onClick={() => router.push('/student/insight-tools/ai-tutor')}
            >
              💬 Ask AI for Help 向AI導師求助
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push('/student/insight-tools/mistake-analysis')}
            >
              📝 Review Mistakes 復習錯題
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/student/insight-tools/practice-generator')}
            >
              🎯 Practice Weak Areas 針對性練習
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/student/classes')}
            >
              📚 View Classes 查看班級
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

