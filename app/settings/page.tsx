'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MainLayout from '../components/layout/MainLayout';
import { Card, Button, Badge, Avatar } from '../components/ui';
import { mockUserSettings, UserSettings } from '../data/mockData';
import styles from './settings.module.css';

const SettingsPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleNotificationChange = (key: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    setHasChanges(true);
  };

  const handlePrivacyChange = (key: keyof UserSettings['privacy']) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
    setHasChanges(true);
  };

  const handleLearningChange = (key: keyof UserSettings['learning'], value: any) => {
    setSettings(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleDisplayChange = (key: keyof UserSettings['display'], value: any) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value,
      },
    }));
    
    // Apply language change immediately
    if (key === 'language') {
      setLanguage(value);
    }
    
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    setHasChanges(false);
    
    // Show success message (you could use a toast notification here)
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings(mockUserSettings);
    setHasChanges(false);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            {t('settings.title') || 'Personal Settings'}
          </h1>
          <p className={styles.pageSubtitle}>
            Manage your account, notifications, privacy, and learning preferences
          </p>
        </div>
        {hasChanges && (
          <div className={styles.headerActions}>
            <Button variant="secondary" onClick={handleReset}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Account Info Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Account Information</h2>
            <p className={styles.sectionDescription}>Your personal and academic information</p>
          </div>
        </div>

        <Card className={styles.accountCard}>
          <div className={styles.accountHeader}>
            <Avatar size="large" name={settings.account.name} />
            <div className={styles.accountInfo}>
              <h3 className={styles.accountName}>{settings.account.name}</h3>
              <Badge variant="primary">{settings.account.grade}</Badge>
            </div>
            <Button variant="secondary" size="small">
              Edit Profile
            </Button>
          </div>

          <div className={styles.accountDetails}>
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3h12v10H3V3z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 6l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Student ID
              </div>
              <div className={styles.detailValue}>{settings.account.studentId}</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="4" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 7l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Email
              </div>
              <div className={styles.detailValue}>{settings.account.email}</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5.5 1v2M5.5 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Phone
              </div>
              <div className={styles.detailValue}>{settings.account.phone || 'Not set'}</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="4" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 8h6M6 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Enrolled Classes
              </div>
              <div className={styles.detailValue}>
                <div className={styles.classesList}>
                  {settings.account.classes.map((cls, index) => (
                    <Badge key={index} variant="secondary">{cls}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Notification Settings */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10 5a2 2 0 114 0 7 7 0 014 6v3l2 2H4l2-2V11a7 7 0 014-6zM9 17v1a3 3 0 006 0v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Notification Preferences</h2>
            <p className={styles.sectionDescription}>Choose how you want to receive notifications</p>
          </div>
        </div>

        <Card>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>System Notifications</div>
                <div className={styles.settingDesc}>General system alerts and updates</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.system}
                  onChange={() => handleNotificationChange('system')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Email Notifications</div>
                <div className={styles.settingDesc}>Receive notifications via email</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Push Notifications</div>
                <div className={styles.settingDesc}>Receive push notifications on your device</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Assignment Updates</div>
                <div className={styles.settingDesc}>New assignments and due date reminders</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.assignments}
                  onChange={() => handleNotificationChange('assignments')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Grade Updates</div>
                <div className={styles.settingDesc}>When assignments are graded</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.grades}
                  onChange={() => handleNotificationChange('grades')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>School Announcements</div>
                <div className={styles.settingDesc}>Important school and class announcements</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.announcements}
                  onChange={() => handleNotificationChange('announcements')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Teacher Messages</div>
                <div className={styles.settingDesc}>Messages from your teachers</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.messages}
                  onChange={() => handleNotificationChange('messages')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>AI Recommendations</div>
                <div className={styles.settingDesc}>Daily study suggestions and learning tips</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.notifications.aiRecommendations}
                  onChange={() => handleNotificationChange('aiRecommendations')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </Card>
      </section>

      {/* Privacy & Security */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Privacy & Security</h2>
            <p className={styles.sectionDescription}>Control your privacy and data sharing preferences</p>
          </div>
        </div>

        <Card>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Show Achievements to Classmates</div>
                <div className={styles.settingDesc}>Let classmates see your learning achievements</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.privacy.showAchievementsToClassmates}
                  onChange={() => handlePrivacyChange('showAchievementsToClassmates')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Show Grades to Classmates</div>
                <div className={styles.settingDesc}>Allow classmates to view your grades</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.privacy.showGradesToClassmates}
                  onChange={() => handlePrivacyChange('showGradesToClassmates')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Teacher Progress Monitoring</div>
                <div className={styles.settingDesc}>Allow teachers to view detailed learning progress</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.privacy.allowTeacherViewProgress}
                  onChange={() => handlePrivacyChange('allowTeacherViewProgress')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Parent Access</div>
                <div className={styles.settingDesc}>Allow parents to access your academic information</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.privacy.allowParentAccess}
                  onChange={() => handlePrivacyChange('allowParentAccess')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Data Sharing for Research</div>
                <div className={styles.settingDesc}>Share anonymized data for educational research</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.privacy.dataSharing}
                  onChange={() => handlePrivacyChange('dataSharing')}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </Card>
      </section>

      {/* Learning Preferences */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l10 6-10 6L2 8l10-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 14l10 6 10-6M2 20l10 6 10-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Learning Preferences</h2>
            <p className={styles.sectionDescription}>Customize your learning experience</p>
          </div>
        </div>

        <Card>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Daily Learning Reminder</div>
                <div className={styles.settingDesc}>Receive daily study reminders and motivation</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.learning.dailyLearningReminder}
                  onChange={() => handleLearningChange('dailyLearningReminder', !settings.learning.dailyLearningReminder)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>AI Tutor</div>
                <div className={styles.settingDesc}>Enable AI-powered learning assistance</div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.learning.aiTutorEnabled}
                  onChange={() => handleLearningChange('aiTutorEnabled', !settings.learning.aiTutorEnabled)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Daily Study Goal</div>
                <div className={styles.settingDesc}>Target study time per day (minutes)</div>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  className={styles.numberInput}
                  value={settings.learning.studyGoal}
                  onChange={(e) => handleLearningChange('studyGoal', parseInt(e.target.value))}
                  min="30"
                  max="480"
                  step="30"
                />
                <span className={styles.inputSuffix}>minutes</span>
              </div>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Preferred Study Time</div>
                <div className={styles.settingDesc}>When do you study most effectively?</div>
              </div>
              <select
                className={styles.select}
                value={settings.learning.preferredStudyTime}
                onChange={(e) => handleLearningChange('preferredStudyTime', e.target.value)}
              >
                <option value="morning">Morning (6AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 6PM)</option>
                <option value="evening">Evening (6PM - 10PM)</option>
                <option value="night">Night (10PM - 6AM)</option>
              </select>
            </div>
          </div>
        </Card>
      </section>

      {/* Language & Display */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Language & Display</h2>
            <p className={styles.sectionDescription}>Customize your interface preferences</p>
          </div>
        </div>

        <Card>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Language</div>
                <div className={styles.settingDesc}>Choose your preferred language</div>
              </div>
              <select
                className={styles.select}
                value={settings.display.language}
                onChange={(e) => handleDisplayChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="es">Español (Spanish)</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Theme</div>
                <div className={styles.settingDesc}>Choose your color theme</div>
              </div>
              <select
                className={styles.select}
                value={settings.display.theme}
                onChange={(e) => handleDisplayChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Font Size</div>
                <div className={styles.settingDesc}>Adjust text size for better readability</div>
              </div>
              <select
                className={styles.select}
                value={settings.display.fontSize}
                onChange={(e) => handleDisplayChange('fontSize', e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </Card>
      </section>

      {/* Danger Zone */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon} style={{ color: 'var(--error-500)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01M4 7l8-4 8 4v10l-8 4-8-4V7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Account Management</h2>
            <p className={styles.sectionDescription}>Manage your account data and access</p>
          </div>
        </div>

        <Card className={styles.dangerZone}>
          <div className={styles.dangerActions}>
            <div className={styles.dangerAction}>
              <div className={styles.dangerInfo}>
                <div className={styles.dangerLabel}>Change Password</div>
                <div className={styles.dangerDesc}>Update your account password</div>
              </div>
              <Button variant="secondary">Change Password</Button>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.dangerAction}>
              <div className={styles.dangerInfo}>
                <div className={styles.dangerLabel}>Download My Data</div>
                <div className={styles.dangerDesc}>Download a copy of your personal data</div>
              </div>
              <Button variant="secondary">Download Data</Button>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.dangerAction}>
              <div className={styles.dangerInfo}>
                <div className={styles.dangerLabel}>Delete Account</div>
                <div className={styles.dangerDesc}>Permanently delete your account and all data</div>
              </div>
              <Button variant="danger">Delete Account</Button>
            </div>
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default SettingsPage;

