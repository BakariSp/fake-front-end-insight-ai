'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, StatCard } from '@ui';
import styles from './insightTools.module.css';

export default function TeacherInsightToolsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'content' | 'assessment' | 'communication'>('all');

  // Mock statistics
  const stats = {
    toolsUsed: 23,
    contentGenerated: 15,
    timeSaved: '4.5 hours',
    studentsHelped: 67,
  };

  const tools = [
    {
      id: 'text-to-speech',
      title: 'Text to Speech',
      titleZh: '文字转语音',
      description: 'Convert text into natural-sounding speech for lesson materials and accessibility',
      descriptionZh: '将文本转换为自然语音，用于课程材料和无障碍访问',
      icon: '🔊',
      category: 'content',
      color: '#4F46E5',
      features: ['Multiple Voices', 'Speed Control', 'Volume Adjust', 'Download Audio'],
      href: '/teacher/insight-tools/text-to-speech',
    },
    {
      id: 'lesson-planner',
      title: 'AI Lesson Planner',
      titleZh: 'AI 课程规划',
      description: 'Generate comprehensive lesson plans with AI assistance',
      descriptionZh: '使用AI协助生成全面的课程计划',
      icon: '📚',
      category: 'content',
      color: '#10B981',
      features: ['Smart Templates', 'Curriculum Aligned', 'Time Estimates', 'Resource Links'],
      href: '/teacher/insight-tools/lesson-planner',
      badge: 'Coming Soon',
    },
    {
      id: 'quiz-generator',
      title: 'Quiz Generator',
      titleZh: '测验生成器',
      description: 'Automatically create quizzes and assessments from any content',
      descriptionZh: '从任何内容自动创建测验和评估',
      icon: '✏️',
      category: 'assessment',
      color: '#F59E0B',
      features: ['Auto-grading', 'Multiple Types', 'Difficulty Levels', 'Question Bank'],
      href: '/teacher/insight-tools/quiz-generator',
    },
    {
      id: 'feedback-assistant',
      title: 'Feedback Assistant',
      titleZh: '反馈助手',
      description: 'AI-powered suggestions for student feedback and grading comments',
      descriptionZh: 'AI驱动的学生反馈和评分评论建议',
      icon: '💬',
      category: 'assessment',
      color: '#DC2626',
      features: ['Personalized', 'Constructive', 'Time-saving', 'Multi-language'],
      href: '/teacher/insight-tools/feedback-assistant',
      badge: 'Coming Soon',
    },
    {
      id: 'announcement-writer',
      title: 'Announcement Writer',
      titleZh: '公告撰写器',
      description: 'Create clear and professional announcements for students and parents',
      descriptionZh: '为学生和家长创建清晰专业的公告',
      icon: '📢',
      category: 'communication',
      color: '#8B5CF6',
      features: ['Templates', 'Tone Adjustment', 'Translation', 'Preview'],
      href: '/teacher/insight-tools/announcement-writer',
      badge: 'Coming Soon',
    },
    {
      id: 'progress-analyzer',
      title: 'Progress Analyzer',
      titleZh: '进度分析器',
      description: 'Analyze student progress and generate insights with AI',
      descriptionZh: '使用AI分析学生进度并生成见解',
      icon: '📊',
      category: 'assessment',
      color: '#06B6D4',
      features: ['Trend Analysis', 'Predictions', 'Recommendations', 'Visual Reports'],
      href: '/teacher/insight-tools/progress-analyzer',
      badge: 'Coming Soon',
    },
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <span className={styles.icon}>✨</span>
              Insight Tools for Teachers
            </h1>
            <p className={styles.subtitle}>
              洞察工具 - Powerful AI tools to enhance teaching efficiency and effectiveness
            </p>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className={styles.statsGrid}>
          <StatCard
            title="Tools Used"
            value={stats.toolsUsed.toString()}
            icon="🛠️"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Content Generated"
            value={stats.contentGenerated.toString()}
            icon="📝"
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Time Saved"
            value={stats.timeSaved}
            icon="⏱️"
          />
          <StatCard
            title="Students Helped"
            value={stats.studentsHelped.toString()}
            icon="👥"
            trend={{ value: 12, isPositive: true }}
          />
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
            className={`${styles.filterBtn} ${selectedCategory === 'content' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('content')}
          >
            Content 内容
          </button>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'assessment' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('assessment')}
          >
            Assessment 评估
          </button>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'communication' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('communication')}
          >
            Communication 沟通
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

              {tool.badge ? (
                <div className={styles.comingSoonBadge}>{tool.badge}</div>
              ) : (
                <Button
                  variant="primary"
                  className={styles.toolButton}
                  onClick={() => router.push(tool.href)}
                  style={{ backgroundColor: tool.color }}
                >
                  Launch Tool 启动
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className={styles.tipsCard}>
        <h3 className={styles.tipsTitle}>💡 Quick Tips for Teachers</h3>
        <div className={styles.tipsList}>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>🔊</span>
            <p>Use <strong>Text-to-Speech</strong> to create audio versions of reading materials for accessibility</p>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>📚</span>
            <p>Generate <strong>Lesson Plans</strong> and customize them to match your teaching style</p>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>✏️</span>
            <p>Create <strong>Quizzes</strong> automatically from your lesson content to save time</p>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>💬</span>
            <p>Use <strong>Feedback Assistant</strong> to provide personalized, constructive comments efficiently</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

