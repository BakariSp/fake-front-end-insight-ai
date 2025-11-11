'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Badge } from '@ui';
import { NotificationBanner } from './components/notifications';
import styles from './teacher.module.css';

export default function TeacherDashboard() {
  const [showDemoBanner, setShowDemoBanner] = useState(true);
  const assignments = [
    {
      id: '1',
      title: 'Tone Mastery: 4-Tone...',
      dueDate: '24/10/2025',
      submissionRate: '67%',
      status: 'Waiting Submissions',
      statusColor: 'gray',
    },
    {
      id: '2',
      title: 'Tone Mastery: 4-Tone...',
      dueDate: '24/10/2025',
      submissionRate: '95%',
      status: 'Ready for Grading',
      statusColor: 'orange',
    },
    {
      id: '3',
      title: 'Tone Mastery: 4-Tone...',
      dueDate: '24/10/2025',
      submissionRate: '67%',
      status: 'Graded Successfully!',
      statusColor: 'green',
    },
  ];

  const uploadedFiles = [
    {
      id: '1',
      title: 'Tone Mastery: 4-Tone...',
      course: 'Chinese',
      topic: 'Reading and Pro...',
      date: '24/10/2025',
    },
    {
      id: '2',
      title: 'Tone Mastery: 4-Tone...',
      course: 'Chinese',
      topic: 'Reading and Pro...',
      date: '24/10/2025',
    },
  ];

  const scheduleItems = [
    {
      id: '1',
      time: '13:00 - 14:00',
      class: 'Math 102',
      topic: 'Multiple Numbers',
      location: 'Online',
    },
    {
      id: '2',
      time: '13:00 - 14:00',
      class: 'Math 102',
      topic: 'Multiple Numbers',
      location: 'Online',
    },
    {
      id: '3',
      time: '13:00 - 14:00',
      class: 'Math 102',
      topic: 'Multiple Numbers',
      location: 'Online',
    },
  ];

  const announcements = [
    {
      id: '1',
      author: 'Chloe Kam',
      title: 'Maintenance',
      message: 'Scheduled Maintenance — Sunday 01:00–02:00. Save your work in advance.',
      avatar: '👤',
    },
    {
      id: '2',
      author: 'Chloe Kam',
      title: 'System Update',
      message: 'New features will be available next week.',
      avatar: '👤',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <h1 className={styles.welcomeTitle}>Welcome back, Teacher</h1>

      {/* Demo Banner */}
      {showDemoBanner && (
        <NotificationBanner
          type="info"
          title="🔔 New Notification System Available!"
          message="Click the bell icon in the top navigation to see all notifications, or visit the demo page to explore all notification features."
          action={{
            label: 'View Demo',
            onClick: () => window.location.href = '/teacher/notification-demo',
          }}
          onClose={() => setShowDemoBanner(false)}
        />
      )}

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          {/* Magic Tools Banner */}
          <div className={styles.magicToolsBanner}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerLabel}>Magic Tools</div>
              <h2 className={styles.bannerTitle}>A clean pipeline for reliable AI results.</h2>
              <Link href="/teacher/insight-tools">
                <button className={styles.tryNowButton}>
                  Try Now
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <Link href="/teacher/assignments/new">
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>+</span>
                Create Assignment
              </button>
            </Link>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>✓</span>
              Grade Assignment
            </button>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>📢</span>
              Create Announcement
            </button>
            <button className={styles.addButton}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* What's Due Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeaderWithIcon}>
              <div className={styles.sectionIconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="#4F7FFF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#4F7FFF" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className={styles.sectionTitleMain}>What's Due</h2>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.assignmentTable}>
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Due Date</th>
                    <th>Subm. Rate</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>
                        <div className={styles.assignmentCell}>
                          <div className={styles.assignmentIcon}>📚</div>
                          <span>{assignment.title}</span>
                        </div>
                      </td>
                      <td>{assignment.dueDate}</td>
                      <td>{assignment.submissionRate}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[`status${assignment.statusColor}`]}`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.viewButton}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Uploaded Files */}
          <div className={styles.section}>
            <div className={styles.sectionHeaderWithIcon}>
              <div className={styles.sectionIconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="#4F7FFF" strokeWidth="2"/>
                  <path d="M13 2v7h7" stroke="#4F7FFF" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className={styles.sectionTitleMain}>Latest Uploaded Files</h2>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.filesTable}>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Course | Topic</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map((file) => (
                    <tr key={file.id}>
                      <td>
                        <div className={styles.fileCell}>
                          <div className={styles.fileIcon}>📄</div>
                          <span>{file.title}</span>
                        </div>
                      </td>
                      <td>{file.course} | {file.topic}</td>
                      <td>{file.date}</td>
                      <td>
                        <button className={styles.viewButton}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          {/* Schedule Today */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Schedule Today</h3>
            <div className={styles.scheduleList}>
              {scheduleItems.map((item) => (
                <div key={item.id} className={styles.scheduleItem}>
                  <div className={styles.scheduleTime}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F7FFF">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {item.time}
                  </div>
                  <div className={styles.scheduleDetails}>
                    <div className={styles.scheduleClass}>Class: {item.class}</div>
                    <div className={styles.scheduleTopic}>Topic: {item.topic}</div>
                    <div className={styles.scheduleLocation}>Location: {item.location}</div>
                  </div>
                </div>
              ))}
              <div className={styles.scheduleEnd}>
                <p>This is the end,</p>
                <p>have a good rest!</p>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Announcements</h3>
            <div className={styles.announcementList}>
              {announcements.map((announcement) => (
                <div key={announcement.id} className={styles.announcementItem}>
                  <div className={styles.announcementAvatar}>{announcement.avatar}</div>
                  <div className={styles.announcementContent}>
                    <h4 className={styles.announcementAuthor}>{announcement.author}</h4>
                    <h5 className={styles.announcementTitle}>{announcement.title}</h5>
                    <p className={styles.announcementMessage}>{announcement.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


