'use client';

import React, { useState } from 'react';
import styles from './account.module.css';

const AccountPage: React.FC = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account</h1>
        <p className={styles.subtitle}>
          Manage your profile information and account settings
        </p>
      </div>

      <div className={styles.content}>
        {/* Profile Photo Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Photo</h2>
          <div className={styles.profilePhotoWrapper}>
            <div className={styles.profilePhoto}>
              <img 
                src="/avatars/teacher-default.png" 
                alt="Profile" 
                className={styles.profilePhotoImage}
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Ccircle cx="60" cy="60" r="60" fill="%234F7FFF"/%3E%3Ctext x="60" y="60" text-anchor="middle" dy=".3em" fill="white" font-size="40" font-weight="600"%3ET%3C/text%3E%3C/svg%3E';
                }}
              />
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

        {/* Basic Information */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                className={styles.input}
                defaultValue="Dr. Sarah Johnson"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <input 
                type="text" 
                className={styles.input}
                defaultValue="sarah.johnson"
                placeholder="Enter username"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWithBadge}>
                <input 
                  type="email" 
                  className={styles.input}
                  defaultValue="sarah.johnson@school.edu"
                  placeholder="Enter email address"
                />
                <span className={styles.verifiedBadge}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </span>
              </div>
              <button className={styles.linkButton}>Change Email</button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input 
                type="tel" 
                className={styles.input}
                defaultValue="+1 (555) 123-4567"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </section>

        {/* School & Role Information */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>School & Role</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>School</label>
              <div className={styles.infoValue}>Lincoln High School</div>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Role</label>
              <div className={styles.infoValue}>Mathematics Teacher</div>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Department</label>
              <div className={styles.infoValue}>Mathematics</div>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Employee ID</label>
              <div className={styles.infoValue}>T-2024-089</div>
            </div>
          </div>
          <p className={styles.infoNote}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 8v3M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            These fields are managed by your school administrator and cannot be changed.
          </p>
        </section>

        {/* Password */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Password</h2>
          {!isEditingPassword ? (
            <div className={styles.passwordSection}>
              <p className={styles.passwordText}>
                Last changed 3 months ago
              </p>
              <button 
                className={styles.changePasswordButton}
                onClick={() => setIsEditingPassword(true)}
              >
                Change Password
              </button>
            </div>
          ) : (
            <div className={styles.passwordForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="Enter current password"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="Enter new password"
                />
                <p className={styles.hint}>
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="Confirm new password"
                />
              </div>
              <div className={styles.passwordActions}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setIsEditingPassword(false)}
                >
                  Cancel
                </button>
                <button className={styles.updatePasswordButton}>
                  Update Password
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Save Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelActionButton}>Cancel</button>
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

