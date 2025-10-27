'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, StatCard } from '@ui';
import styles from './insightTools.module.css';

export default function InsightToolsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'favorite' | 'learning' | 'analysis' | 'achievement'>('all');

  // Mock statistics
  const stats = {
    aiInteractions: 127,
    mistakesFixed: 34,
    achievementsUnlocked: 12,
    studyStreak: 7,
  };

  const tools = [
    {
      id: 'ai-tutor',
      title: 'AI Learning Tutor',
      titleZh: 'AI 学习助手',
      description: 'Get personalized help with homework, ask questions, and receive AI-powered explanations',
      descriptionZh: '获得作业辅导、提问和AI讲解',
      icon: '🤖',
      category: 'learning',
      color: '#4F46E5',
      features: ['Homework Help', 'Step-by-step Explanations', 'Practice Problems', 'Daily Tasks'],
      href: '/student/insight-tools/ai-tutor',
      isFavorite: true,
      usageCount: 23,
    },
    {
      id: 'mistake-analysis',
      title: 'Mistake Analysis',
      titleZh: '错题分析',
      description: 'Review your mistakes, understand patterns, and get personalized practice',
      descriptionZh: '回顾错题、了解错误模式、获得针对性练习',
      icon: '📊',
      category: 'analysis',
      color: '#DC2626',
      features: ['Error Patterns', 'Targeted Practice', 'Progress Tracking', 'Smart Review'],
      href: '/student/insight-tools/mistake-analysis',
      isFavorite: true,
      usageCount: 18,
    },
    {
      id: 'achievement-system',
      title: 'Achievement System',
      titleZh: '学习成就系统',
      description: 'Track your progress, earn badges, and celebrate your learning journey',
      descriptionZh: '追踪进步、获得勋章、庆祝学习成就',
      icon: '🏆',
      category: 'achievement',
      color: '#F59E0B',
      features: ['Badges & Rewards', 'Progress Timeline', 'Growth Analytics', 'Motivation Boost'],
      href: '/student/insight-tools/achievements',
      isFavorite: false,
      usageCount: 8,
    },
    {
      id: 'practice-generator',
      title: 'Practice Generator',
      titleZh: '智能练习生成',
      description: 'AI generates personalized practice problems based on your performance',
      descriptionZh: 'AI根据你的表现生成个性化练习题',
      icon: '✨',
      category: 'learning',
      color: '#10B981',
      features: ['Custom Difficulty', 'Topic-based', 'Adaptive Learning', 'Instant Feedback'],
      href: '/student/insight-tools/practice-generator',
      isFavorite: true,
      usageCount: 15,
    },
    {
      id: 'wellness-chat',
      title: 'Wellness & Study Chat',
      titleZh: '学习与心理支持',
      description: 'Chat with AI about study stress, motivation, and mental wellness',
      descriptionZh: '与AI聊天，获得学习压力、动力和心理健康支持',
      icon: '💬',
      category: 'learning',
      color: '#8B5CF6',
      features: ['Study Tips', 'Stress Management', 'Motivation', 'Time Management'],
      href: '/student/insight-tools/wellness-chat',
      isFavorite: false,
      usageCount: 5,
    },
    {
      id: 'performance-eval',
      title: 'Performance Dashboard',
      titleZh: '学习表现评估',
      description: 'Comprehensive analysis of your academic performance and improvement areas',
      descriptionZh: '全面分析你的学业表现和改进方向',
      icon: '📈',
      category: 'analysis',
      color: '#06B6D4',
      features: ['Skill Assessment', 'Improvement Trends', 'Subject Comparison', 'AI Insights'],
      href: '/student/insight-tools/performance',
      isFavorite: true,
      usageCount: 12,
    },
  ];

  const favoriteTools = tools.filter(tool => tool.isFavorite);

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : selectedCategory === 'favorite'
    ? favoriteTools
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <MainLayout>
      <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <span className={styles.icon}>✨</span>
              Insight Tools
            </h1>
            <p className={styles.subtitle}>
              洞察工具 - Personalized learning tools powered by artificial intelligence
            </p>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className={styles.statsGrid}>
          <StatCard
            title="AI Interactions"
            value={stats.aiInteractions.toString()}
            icon="🤖"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Mistakes Fixed"
            value={stats.mistakesFixed.toString()}
            icon="✅"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Achievements"
            value={stats.achievementsUnlocked.toString()}
            icon="🏆"
          />
          <StatCard
            title="Study Streak"
            value={`${stats.studyStreak} days`}
            icon="🔥"
            trend={{ value: stats.studyStreak, isPositive: true }}
          />
        </div>
      </div>

      {/* My Favorite - Horizontal Layout */}
      <div className={styles.favoriteSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleWrapper}>
            <span className={styles.starIcon}>⭐</span>
            <h2 className={styles.sectionTitle}>My Favorite</h2>
            <span className={styles.favoriteCount}>{favoriteTools.length}</span>
          </div>
          <button 
            className={styles.viewAllBtn}
            onClick={() => setSelectedCategory('favorite')}
          >
            View All →
          </button>
        </div>
        <div className={styles.favoriteGrid}>
          {favoriteTools.map((tool) => (
            <Card key={tool.id} className={styles.favoriteCard}>
              <div 
                className={styles.favoriteIconWrapper}
                style={{ backgroundColor: `${tool.color}15` }}
              >
                <span className={styles.favoriteIcon}>{tool.icon}</span>
              </div>
              <div className={styles.favoriteContent}>
                <h3 className={styles.favoriteTitle}>{tool.title}</h3>
                <p className={styles.favoriteTitleZh}>{tool.titleZh}</p>
                <div className={styles.favoriteUsage}>
                  Used {tool.usageCount} times
                </div>
              </div>
              <Button
                variant="primary"
                size="small"
                onClick={() => router.push(tool.href)}
                style={{ backgroundColor: tool.color }}
              >
                Launch
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Tools
          </button>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'learning' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('learning')}
          >
            Learning 学习
          </button>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'analysis' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('analysis')}
          >
            Analysis 分析
          </button>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'achievement' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('achievement')}
          >
            Achievement 成就
          </button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className={styles.toolsGrid}>
        {filteredTools.map((tool) => (
          <Card key={tool.id} className={styles.toolCard}>
            <div 
              className={styles.toolIconWrapper}
              style={{ backgroundColor: `${tool.color}15` }}
            >
              <span className={styles.toolIcon}>{tool.icon}</span>
            </div>
            
            <div className={styles.toolContent}>
              <h3 className={styles.toolTitle}>
                {tool.title}
                <span className={styles.toolTitleZh}>{tool.titleZh}</span>
              </h3>
              
              <p className={styles.toolDescription}>
                {tool.description}
              </p>
              <p className={styles.toolDescriptionZh}>
                {tool.descriptionZh}
              </p>

              <div className={styles.toolFeatures}>
                {tool.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>

              <Button
                variant="primary"
                className={styles.toolButton}
                onClick={() => router.push(tool.href)}
                style={{ backgroundColor: tool.color }}
              >
                Launch Tool 启动
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className={styles.tipsCard}>
        <h3 className={styles.tipsTitle}>💡 Quick Tips</h3>
        <div className={styles.tipsList}>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>🎯</span>
            <p>Start with <strong>Mistake Analysis</strong> to identify your weak areas</p>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>📚</span>
            <p>Use <strong>AI Tutor</strong> when you need help understanding concepts</p>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>✨</span>
            <p>Generate <strong>Practice Problems</strong> to reinforce your learning</p>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>🏆</span>
            <p>Check <strong>Achievements</strong> to stay motivated and track progress</p>
          </div>
        </div>
      </Card>
    </div>
    </MainLayout>
  );
}

