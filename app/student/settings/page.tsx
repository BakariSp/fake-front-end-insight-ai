'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MainLayout from '@layout/MainLayout';
import { Button, Avatar } from '@ui';
import styles from './settings.module.css';

// ==================== Data Types ====================

interface StudentProfile {
  studentId: string;
  name: string;
  email: string;
  school: string;
  grade: string;
  profilePhoto?: string;
}

interface NotificationSettings {
  assignmentUpdates: boolean;
  gradingCompleted: boolean;
  classAnnouncements: boolean;
  systemNotifications: boolean;
}

interface UserPreferences {
  language: 'en' | 'zh' | 'zh-TW';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeZone: string;
  defaultView: 'list' | 'grid';
}

// ==================== Toggle Component ====================

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      className={`${styles.toggle} ${checked ? styles.toggleOn : styles.toggleOff}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className={styles.toggleSlider} />
    </button>
  );
};

// ==================== Mock Data ====================

const mockProfile: StudentProfile = {
  studentId: 'S2024001',
  name: 'Emma Wilson',
  email: 'emma.wilson@school.edu.hk',
  school: "St. Mary's College",
  grade: 'Form 5A',
  profilePhoto: undefined,
};

const mockNotifications: NotificationSettings = {
  assignmentUpdates: true,
  gradingCompleted: true,
  classAnnouncements: true,
  systemNotifications: false,
};

const mockPreferences: UserPreferences = {
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timeZone: 'GMT+8 Hong Kong',
  defaultView: 'list',
};

const SettingsPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'preferences' | 'about'>('account');
  const [profile, setProfile] = useState(mockProfile);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [preferences, setPreferences] = useState(mockPreferences);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSave = () => {
    console.log('Saving settings:', { profile, notifications, preferences });
    alert('Settings saved successfully!');
    setHasChanges(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.new.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordDialog(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const tabs = [
    { id: 'account' as const, label: 'Account', icon: '👤' },
    { id: 'notifications' as const, label: 'Notifications', icon: '🔔' },
    { id: 'preferences' as const, label: 'Preferences', icon: '⚙️' },
    { id: 'about' as const, label: 'About', icon: 'ℹ️' },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>
            <span className={styles.titleIcon}>⚙️</span>
            Settings
          </h1>
          <p className={styles.pageSubtitle}>
            Manage your account, notifications, and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Sidebar Tabs */}
          <div className={styles.sidebar}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.sidebarTab} ${activeTab === tab.id ? styles.sidebarTabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className={styles.tabContent}>
                <h2 className={styles.contentTitle}>Account</h2>
                <p className={styles.contentSubtitle}>
                  Manage your profile information and account settings
                </p>
                
                {/* Profile Information */}
                <div className={styles.card}>
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Profile Photo</h3>
                    <div className={styles.profilePhotoWrapper}>
                      <div className={styles.profilePhoto}>
                        <Avatar size="large" name={profile.name} />
                      </div>
                      <div className={styles.profilePhotoActions}>
                        <button className={styles.uploadButton}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 10V3M8 3L5.5 5.5M8 3l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          Upload Photo
                        </button>
                        <button className={styles.removeButton}>Remove</button>
                        <p className={styles.photoHint}>JPG, PNG or GIF. Max size 5MB.</p>
                      </div>
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Basic Information</h3>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={profile.name}
                          placeholder="Enter your name"
                          onChange={(e) => {
                            setProfile({ ...profile, name: e.target.value });
                            setHasChanges(true);
                          }}
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input
                          type="email"
                          className={styles.input}
                          value={profile.email}
                          placeholder="Enter your email"
                          onChange={(e) => {
                            setProfile({ ...profile, email: e.target.value });
                            setHasChanges(true);
                          }}
                        />
                      </div>
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>School & Academic Info</h3>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>Student ID</label>
                        <div className={styles.infoValue}>{profile.studentId}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>School</label>
                        <div className={styles.infoValue}>{profile.school}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>Grade</label>
                        <div className={styles.infoValue}>{profile.grade}</div>
                      </div>
                    </div>
                    <p className={styles.infoNote}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 8v3M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      These fields are managed by your school and cannot be changed.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Password</h3>
                    <div className={styles.passwordSection}>
                      <p className={styles.passwordText}>
                        Keep your account secure by using a strong password
                      </p>
                      <button
                        className={styles.changePasswordButton}
                        onClick={() => setShowPasswordDialog(true)}
                      >
                        Change Password
                      </button>
                    </div>
                  </section>

                  {hasChanges && (
                    <div className={styles.actions}>
                      <button className={styles.cancelButton} onClick={() => {
                        setProfile(mockProfile);
                        setHasChanges(false);
                      }}>
                        Cancel
                      </button>
                      <button className={styles.saveButton} onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className={styles.tabContent}>
                <h2 className={styles.contentTitle}>Notifications</h2>
                <p className={styles.contentSubtitle}>
                  Manage how you receive notifications
                </p>
                
                <div className={styles.card}>
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>📧 Email Notifications</h3>
                    <p className={styles.sectionDescription}>
                      All email notifications sent to: <strong>{profile.email}</strong>
                    </p>
                    
                    <div className={styles.notificationsList}>
                      <div className={styles.notificationItem}>
                        <div className={styles.notificationInfo}>
                          <div className={styles.notificationTitle}>Assignment Updates</div>
                          <div className={styles.notificationDesc}>
                            Notify me when new assignments are posted or deadlines are approaching
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={notifications.assignmentUpdates}
                          onChange={(checked) => {
                            setNotifications({ ...notifications, assignmentUpdates: checked });
                            setHasChanges(true);
                          }}
                        />
                      </div>

                      <div className={styles.notificationItem}>
                        <div className={styles.notificationInfo}>
                          <div className={styles.notificationTitle}>Grading Completed</div>
                          <div className={styles.notificationDesc}>
                            Notify me when my assignments have been graded
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={notifications.gradingCompleted}
                          onChange={(checked) => {
                            setNotifications({ ...notifications, gradingCompleted: checked });
                            setHasChanges(true);
                          }}
                        />
                      </div>

                      <div className={styles.notificationItem}>
                        <div className={styles.notificationInfo}>
                          <div className={styles.notificationTitle}>Class Announcements</div>
                          <div className={styles.notificationDesc}>
                            Notify me about class announcements and important updates
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={notifications.classAnnouncements}
                          onChange={(checked) => {
                            setNotifications({ ...notifications, classAnnouncements: checked });
                            setHasChanges(true);
                          }}
                        />
                      </div>

                      <div className={styles.notificationItem}>
                        <div className={styles.notificationInfo}>
                          <div className={styles.notificationTitle}>System Notifications</div>
                          <div className={styles.notificationDesc}>
                            Important system updates and maintenance notices
                          </div>
                        </div>
                        <ToggleSwitch
                          checked={notifications.systemNotifications}
                          onChange={(checked) => {
                            setNotifications({ ...notifications, systemNotifications: checked });
                            setHasChanges(true);
                          }}
                        />
                      </div>
                    </div>
                  </section>

                  {hasChanges && (
                    <div className={styles.actions}>
                      <button className={styles.cancelButton} onClick={() => {
                        setNotifications(mockNotifications);
                        setHasChanges(false);
                      }}>
                        Cancel
                      </button>
                      <button className={styles.saveButton} onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className={styles.tabContent}>
                <h2 className={styles.contentTitle}>Preferences</h2>
                <p className={styles.contentSubtitle}>
                  Customize your experience and interface
                </p>
                
                <div className={styles.card}>
                  {/* Language & Display */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🌐 Language & Display</h3>
                    
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Language</label>
                        <select
                          className={styles.select}
                          value={preferences.language}
                          onChange={(e) => {
                            const newLang = e.target.value as 'en' | 'zh' | 'zh-TW';
                            setPreferences({ ...preferences, language: newLang });
                            setLanguage(newLang);
                            setHasChanges(true);
                          }}
                        >
                          <option value="en">English</option>
                          <option value="zh">简体中文</option>
                          <option value="zh-TW">繁體中文</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Date Format</label>
                        <select
                          className={styles.select}
                          value={preferences.dateFormat}
                          onChange={(e) => {
                            setPreferences({ ...preferences, dateFormat: e.target.value as any });
                            setHasChanges(true);
                          }}
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Time Zone</label>
                        <select
                          className={styles.select}
                          value={preferences.timeZone}
                          onChange={(e) => {
                            setPreferences({ ...preferences, timeZone: e.target.value });
                            setHasChanges(true);
                          }}
                        >
                          <option value="GMT+8 Hong Kong">GMT+8 Hong Kong</option>
                          <option value="GMT+8 Beijing">GMT+8 Beijing</option>
                          <option value="GMT+0 London">GMT+0 London</option>
                          <option value="GMT-5 New York">GMT-5 New York</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* Interface */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>⚙️ Interface</h3>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Default Assignment View</label>
                      <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="defaultView"
                            value="list"
                            checked={preferences.defaultView === 'list'}
                            onChange={() => {
                              setPreferences({ ...preferences, defaultView: 'list' });
                              setHasChanges(true);
                            }}
                          />
                          <span className={styles.radioText}>List View</span>
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="defaultView"
                            value="grid"
                            checked={preferences.defaultView === 'grid'}
                            onChange={() => {
                              setPreferences({ ...preferences, defaultView: 'grid' });
                              setHasChanges(true);
                            }}
                          />
                          <span className={styles.radioText}>Grid View</span>
                        </label>
                      </div>
                    </div>
                  </section>

                  {hasChanges && (
                    <div className={styles.actions}>
                      <button className={styles.cancelButton} onClick={() => {
                        setPreferences(mockPreferences);
                        setHasChanges(false);
                      }}>
                        Cancel
                      </button>
                      <button className={styles.saveButton} onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className={styles.tabContent}>
                <h2 className={styles.contentTitle}>About Insight AI</h2>
                <p className={styles.contentSubtitle}>
                  System information and support resources
                </p>
                
                {/* System Information */}
                <div className={styles.card}>
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>ℹ️ System Information</h3>
                    
                    <div className={styles.infoList}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Version</span>
                        <span className={styles.infoValue}>v1.0.0 (MVP)</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Last Updated</span>
                        <span className={styles.infoValue}>November 2024</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Platform</span>
                        <span className={styles.infoValue}>Web Application</span>
                      </div>
                    </div>
                  </section>

                  {/* Support & Help */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>📚 Support & Help</h3>
                    
                    <div className={styles.linkList}>
                      <a href="#" className={styles.linkItem}>
                        <span>Help Center</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 10l5 5 5-5" strokeLinecap="round" transform="rotate(-90 10 10)" />
                        </svg>
                      </a>
                      <a href="#" className={styles.linkItem}>
                        <span>Report an Issue</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 10l5 5 5-5" strokeLinecap="round" transform="rotate(-90 10 10)" />
                        </svg>
                      </a>
                      <a href="#" className={styles.linkItem}>
                        <span>Send Feedback</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 10l5 5 5-5" strokeLinecap="round" transform="rotate(-90 10 10)" />
                        </svg>
                      </a>
                    </div>
                  </section>

                  {/* Legal & Privacy */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>📄 Legal & Privacy</h3>
                    
                    <div className={styles.linkList}>
                      <a href="#" className={styles.linkItem}>
                        <span>Privacy Policy</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 10l5 5 5-5" strokeLinecap="round" transform="rotate(-90 10 10)" />
                        </svg>
                      </a>
                      <a href="#" className={styles.linkItem}>
                        <span>Terms of Service</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 10l5 5 5-5" strokeLinecap="round" transform="rotate(-90 10 10)" />
                        </svg>
                      </a>
                    </div>
                  </section>

                  {/* About Project */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>💡 About This Project</h3>
                    <p className={styles.aboutText}>
                      Insight AI is an educational platform designed to help students and teachers 
                      manage assignments and enhance learning with AI-powered tools.
                    </p>
                    <p className={styles.aboutFooter}>
                      Built with ❤️ for educators and learners.
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordDialog && (
        <div className={styles.modal} onClick={() => setShowPasswordDialog(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Change Password</h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowPasswordDialog(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input
                  type="password"
                  className={styles.input}
                  value={passwordForm.current}
                  placeholder="Enter current password"
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input
                  type="password"
                  className={styles.input}
                  value={passwordForm.new}
                  placeholder="Enter new password"
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                />
                {passwordForm.new && (
                  <div className={styles.passwordStrength}>
                    <div className={styles.strengthBar}>
                      <div 
                        className={styles.strengthFill} 
                        style={{ 
                          width: `${Math.min((passwordForm.new.length / 12) * 100, 100)}%`,
                          backgroundColor: passwordForm.new.length < 8 ? '#EF4444' : passwordForm.new.length < 12 ? '#F59E0B' : '#10B981'
                        }}
                      />
                    </div>
                    <span 
                      className={styles.strengthText}
                      style={{ 
                        color: passwordForm.new.length < 8 ? '#EF4444' : passwordForm.new.length < 12 ? '#F59E0B' : '#10B981'
                      }}
                    >
                      {passwordForm.new.length < 8 ? 'Weak' : passwordForm.new.length < 12 ? 'Good' : 'Strong'}
                    </span>
                  </div>
                )}
                <p className={styles.hint}>
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  className={styles.input}
                  value={passwordForm.confirm}
                  placeholder="Confirm new password"
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalButton}
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
                onClick={handlePasswordChange}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default SettingsPage;
