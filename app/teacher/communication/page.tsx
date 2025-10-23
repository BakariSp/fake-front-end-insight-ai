'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';
import {
  type ParentNotice,
  type TeacherCollaboration,
  type Contact,
  mockSchoolAnnouncements,
  mockParentNotices,
  mockTeacherCollaboration,
  mockTeacherContacts,
} from '@data/mockData';
import styles from './communication.module.css';

// Mock classes data
const mockClasses = [
  { id: '1', name: 'Math 101 - Section A', students: 28, parents: 52 },
  { id: '2', name: 'Math 101 - Section B', students: 30, parents: 56 },
  { id: '3', name: 'Algebra II', students: 25, parents: 48 },
  { id: '4', name: 'Geometry Honors', students: 22, parents: 42 },
];

export default function TeacherCommunicationPage() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('announcements');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [language, setLanguage] = useState('English');
  
  // Modal state
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    type: 'general',
    content: '',
    recipientType: 'class',
    selectedClasses: [] as string[],
    priority: 'normal',
    requireConfirmation: false,
  });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Set active tab from URL parameter
  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      if (activeTab === 'announcements') {
        setSelectedItems(mockSchoolAnnouncements.map(a => a.id));
      } else if (activeTab === 'parents') {
        setSelectedItems(mockParentNotices.map(n => n.id));
      }
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleOpenNotificationModal = () => {
    setShowNotificationModal(true);
    setSendSuccess(false);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
    setNotificationForm({
      title: '',
      type: 'general',
      content: '',
      recipientType: 'class',
      selectedClasses: [],
      priority: 'normal',
      requireConfirmation: false,
    });
    setSendSuccess(false);
  };

  const handleClassToggle = (classId: string) => {
    setNotificationForm(prev => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classId)
        ? prev.selectedClasses.filter(id => id !== classId)
        : [...prev.selectedClasses, classId]
    }));
  };

  const handleSendNotification = async () => {
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setSendSuccess(true);
    
    // Auto close after 2 seconds
    setTimeout(() => {
      handleCloseNotificationModal();
    }, 2000);
  };

  const getTotalRecipients = () => {
    if (notificationForm.recipientType === 'all') {
      return mockClasses.reduce((sum, c) => sum + c.parents, 0);
    }
    return mockClasses
      .filter(c => notificationForm.selectedClasses.includes(c.id))
      .reduce((sum, c) => sum + c.parents, 0);
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

  const renderAnnouncementsTable = () => (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '40px' }}>
              <input
                type="checkbox"
                checked={selectedItems.length === mockSchoolAnnouncements.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className={styles.checkbox}
              />
            </th>
            <th>
              Title
              <span className={styles.columnBadge}>{mockSchoolAnnouncements.length}列</span>
            </th>
            <th style={{ width: '180px' }}>Sender</th>
            <th style={{ width: '200px' }}>Time</th>
            <th style={{ width: '180px' }}>Audience</th>
            <th style={{ width: '180px' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {mockSchoolAnnouncements.map((announcement) => (
            <tr key={announcement.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(announcement.id)}
                  onChange={() => handleSelectItem(announcement.id)}
                  className={styles.checkbox}
                />
              </td>
              <td>
                <div className={styles.titleCell}>
                  <span className={styles.titleText}>{announcement.title}</span>
                  <Badge variant={getStatusBadgeVariant(announcement.status)} size="small">
                    {announcement.status}
                  </Badge>
                </div>
              </td>
              <td>{announcement.target.split(' ')[0]}</td>
              <td>{announcement.publishDate} 16:44:40</td>
              <td>{announcement.target}</td>
              <td>
                <div className={styles.actionLinks}>
                  <a href="#" className={styles.actionLink}>View</a>
                  {announcement.requireConfirmation && (
                    <>
                      <span className={styles.actionSeparator}>|</span>
                      <a href="#" className={styles.actionLink}>Edit</a>
                    </>
                  )}
                  <span className={styles.actionSeparator}>|</span>
                  <a href="#" className={styles.actionLink}>Status</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderParentNoticesTable = () => (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '40px' }}>
              <input
                type="checkbox"
                checked={selectedItems.length === mockParentNotices.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className={styles.checkbox}
              />
            </th>
            <th>
              Title
              <span className={styles.columnBadge}>{mockParentNotices.length}列</span>
            </th>
            <th style={{ width: '150px' }}>Type</th>
            <th style={{ width: '200px' }}>Send Date</th>
            <th style={{ width: '150px' }}>Status</th>
            <th style={{ width: '180px' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {mockParentNotices.map((notice) => (
            <tr key={notice.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(notice.id)}
                  onChange={() => handleSelectItem(notice.id)}
                  className={styles.checkbox}
                />
              </td>
              <td>
                <div className={styles.titleCell}>
                  <span className={styles.titleText}>{notice.title}</span>
                </div>
              </td>
              <td>
                <Badge variant="secondary" size="small">{notice.type}</Badge>
              </td>
              <td>{notice.sendDate}</td>
              <td>
                <span className={styles.readStatus}>
                  {notice.readCount}/{notice.totalRecipients} read
                </span>
              </td>
              <td>
                <div className={styles.actionLinks}>
                  <a href="#" className={styles.actionLink}>View</a>
                  <span className={styles.actionSeparator}>|</span>
                  <a href="#" className={styles.actionLink}>Export</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCollaborationList = () => (
    <div className={styles.cardList}>
      {mockTeacherCollaboration.map((item) => (
        <Card key={item.id} className={styles.collaborationCard} hover>
          <div className={styles.collaborationContent}>
            <div className={styles.fileIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="var(--primary-500)" strokeWidth="2"/>
                <path d="M13 2v7h7" stroke="var(--primary-500)" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.fileInfo}>
              <h4 className={styles.fileName}>{item.fileName}</h4>
              <p className={styles.fileDescription}>{item.description}</p>
              <div className={styles.fileMeta}>
                <Badge variant="info" size="small">{item.groupName}</Badge>
                <span className={styles.metaText}>By {item.uploadedBy}</span>
                <span className={styles.metaText}>{item.uploadDate}</span>
              </div>
            </div>
            <Button variant="primary" size="small">Download</Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderContactsList = () => (
    <div className={styles.contactsGrid}>
      {mockTeacherContacts.filter(contact => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          contact.name.toLowerCase().includes(searchLower) ||
          contact.email?.toLowerCase().includes(searchLower)
        );
      }).map((contact) => (
        <Card key={contact.id} className={styles.contactCard}>
          <div className={styles.contactHeader}>
            <div className={styles.contactAvatar}>
              {contact.name.charAt(0)}
            </div>
            <Badge 
              variant={contact.role === 'parent' ? 'info' : contact.role === 'teacher' ? 'success' : 'warning'} 
              size="small"
            >
              {contact.role}
            </Badge>
          </div>
          <h4 className={styles.contactName}>{contact.name}</h4>
          {contact.relatedStudent && (
            <p className={styles.contactRelation}>{contact.relatedStudent}</p>
          )}
          <div className={styles.contactDetails}>
            <div className={styles.contactDetail}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{contact.email}</span>
            </div>
            {contact.phone && (
              <div className={styles.contactDetail}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{contact.phone}</span>
              </div>
            )}
          </div>
          <Button variant="primary" size="small" style={{ width: '100%', marginTop: '0.75rem' }}>
            Send Message
          </Button>
        </Card>
      ))}
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink}>Communication</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>
            {activeTab === 'announcements' && 'School Announcements'}
            {activeTab === 'parents' && 'Parent Notices'}
            {activeTab === 'collaboration' && 'Teacher Collaboration'}
            {activeTab === 'contacts' && 'Contacts'}
          </span>
        </div>
        <div className={styles.languageSelector}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 10h16M10 2c-2 4-2 12 0 16M10 2c2 4 2 12 0 16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className={styles.languageSelect}>
            <option>English</option>
            <option>中文</option>
            <option>繁體中文</option>
          </select>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchContainer}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search for..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.dateRangePicker}>
          <span>2025.10.01-2025.11.01</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary">Export</Button>
          <Button variant="primary" onClick={handleOpenNotificationModal}>
            Create new notification
          </Button>
          <Button variant="ghost">Delete</Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        {[
          { id: 'announcements', label: 'School Announcements' },
          { id: 'parents', label: 'Parent Notices' },
          { id: 'collaboration', label: 'Teacher Collaboration' },
          { id: 'contacts', label: 'Contacts' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'announcements' && renderAnnouncementsTable()}
        {activeTab === 'parents' && renderParentNoticesTable()}
        {activeTab === 'collaboration' && renderCollaborationList()}
        {activeTab === 'contacts' && renderContactsList()}
      </div>

      {/* Pagination */}
      {(activeTab === 'announcements' || activeTab === 'parents') && (
        <div className={styles.pagination}>
          <button className={styles.paginationButton}>&lt;</button>
          <button className={`${styles.paginationButton} ${styles.paginationButtonActive}`}>1</button>
          <button className={styles.paginationButton}>2</button>
          <button className={styles.paginationButton}>3</button>
          <button className={styles.paginationButton}>4</button>
          <button className={styles.paginationButton}>5</button>
          <button className={styles.paginationButton}>&gt;</button>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className={styles.modalOverlay} onClick={handleCloseNotificationModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {!sendSuccess ? (
              <>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>Create Parent Notification</h2>
                  <button className={styles.modalClose} onClick={handleCloseNotificationModal}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className={styles.modalBody}>
                  {/* Notification Title */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Notification Title *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Enter notification title"
                      value={notificationForm.title}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  {/* Type and Priority */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Type *</label>
                      <select
                        className={styles.formSelect}
                        value={notificationForm.type}
                        onChange={(e) => setNotificationForm(prev => ({ ...prev, type: e.target.value }))}
                      >
                        <option value="general">General</option>
                        <option value="homework">Homework</option>
                        <option value="event">Event</option>
                        <option value="urgent">Urgent</option>
                        <option value="reminder">Reminder</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Priority</label>
                      <select
                        className={styles.formSelect}
                        value={notificationForm.priority}
                        onChange={(e) => setNotificationForm(prev => ({ ...prev, priority: e.target.value }))}
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  {/* Recipient Type */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Send To *</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="recipientType"
                          value="class"
                          checked={notificationForm.recipientType === 'class'}
                          onChange={(e) => setNotificationForm(prev => ({ 
                            ...prev, 
                            recipientType: e.target.value,
                            selectedClasses: []
                          }))}
                        />
                        <span>Specific Classes</span>
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="recipientType"
                          value="all"
                          checked={notificationForm.recipientType === 'all'}
                          onChange={(e) => setNotificationForm(prev => ({ 
                            ...prev, 
                            recipientType: e.target.value,
                            selectedClasses: mockClasses.map(c => c.id)
                          }))}
                        />
                        <span>All My Classes</span>
                      </label>
                    </div>
                  </div>

                  {/* Class Selection */}
                  {notificationForm.recipientType === 'class' && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Select Classes *</label>
                      <div className={styles.classList}>
                        {mockClasses.map((classItem) => (
                          <label key={classItem.id} className={styles.classCheckbox}>
                            <input
                              type="checkbox"
                              checked={notificationForm.selectedClasses.includes(classItem.id)}
                              onChange={() => handleClassToggle(classItem.id)}
                            />
                            <div className={styles.classInfo}>
                              <span className={styles.className}>{classItem.name}</span>
                              <span className={styles.classStats}>
                                {classItem.students} students • {classItem.parents} parents
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recipient Summary */}
                  <div className={styles.recipientSummary}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>
                      This notification will be sent to <strong>{getTotalRecipients()}</strong> parents
                    </span>
                  </div>

                  {/* Message Content */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Message Content *</label>
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Enter your message to parents..."
                      rows={6}
                      value={notificationForm.content}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, content: e.target.value }))}
                    />
                  </div>

                  {/* Require Confirmation */}
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={notificationForm.requireConfirmation}
                        onChange={(e) => setNotificationForm(prev => ({ 
                          ...prev, 
                          requireConfirmation: e.target.checked 
                        }))}
                      />
                      <span>Require parent confirmation</span>
                    </label>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <Button variant="secondary" onClick={handleCloseNotificationModal}>
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSendNotification}
                    disabled={
                      isSending || 
                      !notificationForm.title || 
                      !notificationForm.content || 
                      notificationForm.selectedClasses.length === 0
                    }
                  >
                    {isSending ? (
                      <>
                        <span className={styles.spinner}></span>
                        Sending...
                      </>
                    ) : (
                      'Send Notification'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#52C41A" strokeWidth="2"/>
                    <path d="M8 12l2 2 4-4" stroke="#52C41A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Notification Sent Successfully!</h3>
                <p className={styles.successText}>
                  Your notification has been sent to {getTotalRecipients()} parents across {notificationForm.selectedClasses.length} class{notificationForm.selectedClasses.length !== 1 ? 'es' : ''}.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
