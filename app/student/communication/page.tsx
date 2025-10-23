'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';
import {
  mockSchoolAnnouncements,
  mockTeacherMessages,
  mockTeacherContacts,
  type SchoolAnnouncement,
  type TeacherMessage,
} from '@/app/data/mockData';
import styles from './communication.module.css';

export default function CommunicationPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('announcements');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'announcements', label: t('communication.tabs.schoolAnnouncements') },
    { id: 'messages', label: t('communication.tabs.teacherMessages') },
    { id: 'contacts', label: t('communication.tabs.contacts') },
  ];

  // Filter contacts based on search term
  const filteredContacts = mockTeacherContacts.filter((contact) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.title?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.department?.toLowerCase().includes(searchLower)
    );
  });

  const handleMarkAsRead = (id: string) => {
    // Mock function - in real app would update backend
    console.log('Mark as read:', id);
  };

  const handleConfirmReceipt = (id: string) => {
    // Mock function - in real app would update backend
    console.log('Confirm receipt:', id);
  };

  const handleReaction = (messageId: string, reactionType: string) => {
    // Mock function - in real app would update backend
    console.log('Reaction:', messageId, reactionType);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'unread':
        return 'warning';
      case 'read':
        return 'info';
      case 'confirmed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getMessageTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'warning';
      case 'notification':
        return 'info';
      case 'activity':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('communication.title')}</h1>
          <p className={styles.subtitle}>{t('communication.breadcrumb')}</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.notificationIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsHeader}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {activeTab === 'announcements' && (
          <div className={styles.announcementsSection}>
            <div className={styles.sectionHeader}>
              <h2>{t('communication.schoolAnnouncements.title')}</h2>
              <p className={styles.sectionDescription}>
                {t('communication.schoolAnnouncements.description')}
              </p>
            </div>

            <div className={styles.announcementsList}>
              {mockSchoolAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={styles.announcementCard} hover>
                  <div className={styles.announcementHeader}>
                    <div className={styles.announcementTitleRow}>
                      <h3 className={styles.announcementTitle}>{announcement.title}</h3>
                      <Badge variant={getStatusBadgeVariant(announcement.status)}>
                        {t(`communication.schoolAnnouncements.status.${announcement.status}`)}
                      </Badge>
                    </div>
                    <div className={styles.announcementMeta}>
                      <Badge variant="secondary" size="small">
                        {t(`communication.schoolAnnouncements.type.${announcement.type}`)}
                      </Badge>
                      <span className={styles.metaSeparator}>•</span>
                      <span className={styles.metaText}>{announcement.target}</span>
                      <span className={styles.metaSeparator}>•</span>
                      <span className={styles.metaText}>{announcement.publishDate}</span>
                    </div>
                  </div>

                  <p className={styles.announcementContent}>{announcement.content}</p>

                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className={styles.attachments}>
                      {announcement.attachments.map((attachment, index) => (
                        <div key={index} className={styles.attachment}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                          </svg>
                          <span>{attachment}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={styles.announcementActions}>
                    {announcement.status === 'unread' && (
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleMarkAsRead(announcement.id)}
                      >
                        {t('communication.schoolAnnouncements.markAsRead')}
                      </Button>
                    )}
                    {announcement.requireConfirmation && announcement.status !== 'confirmed' && (
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleConfirmReceipt(announcement.id)}
                      >
                        {t('communication.schoolAnnouncements.confirmReceipt')}
                      </Button>
                    )}
                    <Button variant="ghost" size="small">
                      {t('communication.schoolAnnouncements.viewDetails')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className={styles.messagesSection}>
            <div className={styles.sectionHeader}>
              <h2>{t('communication.teacherMessages.title')}</h2>
              <p className={styles.sectionDescription}>
                {t('communication.teacherMessages.description')}
              </p>
            </div>

            <div className={styles.messagesList}>
              {mockTeacherMessages.map((message) => (
                <Card key={message.id} className={styles.messageCard} hover>
                  <div className={styles.messageHeader}>
                    <div className={styles.messageTitleRow}>
                      <h3 className={styles.messageTitle}>{message.title}</h3>
                      <Badge variant={getMessageTypeBadgeVariant(message.messageType)}>
                        {t(`communication.teacherMessages.messageType.${message.messageType}`)}
                      </Badge>
                    </div>
                    <div className={styles.messageMeta}>
                      <span className={styles.metaText}>
                        {t('communication.teacherMessages.from')}: {message.teacherName}
                      </span>
                      <span className={styles.metaSeparator}>•</span>
                      <span className={styles.metaText}>{message.publishDate}</span>
                    </div>
                  </div>

                  <p className={styles.messageContent}>{message.content}</p>

                  {message.relatedAssignmentId && (
                    <div className={styles.relatedAssignment}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      </svg>
                      <span>{t('communication.teacherMessages.relatedAssignment')}</span>
                    </div>
                  )}

                  <div className={styles.messageActions}>
                    <div className={styles.reactions}>
                      <button
                        className={`${styles.reactionButton} ${
                          message.reactions?.understood ? styles.active : ''
                        }`}
                        onClick={() => handleReaction(message.id, 'understood')}
                      >
                        👍 {t('communication.teacherMessages.reactions.understood')}
                      </button>
                      <button
                        className={`${styles.reactionButton} ${
                          message.reactions?.question ? styles.active : ''
                        }`}
                        onClick={() => handleReaction(message.id, 'question')}
                      >
                        ❓ {t('communication.teacherMessages.reactions.question')}
                      </button>
                      <button
                        className={`${styles.reactionButton} ${
                          message.reactions?.completed ? styles.active : ''
                        }`}
                        onClick={() => handleReaction(message.id, 'completed')}
                      >
                        ✅ {t('communication.teacherMessages.reactions.completed')}
                      </button>
                    </div>
                    <Button variant="secondary" size="small">
                      {t('communication.teacherMessages.reply')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className={styles.contactsSection}>
            <div className={styles.sectionHeader}>
              <h2>{t('communication.contacts.title')}</h2>
              <p className={styles.sectionDescription}>
                View teacher contact information and send messages
              </p>
            </div>

            <div className={styles.searchBar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder={t('communication.contacts.search')}
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.contactsList}>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                <Card key={contact.id} className={styles.contactCard}>
                  <div className={styles.contactAvatar}>
                    <div className={styles.avatarCircle}>
                      {contact.name.charAt(0)}
                    </div>
                  </div>
                  <div className={styles.contactInfo}>
                    <h3 className={styles.contactName}>{contact.name}</h3>
                    <p className={styles.contactTitle}>{contact.title}</p>
                    <div className={styles.contactDetails}>
                      <div className={styles.contactDetail}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>{contact.phone}</span>
                      </div>
                      <div className={styles.contactDetail}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>{contact.email}</span>
                      </div>
                      {contact.classes && (
                        <div className={styles.contactDetail}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                          <span>{contact.classes.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.contactActions}>
                    <Button variant="primary" size="small">
                      {t('communication.contacts.teacher.sendMessage')}
                    </Button>
                  </div>
                </Card>
              ))
              ) : (
                <div className={styles.emptyState}>
                  <p>{t('communication.contacts.noContacts')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

