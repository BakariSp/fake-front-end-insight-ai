'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Progress } from '../../components/ui';
import styles from './achievements.module.css';

interface Achievement {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  icon: string;
  category: 'learning' | 'progress' | 'social' | 'special';
  unlocked: boolean;
  unlockedDate?: Date;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface Milestone {
  title: string;
  date: Date;
  icon: string;
  description: string;
}

export default function AchievementsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Step',
      titleZh: '第一步',
      description: 'Complete your first AI learning session',
      descriptionZh: '完成第一次AI学习',
      icon: '🎯',
      category: 'learning',
      unlocked: true,
      unlockedDate: new Date('2025-10-01'),
      rarity: 'common',
      points: 10,
    },
    {
      id: '2',
      title: 'On Fire',
      titleZh: '火热连续',
      description: 'Maintain a 7-day study streak',
      descriptionZh: '连续学习7天',
      icon: '🔥',
      category: 'progress',
      unlocked: true,
      unlockedDate: new Date('2025-10-15'),
      rarity: 'rare',
      points: 50,
    },
    {
      id: '3',
      title: 'Rising Star',
      titleZh: '冉冉新星',
      description: 'Improve your grade by 5% or more',
      descriptionZh: '成绩提升5%以上',
      icon: '📈',
      category: 'progress',
      unlocked: true,
      unlockedDate: new Date('2025-10-10'),
      rarity: 'epic',
      points: 100,
    },
    {
      id: '4',
      title: 'Master Reviewer',
      titleZh: '复习大师',
      description: 'Complete 50 mistake reviews',
      descriptionZh: '完成50次错题复习',
      icon: '🎓',
      category: 'learning',
      unlocked: true,
      unlockedDate: new Date('2025-10-18'),
      progress: 50,
      maxProgress: 50,
      rarity: 'epic',
      points: 150,
    },
    {
      id: '5',
      title: 'Perfect Score',
      titleZh: '满分',
      description: 'Achieve 100% on any assignment',
      descriptionZh: '在任何作业中获得100分',
      icon: '💯',
      category: 'learning',
      unlocked: false,
      progress: 95,
      maxProgress: 100,
      rarity: 'legendary',
      points: 200,
    },
    {
      id: '6',
      title: 'Knowledge Seeker',
      titleZh: '知识探索者',
      description: 'Ask 100 questions to AI Tutor',
      descriptionZh: '向AI老师提问100次',
      icon: '🔍',
      category: 'learning',
      unlocked: false,
      progress: 73,
      maxProgress: 100,
      rarity: 'rare',
      points: 75,
    },
    {
      id: '7',
      title: 'Early Bird',
      titleZh: '早起之鸟',
      description: 'Complete a learning session before 8 AM',
      descriptionZh: '在早上8点前完成学习',
      icon: '🌅',
      category: 'special',
      unlocked: true,
      unlockedDate: new Date('2025-10-12'),
      rarity: 'common',
      points: 25,
    },
    {
      id: '8',
      title: 'Night Owl',
      titleZh: '夜猫子',
      description: 'Study after 10 PM for 5 consecutive days',
      descriptionZh: '连续5天在晚上10点后学习',
      icon: '🦉',
      category: 'special',
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      rarity: 'common',
      points: 20,
    },
    {
      id: '9',
      title: 'Social Learner',
      titleZh: '社交学习者',
      description: 'Participate in 10 class discussions',
      descriptionZh: '参与10次班级讨论',
      icon: '👥',
      category: 'social',
      unlocked: false,
      progress: 6,
      maxProgress: 10,
      rarity: 'common',
      points: 30,
    },
    {
      id: '10',
      title: 'Resilience Champion',
      titleZh: '韧性冠军',
      description: 'Master all your mistake problems',
      descriptionZh: '掌握所有错题',
      icon: '💪',
      category: 'progress',
      unlocked: false,
      progress: 18,
      maxProgress: 25,
      rarity: 'legendary',
      points: 250,
    },
    {
      id: '11',
      title: 'Speed Learner',
      titleZh: '快速学习者',
      description: 'Complete 20 assignments ahead of deadline',
      descriptionZh: '提前完成20个作业',
      icon: '⚡',
      category: 'learning',
      unlocked: false,
      progress: 12,
      maxProgress: 20,
      rarity: 'rare',
      points: 80,
    },
    {
      id: '12',
      title: 'Helping Hand',
      titleZh: '互助之手',
      description: 'Help 5 classmates with their questions',
      descriptionZh: '帮助5位同学解答问题',
      icon: '🤝',
      category: 'social',
      unlocked: true,
      unlockedDate: new Date('2025-10-16'),
      rarity: 'rare',
      points: 60,
    },
  ];

  const milestones: Milestone[] = [
    {
      title: 'Joined Insight AI',
      date: new Date('2025-09-01'),
      icon: '🎉',
      description: 'Started your learning journey',
    },
    {
      title: 'First Achievement Unlocked',
      date: new Date('2025-10-01'),
      icon: '🏆',
      description: 'Earned your first badge',
    },
    {
      title: '7-Day Streak',
      date: new Date('2025-10-15'),
      icon: '🔥',
      description: 'Maintained 7 consecutive days of learning',
    },
    {
      title: 'Top 10% Student',
      date: new Date('2025-10-18'),
      icon: '⭐',
      description: 'Ranked in top 10% of your class',
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6B7280';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)';
      case 'rare': return 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)';
      case 'epic': return 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)';
      case 'legendary': return 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)';
      default: return 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)';
    }
  };

  const categories = [
    { id: 'all', name: 'All', nameZh: '全部', icon: '🏆' },
    { id: 'learning', name: 'Learning', nameZh: '学习', icon: '📚' },
    { id: 'progress', name: 'Progress', nameZh: '进步', icon: '📈' },
    { id: 'social', name: 'Social', nameZh: '社交', icon: '👥' },
    { id: 'special', name: 'Special', nameZh: '特殊', icon: '⭐' },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);
  const totalAchievements = achievements.length;
  const completionPercentage = Math.round((unlockedAchievements.length / totalAchievements) * 100);

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
            <span className={styles.icon}>🏆</span>
            Achievement System
          </h1>
          <p className={styles.subtitle}>学习成就系统 - Track your progress and celebrate your wins</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className={styles.overviewCard}>
        <Card className={styles.statsCard}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>🎯</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{unlockedAchievements.length}/{totalAchievements}</div>
                <div className={styles.statLabel}>Achievements Unlocked</div>
                <div className={styles.statLabelZh}>已解锁成就</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{totalPoints}</div>
                <div className={styles.statLabel}>Total Points</div>
                <div className={styles.statLabelZh}>总积分</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>📊</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{completionPercentage}%</div>
                <div className={styles.statLabel}>Completion</div>
                <div className={styles.statLabelZh}>完成度</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>🔥</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>7 Days</div>
                <div className={styles.statLabel}>Current Streak</div>
                <div className={styles.statLabelZh}>当前连续</div>
              </div>
            </div>
          </div>
          <div className={styles.progressSection}>
            <div className={styles.progressLabel}>
              <span>Overall Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress percent={completionPercentage} className={styles.progressBar} showText={false} />
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Filter by Category 按类别筛选</h3>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <div className={styles.categoryNames}>
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryNameZh}>{category.nameZh}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className={styles.achievementsSection}>
        <h3 className={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Achievements' : categories.find(c => c.id === selectedCategory)?.name}
        </h3>
        <div className={styles.achievementsGrid}>
          {filteredAchievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`${styles.achievementCard} ${!achievement.unlocked ? styles.locked : ''}`}
              style={{ background: achievement.unlocked ? getRarityGradient(achievement.rarity) : '#F9FAFB' }}
            >
              <div className={styles.achievementHeader}>
                <div 
                  className={styles.achievementIcon}
                  style={{ 
                    filter: achievement.unlocked ? 'none' : 'grayscale(100%)',
                    opacity: achievement.unlocked ? 1 : 0.5
                  }}
                >
                  {achievement.icon}
                </div>
                <div 
                  className={styles.rarityBadge}
                  style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                >
                  {achievement.rarity}
                </div>
              </div>

              <div className={styles.achievementContent}>
                <h4 className={styles.achievementTitle}>
                  {achievement.title}
                  {achievement.unlocked && <span className={styles.checkmark}>✓</span>}
                </h4>
                <p className={styles.achievementTitleZh}>{achievement.titleZh}</p>
                <p className={styles.achievementDescription}>{achievement.description}</p>
                <p className={styles.achievementDescriptionZh}>{achievement.descriptionZh}</p>

                {achievement.unlocked ? (
                  <div className={styles.unlockedInfo}>
                    <span className={styles.pointsBadge}>+{achievement.points} points</span>
                    <span className={styles.unlockedDate}>
                      {achievement.unlockedDate?.toLocaleDateString()}
                    </span>
                  </div>
                ) : achievement.progress !== undefined && achievement.maxProgress !== undefined ? (
                  <div className={styles.progressInfo}>
                    <div className={styles.progressText}>
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                      <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                    </div>
                    <Progress 
                      percent={(achievement.progress / achievement.maxProgress) * 100}
                      className={styles.achievementProgress}
                      showText={false}
                    />
                  </div>
                ) : (
                  <div className={styles.lockedInfo}>
                    <span className={styles.lockedBadge}>🔒 Locked</span>
                    <span className={styles.pointsPreview}>{achievement.points} points</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <Card className={styles.timelineCard}>
        <h3 className={styles.sectionTitle}>🎯 Your Journey 你的成长历程</h3>
        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}>
                <span className={styles.timelineIcon}>{milestone.icon}</span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineTitle}>{milestone.title}</div>
                <div className={styles.timelineDescription}>{milestone.description}</div>
                <div className={styles.timelineDate}>
                  {milestone.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivation Card */}
      <Card className={styles.motivationCard}>
        <div className={styles.motivationContent}>
          <span className={styles.motivationIcon}>💪</span>
          <div className={styles.motivationText}>
            <h3 className={styles.motivationTitle}>Keep Going!</h3>
            <p className={styles.motivationMessage}>
              You're doing amazing! Keep up the great work and continue your learning journey. 
              Every achievement is a step towards success!
            </p>
            <p className={styles.motivationMessageZh}>
              你做得很棒！继续保持努力，继续你的学习之旅。每一个成就都是迈向成功的一步！
            </p>
          </div>
        </div>
      </Card>
    </div>
    </MainLayout>
  );
}

