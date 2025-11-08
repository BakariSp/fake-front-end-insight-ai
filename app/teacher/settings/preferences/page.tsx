'use client';

import React, { useState } from 'react';
import styles from './preferences.module.css';

const PreferencesPage: React.FC = () => {
  const [layoutDensity, setLayoutDensity] = useState('comfortable');
  const [defaultView, setDefaultView] = useState('list');
  const [sortOrder, setSortOrder] = useState('dueDate');
  const [contentVideo, setContentVideo] = useState(true);
  const [contentReading, setContentReading] = useState(true);
  const [contentInteractive, setContentInteractive] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('America/New_York');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Preferences</h1>
        <p className={styles.subtitle}>
          Customize your teaching experience and interface
        </p>
      </div>

      <div className={styles.content}>
        {/* Layout & View Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Layout & View</h2>
          <p className={styles.sectionDescription}>
            Adjust how information is displayed
          </p>

          <div className={styles.formGroup}>
            <label className={styles.label}>Layout Density</label>
            <div className={styles.optionCards}>
              <button
                className={`${styles.optionCard} ${layoutDensity === 'compact' ? styles.optionCardActive : ''}`}
                onClick={() => setLayoutDensity('compact')}
              >
                <div className={styles.optionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="3" rx="1" fill="currentColor"/>
                    <rect x="4" y="9" width="16" height="3" rx="1" fill="currentColor"/>
                    <rect x="4" y="14" width="16" height="3" rx="1" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.optionLabel}>Compact</div>
                <div className={styles.optionDescription}>More items per page</div>
              </button>

              <button
                className={`${styles.optionCard} ${layoutDensity === 'comfortable' ? styles.optionCardActive : ''}`}
                onClick={() => setLayoutDensity('comfortable')}
              >
                <div className={styles.optionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor"/>
                    <rect x="4" y="10" width="16" height="4" rx="1" fill="currentColor"/>
                    <rect x="4" y="16" width="16" height="4" rx="1" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.optionLabel}>Comfortable</div>
                <div className={styles.optionDescription}>Balanced spacing</div>
              </button>

              <button
                className={`${styles.optionCard} ${layoutDensity === 'spacious' ? styles.optionCardActive : ''}`}
                onClick={() => setLayoutDensity('spacious')}
              >
                <div className={styles.optionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="3" width="16" height="5" rx="1" fill="currentColor"/>
                    <rect x="4" y="10" width="16" height="5" rx="1" fill="currentColor"/>
                    <rect x="4" y="17" width="16" height="5" rx="1" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.optionLabel}>Spacious</div>
                <div className={styles.optionDescription}>Extra breathing room</div>
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Default Assignment View</label>
            <select 
              className={styles.select}
              value={defaultView}
              onChange={(e) => setDefaultView(e.target.value)}
            >
              <option value="list">List View</option>
              <option value="grid">Grid View</option>
              <option value="kanban">Kanban Board</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Default Sort Order</label>
            <select 
              className={styles.select}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="dueDate">Due Date</option>
              <option value="created">Date Created</option>
              <option value="title">Title (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>
        </section>

        {/* Teaching Formats Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Teaching Content Preferences</h2>
          <p className={styles.sectionDescription}>
            Set your preferred teaching and content formats
          </p>

          <div className={styles.contentPreferences}>
            <label className={styles.checkboxCard}>
              <input
                type="checkbox"
                checked={contentVideo}
                onChange={(e) => setContentVideo(e.target.checked)}
              />
              <div className={styles.checkboxContent}>
                <div className={styles.checkboxIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.checkboxLabel}>Video Content</div>
                  <div className={styles.checkboxDescription}>
                    Prefer video-based teaching materials
                  </div>
                </div>
              </div>
            </label>

            <label className={styles.checkboxCard}>
              <input
                type="checkbox"
                checked={contentReading}
                onChange={(e) => setContentReading(e.target.checked)}
              />
              <div className={styles.checkboxContent}>
                <div className={styles.checkboxIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 10h16M4 14h12M4 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.checkboxLabel}>Reading Materials</div>
                  <div className={styles.checkboxDescription}>
                    Prefer text-based teaching materials
                  </div>
                </div>
              </div>
            </label>

            <label className={styles.checkboxCard}>
              <input
                type="checkbox"
                checked={contentInteractive}
                onChange={(e) => setContentInteractive(e.target.checked)}
              />
              <div className={styles.checkboxContent}>
                <div className={styles.checkboxIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 3v2M12 19v2M21 12h-2M5 12H3M18.364 5.636l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.checkboxLabel}>Interactive Content</div>
                  <div className={styles.checkboxDescription}>
                    Prefer interactive and hands-on materials
                  </div>
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Language & Display Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Language & Display</h2>
          <p className={styles.sectionDescription}>
            Set your language, timezone, and date preferences
          </p>

          <div className={styles.formGroup}>
            <label className={styles.label}>Language</label>
            <select 
              className={styles.select}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="zh">中文 (Chinese)</option>
              <option value="es">Español (Spanish)</option>
              <option value="fr">Français (French)</option>
              <option value="de">Deutsch (German)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Time Zone</label>
            <select 
              className={styles.select}
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Shanghai">Shanghai (CST)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date Format</label>
            <select 
              className={styles.select}
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
            </select>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className={styles.section}>
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
            <h2 className={styles.sectionTitle}>Accessibility</h2>
          </button>

          {showAdvanced && (
            <div className={styles.advancedContent}>
              <p className={styles.sectionDescription}>
                Advanced accessibility options for improved usability
              </p>

              <div className={styles.accessibilityOptions}>
                <label className={styles.checkboxOption}>
                  <input type="checkbox" />
                  <span>High contrast mode</span>
                </label>
                <label className={styles.checkboxOption}>
                  <input type="checkbox" />
                  <span>Larger text</span>
                </label>
                <label className={styles.checkboxOption}>
                  <input type="checkbox" />
                  <span>Reduce motion</span>
                </label>
                <label className={styles.checkboxOption}>
                  <input type="checkbox" />
                  <span>Screen reader optimizations</span>
                </label>
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

export default PreferencesPage;

