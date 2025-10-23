'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Chart, Progress } from '@ui';
import styles from './performance.module.css';

interface SkillArea {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  improvement: number;
}

interface SubjectPerformance {
  subject: string;
  average: number;
  classAverage: number;
  trend: number;
  color: string;
}

export default function PerformancePage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month');

  // Mock performance data
  const overallStats = {
    overallScore: 85,
    classRank: 8,
    totalStudents: 32,
    improvementRate: 12,
    assignmentsCompleted: 24,
    totalAssignments: 28,
  };

  const subjectPerformance: SubjectPerformance[] = [
    { subject: 'Math', average: 88, classAverage: 82, trend: 5, color: '#3B82F6' },
    { subject: 'English', average: 92, classAverage: 85, trend: 8, color: '#10B981' },
    { subject: 'Science', average: 78, classAverage: 80, trend: -3, color: '#F59E0B' },
    { subject: 'History', average: 85, classAverage: 83, trend: 2, color: '#8B5CF6' },
  ];

  const skillAreas: SkillArea[] = [
    { name: 'Problem Solving', score: 90, trend: 'up', improvement: 8 },
    { name: 'Critical Thinking', score: 85, trend: 'up', improvement: 5 },
    { name: 'Reading Comprehension', score: 88, trend: 'stable', improvement: 0 },
    { name: 'Writing Skills', score: 82, trend: 'up', improvement: 10 },
    { name: 'Mathematical Reasoning', score: 75, trend: 'down', improvement: -2 },
    { name: 'Scientific Analysis', score: 80, trend: 'up', improvement: 6 },
  ];

  const weeklyProgress = [
    { label: 'Week 1', value: 78 },
    { label: 'Week 2', value: 80 },
    { label: 'Week 3', value: 82 },
    { label: 'Week 4', value: 85 },
  ];

  const studyHabits = {
    avgStudyTime: '2.5 hrs/day',
    mostActiveTime: '7-9 PM',
    streakDays: 15,
    completionRate: 92,
  };

  const strengths = [
    'Excellent at problem-solving tasks',
    'Strong reading comprehension skills',
    'Consistent assignment completion',
    'Active participation in discussions',
  ];

  const improvements = [
    'Practice more mathematical reasoning problems',
    'Focus on scientific analysis techniques',
    'Improve time management for complex tasks',
    'Review concepts before moving to new topics',
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'stable': return '#6B7280';
    }
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
            <span className={styles.icon}>📈</span>
            Performance Dashboard
          </h1>
          <p className={styles.subtitle}>学习表现评估 - Comprehensive analysis of your academic performance</p>
        </div>
      </div>

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
            <div className={styles.statValue}>{overallStats.overallScore}%</div>
            <div className={styles.statLabel}>Overall Score</div>
            <div className={styles.statTrend} style={{ color: '#10B981' }}>
              +{overallStats.improvementRate}% improvement
            </div>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#DCFCE7' }}>🏆</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>#{overallStats.classRank}</div>
            <div className={styles.statLabel}>Class Rank</div>
            <div className={styles.statTrend}>out of {overallStats.totalStudents} students</div>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#FEF3C7' }}>✅</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{overallStats.assignmentsCompleted}/{overallStats.totalAssignments}</div>
            <div className={styles.statLabel}>Assignments</div>
            <div className={styles.statTrend}>
              {Math.round((overallStats.assignmentsCompleted / overallStats.totalAssignments) * 100)}% completion
            </div>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#E0E7FF' }}>📚</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{studyHabits.avgStudyTime}</div>
            <div className={styles.statLabel}>Avg Study Time</div>
            <div className={styles.statTrend}>Most active: {studyHabits.mostActiveTime}</div>
          </div>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className={styles.chartCard}>
        <h3 className={styles.sectionTitle}>📈 Progress Over Time</h3>
        <div className={styles.chartContainer}>
          <Chart
            data={weeklyProgress}
            color="#4F46E5"
            height={300}
          />
        </div>
      </Card>

      {/* Subject Performance */}
      <Card className={styles.subjectsCard}>
        <h3 className={styles.sectionTitle}>📚 Subject Performance</h3>
        <div className={styles.subjectsGrid}>
          {subjectPerformance.map((subject) => (
            <div key={subject.subject} className={styles.subjectItem}>
              <div className={styles.subjectHeader}>
                <span className={styles.subjectName}>{subject.subject}</span>
                <span 
                  className={styles.subjectTrend}
                  style={{ color: subject.trend >= 0 ? '#10B981' : '#EF4444' }}
                >
                  {subject.trend > 0 ? '+' : ''}{subject.trend}%
                </span>
              </div>
              
              <div className={styles.subjectScores}>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Your Average</span>
                  <span className={styles.scoreValue} style={{ color: subject.color }}>
                    {subject.average}%
                  </span>
                </div>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Class Average</span>
                  <span className={styles.scoreValue}>{subject.classAverage}%</span>
                </div>
              </div>

              <div className={styles.comparisonBar}>
                <div 
                  className={styles.yourScore}
                  style={{ 
                    width: `${subject.average}%`,
                    backgroundColor: subject.color
                  }}
                />
                <div 
                  className={styles.classScore}
                  style={{ 
                    left: `${subject.classAverage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skill Areas */}
      <Card className={styles.skillsCard}>
        <h3 className={styles.sectionTitle}>🎯 Skill Assessment</h3>
        <div className={styles.skillsGrid}>
          {skillAreas.map((skill) => (
            <div key={skill.name} className={styles.skillItem}>
              <div className={styles.skillHeader}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.skillTrend}>
                  <span style={{ color: getTrendColor(skill.trend) }}>
                    {getTrendIcon(skill.trend)}
                  </span>
                  {skill.improvement !== 0 && (
                    <span 
                      className={styles.skillImprovement}
                      style={{ color: getTrendColor(skill.trend) }}
                    >
                      {skill.improvement > 0 ? '+' : ''}{skill.improvement}%
                    </span>
                  )}
                </div>
              </div>
              <Progress percent={skill.score} className={styles.skillProgress} showText={false} />
              <div className={styles.skillScore}>{skill.score}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <div className={styles.insightsGrid}>
        <Card className={styles.insightCard} style={{ background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)' }}>
          <h3 className={styles.insightTitle}>
            <span className={styles.insightIcon}>💪</span>
            Your Strengths
          </h3>
          <ul className={styles.insightList}>
            {strengths.map((strength, index) => (
              <li key={index} className={styles.insightItem}>
                <span className={styles.bulletIcon}>✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </Card>

        <Card className={styles.insightCard} style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
          <h3 className={styles.insightTitle}>
            <span className={styles.insightIcon}>🎯</span>
            Areas to Improve
          </h3>
          <ul className={styles.insightList}>
            {improvements.map((improvement, index) => (
              <li key={index} className={styles.insightItem}>
                <span className={styles.bulletIcon}>→</span>
                {improvement}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Study Habits */}
      <Card className={styles.habitsCard}>
        <h3 className={styles.sectionTitle}>⏰ Study Habits & Patterns</h3>
        <div className={styles.habitsGrid}>
          <div className={styles.habitItem}>
            <div className={styles.habitIcon}>📅</div>
            <div className={styles.habitContent}>
              <div className={styles.habitValue}>{studyHabits.streakDays} days</div>
              <div className={styles.habitLabel}>Current Streak</div>
            </div>
          </div>
          <div className={styles.habitItem}>
            <div className={styles.habitIcon}>✅</div>
            <div className={styles.habitContent}>
              <div className={styles.habitValue}>{studyHabits.completionRate}%</div>
              <div className={styles.habitLabel}>Completion Rate</div>
            </div>
          </div>
          <div className={styles.habitItem}>
            <div className={styles.habitIcon}>⏰</div>
            <div className={styles.habitContent}>
              <div className={styles.habitValue}>{studyHabits.avgStudyTime}</div>
              <div className={styles.habitLabel}>Daily Study Time</div>
            </div>
          </div>
          <div className={styles.habitItem}>
            <div className={styles.habitIcon}>🌙</div>
            <div className={styles.habitContent}>
              <div className={styles.habitValue}>{studyHabits.mostActiveTime}</div>
              <div className={styles.habitLabel}>Peak Study Time</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className={styles.actionsCard}>
        <h3 className={styles.actionsTitle}>🚀 Next Steps</h3>
        <div className={styles.actionsGrid}>
          <Button
            variant="primary"
            onClick={() => router.push('/student/magic-tools/mistake-analysis')}
          >
            Review Mistakes 复习错题
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push('/student/magic-tools/practice-generator')}
          >
            Practice Weak Areas 针对性练习
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/student/magic-tools/ai-tutor')}
          >
            Get AI Help 获取AI帮助
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/student/magic-tools/achievements')}
          >
            View Achievements 查看成就
          </Button>
        </div>
      </div>
    </div>
    </MainLayout>
  );
}

