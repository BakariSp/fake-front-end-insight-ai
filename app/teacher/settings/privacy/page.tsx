'use client';

import React, { useState } from 'react';
import styles from './privacy.module.css';

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

const PrivacyPage: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('school');
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Privacy & Security</h1>
        <p className={styles.subtitle}>
          Manage your account security and privacy settings
        </p>
      </div>

      <div className={styles.content}>
        {/* Password Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Password</h2>
          <p className={styles.sectionDescription}>
            Keep your account secure with a strong password
          </p>

          <div className={styles.passwordInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 8v5M12 16v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className={styles.infoLabel}>Last Changed</div>
                <div className={styles.infoValue}>3 months ago</div>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <div className={styles.infoLabel}>Password Strength</div>
                <div className={styles.infoValue}>
                  <span className={styles.strengthBadge}>Strong</span>
                </div>
              </div>
            </div>
          </div>

          <button className={styles.changePasswordButton}>
            Change Password
          </button>
        </section>

        {/* Two-Factor Authentication */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Two-Factor Authentication</h2>
              <p className={styles.sectionDescription}>
                Add an extra layer of security to your account
              </p>
            </div>
            <ToggleSwitch checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className={styles.twoFactorContent}>
              <div className={styles.twoFactorMethods}>
                <label className={styles.radioCard}>
                  <input type="radio" name="2fa-method" defaultChecked />
                  <div className={styles.radioContent}>
                    <div className={styles.radioIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className={styles.radioLabel}>Authenticator App</div>
                      <div className={styles.radioDescription}>
                        Use an app like Google Authenticator or Authy
                      </div>
                    </div>
                  </div>
                </label>

                <label className={styles.radioCard}>
                  <input type="radio" name="2fa-method" />
                  <div className={styles.radioContent}>
                    <div className={styles.radioIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div>
                      <div className={styles.radioLabel}>SMS</div>
                      <div className={styles.radioDescription}>
                        Receive codes via text message
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              <button className={styles.setupButton}>
                Set Up Two-Factor Authentication
              </button>
            </div>
          )}
        </section>

        {/* Profile Visibility */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Visibility</h2>
          <p className={styles.sectionDescription}>
            Control who can see your profile information
          </p>

          <div className={styles.visibilityOptions}>
            <label className={styles.visibilityCard}>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={profileVisibility === 'public'}
                onChange={(e) => setProfileVisibility(e.target.value)}
              />
              <div className={styles.visibilityContent}>
                <div className={styles.visibilityIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 5v14M19 12H5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.visibilityLabel}>Public</div>
                  <div className={styles.visibilityDescription}>
                    Anyone can see your profile
                  </div>
                </div>
              </div>
            </label>

            <label className={styles.visibilityCard}>
              <input
                type="radio"
                name="visibility"
                value="school"
                checked={profileVisibility === 'school'}
                onChange={(e) => setProfileVisibility(e.target.value)}
              />
              <div className={styles.visibilityContent}>
                <div className={styles.visibilityIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.visibilityLabel}>School Only</div>
                  <div className={styles.visibilityDescription}>
                    Only members of your school can see your profile
                  </div>
                </div>
              </div>
            </label>

            <label className={styles.visibilityCard}>
              <input
                type="radio"
                name="visibility"
                value="class"
                checked={profileVisibility === 'class'}
                onChange={(e) => setProfileVisibility(e.target.value)}
              />
              <div className={styles.visibilityContent}>
                <div className={styles.visibilityIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.visibilityLabel}>Class Only</div>
                  <div className={styles.visibilityDescription}>
                    Only students in your classes can see your profile
                  </div>
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Danger Zone */}
        <section className={`${styles.section} ${styles.dangerSection}`}>
          <h2 className={styles.dangerTitle}>Danger Zone</h2>
          <p className={styles.sectionDescription}>
            Irreversible actions that affect your account
          </p>

          <div className={styles.dangerActions}>
            <div className={styles.dangerCard}>
              <div>
                <div className={styles.dangerLabel}>Deactivate Account</div>
                <div className={styles.dangerDescription}>
                  Temporarily disable your account. You can reactivate it later.
                </div>
              </div>
              <button 
                className={styles.dangerButton}
                onClick={() => setShowDeactivateModal(true)}
              >
                Deactivate
              </button>
            </div>

            <div className={styles.dangerCard}>
              <div>
                <div className={styles.dangerLabel}>Delete Account</div>
                <div className={styles.dangerDescription}>
                  Permanently delete your account and all data. This cannot be undone.
                </div>
              </div>
              <button 
                className={`${styles.dangerButton} ${styles.dangerButtonDelete}`}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* Save Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeactivateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Deactivate Account</h3>
              <button 
                className={styles.modalClose}
                onClick={() => setShowDeactivateModal(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to deactivate your account? You can reactivate it anytime by logging in again.</p>
            </div>
            <div className={styles.modalActions}>
              <button 
                className={styles.modalCancelButton}
                onClick={() => setShowDeactivateModal(false)}
              >
                Cancel
              </button>
              <button className={styles.modalConfirmButton}>
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Delete Account</h3>
              <button 
                className={styles.modalClose}
                onClick={() => setShowDeleteModal(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.warningBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>This action cannot be undone. All your data, classes, assignments, and materials will be permanently deleted.</p>
              </div>
              <div className={styles.confirmInput}>
                <label>Type "DELETE" to confirm:</label>
                <input type="text" placeholder="DELETE" />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button 
                className={styles.modalCancelButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className={`${styles.modalConfirmButton} ${styles.modalDeleteButton}`}>
                Delete Account Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPage;

