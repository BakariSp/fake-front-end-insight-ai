'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './login.module.css';

export default function LoginLandingPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className={styles.landingContainer}>
      {/* Header with Admin Access */}
      <div className={styles.landingHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🎓</div>
          <div className={styles.logoText}>
            <h1>InsightAI</h1>
            <p>Education Platform</p>
          </div>
        </div>
        <button 
          className={styles.adminLink}
          onClick={() => router.push('/login/admin')}
        >
          🔐 {t('login.administrator')}
        </button>
      </div>

      {/* Main Content - Direct to Portal Login */}
      <div className={styles.landingContent}>
        <div className={styles.landingTitle}>
          <h2>{t('login.welcomeTitle')}</h2>
          <p>{t('login.welcomeSubtitle')}</p>
        </div>

        {/* Redirect to Portal */}
        <div className={styles.portalRedirect}>
          <button 
            className={styles.portalButton}
            onClick={() => router.push('/login/portal')}
          >
            <div className={styles.portalButtonContent}>
              <div className={styles.portalButtonIcon}>
                <span>👨‍🎓</span>
                <span>👨‍🏫</span>
              </div>
              <div>
                <h3>{t('login.studentTeacherPortal')}</h3>
                <p>{t('login.studentTeacherDesc')}</p>
              </div>
              <div className={styles.portalButtonArrow}>→</div>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className={styles.landingFooter}>
          <p>{t('login.needHelp')} <a href="#">{t('login.contactSupport')}</a></p>
        </div>
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundCircle1}></div>
      <div className={styles.backgroundCircle2}></div>
    </div>
  );
}
