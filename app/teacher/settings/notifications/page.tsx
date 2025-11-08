'use client';

import React, { useState } from 'react';
import styles from './notifications.module.css';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled }) => {
  return (
    <button
      className={`${styles.toggle} ${checked ? styles.toggleOn : styles.toggleOff} ${disabled ? styles.toggleDisabled : ''}`}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
    >
      <span className={styles.toggleSlider} />
    </button>
  );
};

const NotificationsPage: React.FC = () => {
  // Channels State
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);

  // Categories State
  const [classUpdates, setClassUpdates] = useState(true);
  const [assignments, setAssignments] = useState(true);
  const [gradingCompleted, setGradingCompleted] = useState(true);
  const [studentMessages, setStudentMessages] = useState(true);
  const [parentMessages, setParentMessages] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);

  // Advanced State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [reminderTiming, setReminderTiming] = useState('1hour');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.subtitle}>
          Manage how and when you receive notifications
        </p>
      </div>

      <div className={styles.content}>
        {/* Channels Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Notification Channels</h2>
              <p className={styles.sectionDescription}>
                Choose how you want to receive notifications
              </p>
            </div>
          </div>

          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 6l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.settingLabel}>Email Notifications</div>
                  <div className={styles.settingDescription}>
                    Receive notifications via email
                  </div>
                </div>
              </div>
              <ToggleSwitch checked={emailEnabled} onChange={setEmailEnabled} />
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="5" y="3" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.settingLabel}>Push Notifications</div>
                  <div className={styles.settingDescription}>
                    Receive push notifications on your device
                  </div>
                </div>
              </div>
              <ToggleSwitch checked={pushEnabled} onChange={setPushEnabled} />
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <div className={styles.settingIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4a5 5 0 00-5 5c0 4-2 5-2 5h14s-2-1-2-5a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11.5 17a1.5 1.5 0 01-3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.settingLabel}>In-App Notifications</div>
                  <div className={styles.settingDescription}>
                    See notifications within the application
                  </div>
                </div>
              </div>
              <ToggleSwitch checked={inAppEnabled} onChange={setInAppEnabled} />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Notification Categories</h2>
              <p className={styles.sectionDescription}>
                Choose what you want to be notified about
              </p>
            </div>
          </div>

          <div className={styles.categoriesList}>
            {/* Class Updates */}
            <div className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} style={{ background: '#E8EEFF', color: '#4F7FFF' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="4" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 7h6M6 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.categoryTitle}>Class Updates</div>
              </div>
              <ToggleSwitch checked={classUpdates} onChange={setClassUpdates} />
            </div>

            {/* Assignments */}
            <div className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} style={{ background: '#FFF7E6', color: '#FF9800' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 6h10M4 9h10M4 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.categoryTitle}>Assignment Submissions</div>
              </div>
              <ToggleSwitch checked={assignments} onChange={setAssignments} />
            </div>

            {/* Grading Completed */}
            <div className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} style={{ background: '#F6FFED', color: '#52C41A' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.categoryTitle}>Grading Completed</div>
              </div>
              <ToggleSwitch checked={gradingCompleted} onChange={setGradingCompleted} />
            </div>

            {/* Student Messages */}
            <div className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} style={{ background: '#FFF0F6', color: '#EB2F96' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 5V4a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.categoryTitle}>Student Messages</div>
              </div>
              <ToggleSwitch checked={studentMessages} onChange={setStudentMessages} />
            </div>

            {/* Parent Messages */}
            <div className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} style={{ background: '#F9F0FF', color: '#9C27B0' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 14c0-1.657 1.343-3 3-3h2c.768 0 1.47.289 2 .764M10 14c0-1.657 1.343-3 3-3h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.categoryTitle}>Parent Messages</div>
              </div>
              <ToggleSwitch checked={parentMessages} onChange={setParentMessages} />
            </div>

            {/* System Alerts */}
            <div className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} style={{ background: '#F5F5F5', color: '#8C8C8C' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 6v3M9 12v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.categoryTitle}>System Alerts</div>
              </div>
              <ToggleSwitch checked={systemAlerts} onChange={setSystemAlerts} />
            </div>
          </div>
        </section>

        {/* Advanced Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <button 
              className={styles.advancedToggle}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                className={`${styles.advancedArrow} ${showAdvanced ? styles.advancedArrowOpen : ''}`}
              >
                <path d="M7 9l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className={styles.sectionTitle}>Advanced Settings</h2>
            </button>
          </div>

          {showAdvanced && (
            <div className={styles.advancedContent}>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <div>
                      <div className={styles.settingLabel}>Quiet Hours</div>
                      <div className={styles.settingDescription}>
                        Mute notifications during specific hours
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch checked={quietHoursEnabled} onChange={setQuietHoursEnabled} />
                </div>

                {quietHoursEnabled && (
                  <div className={styles.quietHoursSettings}>
                    <div className={styles.timeRangeGroup}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>From</label>
                        <input 
                          type="time" 
                          className={styles.timeInput}
                          defaultValue="22:00"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>To</label>
                        <input 
                          type="time" 
                          className={styles.timeInput}
                          defaultValue="07:00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <div>
                      <div className={styles.settingLabel}>Reminder Timing</div>
                      <div className={styles.settingDescription}>
                        When to send reminder notifications
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.radioGroup}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="reminderTiming"
                      value="30min"
                      checked={reminderTiming === '30min'}
                      onChange={(e) => setReminderTiming(e.target.value)}
                    />
                    <span>30 minutes before</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="reminderTiming"
                      value="1hour"
                      checked={reminderTiming === '1hour'}
                      onChange={(e) => setReminderTiming(e.target.value)}
                    />
                    <span>1 hour before</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="reminderTiming"
                      value="1day"
                      checked={reminderTiming === '1day'}
                      onChange={(e) => setReminderTiming(e.target.value)}
                    />
                    <span>1 day before</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Save Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

