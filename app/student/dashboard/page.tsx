'use client';

import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MainLayout from '@layout/MainLayout';
import { Card, StatCard, Button, Badge } from '@ui';
import { mockDashboardStats, mockAssignments, mockClasses, mockAnnouncements } from '@data/mockData';
import { getTranslatedClass, getTranslatedAssignment, getTranslatedAnnouncement } from '@data/mockDataTranslations';
import styles from './dashboard.module.css';

const DashboardPage = () => {
  const { t, language } = useLanguage();
  // Get upcoming dues (assignments not submitted)
  const upcomingDues = mockAssignments
    .filter(a => a.status === 'unsent')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // Calculate days until due
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date('2025-10-20'); // Mock current date
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get upcoming class schedule (next 5 days)
  const getUpcomingSchedule = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const dates = [20, 21, 22, 23, 24]; // Oct 20-24
    return days.map((day, index) => ({
      day,
      date: dates[index],
      classes: index < 3 ? [
        { name: getTranslatedClass('801', language).name, time: '09:00-10:00', classId: '801' },
        { name: getTranslatedClass('803', language).name, time: '14:00-15:00', classId: '803' },
      ] : [
        { name: getTranslatedClass('802', language).name, time: '10:00-11:00', classId: '802' },
      ],
    }));
  };

  return (
    <MainLayout showRightSidebar={true}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{t('dashboard.title')}</h1>
        <p className={styles.headerSubtitle}>{t('dashboard.welcome')}, Emma! {t('dashboard.overview')}</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          title={t('dashboard.statistics.totalCourses')}
          value={mockClasses.length}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          }
          color="var(--primary-blue)"
        />
        <StatCard
          title={t('dashboard.upcomingAssignments')}
          value={mockDashboardStats.pendingAssignments}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2" strokeLinecap="round"/>
            </svg>
          }
          color="var(--warning-orange)"
        />
        <StatCard
          title={t('dashboard.statistics.completedAssignments')}
          value={mockDashboardStats.completedAssignments}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round"/>
              <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          color="var(--success-green)"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.statistics.averageGrade')}
          value={`${mockDashboardStats.averageScore}%`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          color="var(--purple)"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* AI Insights Section */}
      <Card className={styles.aiInsightsCard}>
        <div className={styles.aiInsightsHeader}>
          <div className={styles.aiInsightsTitleWrapper}>
            <div className={styles.aiIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className={styles.sectionTitle}>AI Smart Insights</h2>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
        <div className={styles.aiInsightsGrid}>
          <div className={styles.aiInsightItem}>
            <div className={styles.aiInsightIcon} style={{ backgroundColor: 'var(--primary-blue-light)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div className={styles.aiInsightContent}>
              <h4 className={styles.aiInsightTitle}>Strong Performance</h4>
              <p className={styles.aiInsightText}>Your math accuracy improved by 15% this week. Keep up the excellent work!</p>
            </div>
          </div>
          <div className={styles.aiInsightItem}>
            <div className={styles.aiInsightIcon} style={{ backgroundColor: 'var(--warning-orange-light)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warning-orange)" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className={styles.aiInsightContent}>
              <h4 className={styles.aiInsightTitle}>Needs Attention</h4>
              <p className={styles.aiInsightText}>Question 7 in function graphs is challenging. 60% of students find it difficult.</p>
            </div>
          </div>
          <div className={styles.aiInsightItem}>
            <div className={styles.aiInsightIcon} style={{ backgroundColor: 'var(--purple-light)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className={styles.aiInsightContent}>
              <h4 className={styles.aiInsightTitle}>Study Recommendation</h4>
              <p className={styles.aiInsightText}>Review "reading1: Introduction to Functions" before the upcoming quiz.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className={styles.mainContentGrid}>
        {/* Current Courses */}
        <div className={styles.coursesSection}>
          <Card>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('dashboard.myClasses')}</h2>
              <Button variant="ghost" size="small" onClick={() => window.location.href = '/student/class'}>
                {t('common.view')} {t('common.all')}
              </Button>
            </div>
            <div className={styles.coursesList}>
              {mockClasses.map((cls) => {
                const translatedClass = getTranslatedClass(cls.id, language);
                return (
                <Card 
                  key={cls.id} 
                  padding="medium" 
                  hover 
                  className={styles.courseCard}
                  style={{ borderLeftColor: 'var(--primary-blue)' }}
                  onClick={() => window.location.href = `/student/class/${cls.id}/overview`}
                >
                  <div className={styles.courseCardContent}>
                    <div className={styles.courseIcon}>
                      {cls.id}
                    </div>
                    <div className={styles.courseInfo}>
                      <h3 className={styles.courseName}>
                        {translatedClass.name}
                      </h3>
                      <p className={styles.courseTeacher}>
                        {cls.teacher}
                      </p>
                      <div className={styles.courseMeta}>
                        <Badge variant="info">{translatedClass.subject}</Badge>
                        <span className={styles.courseProgress}>{translatedClass.progress}</span>
                      </div>
                    </div>
                  </div>
                  {cls.nextClass && (
                    <div className={styles.courseNextClass}>
                      Next class: {cls.nextClass}
                    </div>
                  )}
                </Card>
                );
              })}
            </div>
          </Card>

          {/* Announcements */}
          <Card className={styles.announcementsCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Announcements</h2>
              <Badge variant="warning">{mockAnnouncements.filter(a => !a.isRead).length} New</Badge>
            </div>
            <div className={styles.announcementsList}>
              {mockAnnouncements.slice(0, 3).map((announcement) => {
                const translated = getTranslatedAnnouncement(announcement.id, language);
                return (
                  <div 
                    key={announcement.id} 
                    className={styles.announcementItem}
                  >
                    <div className={`${styles.announcementDot} ${announcement.isRead ? styles.read : styles.unread}`} />
                    <div className={styles.announcementContent}>
                      <h4 className={styles.announcementTitle}>
                        {translated.title}
                      </h4>
                      <p className={styles.announcementText}>
                        {translated.content}
                      </p>
                      <span className={styles.announcementDate}>
                        {announcement.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.viewAllButton}>
              <Button 
                variant="ghost" 
                size="small" 
                fullWidth 
                onClick={() => window.location.href = '/student/communication'}
              >
                View All Announcements
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Calendar & Dues */}
        <div className={styles.sidebarSection}>
          {/* Upcoming Dues */}
          <Card>
            <h2 className={styles.sectionTitle}>{t('dashboard.upcomingAssignments')}</h2>
            <div className={styles.duesList}>
              {upcomingDues.length > 0 ? (
                upcomingDues.map((assignment) => {
                  const daysLeft = getDaysUntilDue(assignment.dueDate);
                  const isUrgent = daysLeft <= 2;
                  const translated = getTranslatedAssignment(assignment.id, language);
                  return (
                    <div 
                      key={assignment.id} 
                      className={styles.dueItem}
                      onClick={() => window.location.href = `/student/class/${assignment.classId}/assignments/${assignment.id}`}
                    >
                      <div className={styles.dueItemHeader}>
                        <Badge variant={isUrgent ? 'danger' : 'warning'}>
                          {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days`}
                        </Badge>
                      </div>
                      <h4 className={styles.dueTitle}>{translated.title}</h4>
                      <p className={styles.dueSubject}>{translated.subject}</p>
                      <p className={styles.dueDateText}>Due: {assignment.dueDate}</p>
                      <Button 
                        variant="primary" 
                        size="small" 
                        fullWidth
                        className={styles.dueButton}
                      >
                        Start Assignment
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round"/>
                    <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>All caught up!</p>
                </div>
              )}
            </div>
          </Card>

          {/* Weekly Calendar */}
          <Card>
            <h2 className={styles.sectionTitle}>This Week's Schedule</h2>
            <div className={styles.calendar}>
              {getUpcomingSchedule().map((day, index) => (
                <div key={index} className={styles.calendarDay}>
                  <div className={styles.calendarDayHeader}>
                    <span className={styles.calendarDayName}>{day.day}</span>
                    <span className={styles.calendarDayDate}>{day.date}</span>
                  </div>
                  <div className={styles.calendarClasses}>
                    {day.classes.map((cls, clsIndex) => (
                      <div 
                        key={clsIndex} 
                        className={styles.calendarClass}
                        onClick={() => window.location.href = `/student/class/${cls.classId}/overview`}
                      >
                        <div className={styles.calendarClassBar} style={{ backgroundColor: 'var(--primary-blue)' }} />
                        <div className={styles.calendarClassInfo}>
                          <span className={styles.calendarClassName}>{cls.name}</span>
                          <span className={styles.calendarClassTime}>{cls.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
