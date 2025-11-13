'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import styles from './portal.module.css';

type UserRole = 'student' | 'teacher';

export default function PortalLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    // Mock SSO login - redirect based on role
    console.log(`Logging in with ${provider} as ${selectedRole}`);
    if (selectedRole === 'student') {
      router.push('/student/dashboard');
    } else {
      router.push('/teacher');
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock email login - redirect based on role
    if (selectedRole === 'student') {
      router.push('/student/dashboard');
    } else {
      router.push('/teacher');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.push('/login')}>
            ← {t('common.back')}
          </button>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <div>
              <h1>InsightAI</h1>
              <p>{t('login.studentTeacherPortal')}</p>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className={styles.roleSelection}>
          <p className={styles.roleLabel}>{t('login.selectYourRole')}</p>
          <div className={styles.roleToggle}>
            <button
              className={`${styles.roleToggleButton} ${selectedRole === 'student' ? styles.active : ''}`}
              onClick={() => setSelectedRole('student')}
            >
              👨‍🎓 {t('login.student')}
            </button>
            <button
              className={`${styles.roleToggleButton} ${selectedRole === 'teacher' ? styles.active : ''}`}
              onClick={() => setSelectedRole('teacher')}
            >
              👨‍🏫 {t('login.teacher')}
            </button>
          </div>
        </div>

        {!showEmailLogin ? (
          /* SSO Login Options */
          <div className={styles.loginContent}>
            <div className={styles.loginTitle}>
              <h2>{t('login.signIn')}</h2>
              <p>{t('login.continueWith')}</p>
            </div>

            {/* SSO Buttons */}
            <div className={styles.ssoButtons}>
              <button 
                className={styles.ssoButton}
                onClick={() => handleSSOLogin('google')}
              >
                <svg className={styles.ssoIcon} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t('login.continueWithGoogle')}
              </button>

              <button 
                className={styles.ssoButton}
                onClick={() => handleSSOLogin('microsoft')}
              >
                <svg className={styles.ssoIcon} viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                {t('login.continueWithMicrosoft')}
              </button>
            </div>

            <div className={styles.divider}>
              <span>{t('login.or')}</span>
            </div>

            {/* Email Login Toggle */}
            <button 
              className={styles.emailToggle}
              onClick={() => setShowEmailLogin(true)}
            >
              {t('login.continueWithEmail')}
            </button>

            <div className={styles.signupLink}>
              {t('login.newUser')} <a href="/login/register">{t('login.createAccount')}</a>
            </div>
          </div>
        ) : (
          /* Email Login Form */
          <form onSubmit={handleEmailLogin} className={styles.loginContent}>
            <div className={styles.loginTitle}>
              <h2>{t('login.signIn')}</h2>
              <p>{t('login.signInWithEmail')}</p>
            </div>

            <div className={styles.formFields}>
              <Input
                label={t('login.email')}
                type="email"
                placeholder="your.email@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />

              <Input
                label={t('login.password')}
                type="password"
                placeholder={t('login.enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />

              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" />
                  <span>{t('login.rememberMe')}</span>
                </label>
                <a href="#" className={styles.forgotPassword}>{t('login.forgotPassword')}</a>
              </div>
            </div>

            <Button type="submit" fullWidth size="large">
              {t('login.signIn')}
            </Button>

            <button 
              type="button"
              className={styles.backToSSO}
              onClick={() => setShowEmailLogin(false)}
            >
              ← {t('login.backToOptions')}
            </button>

            <div className={styles.signupLink}>
              {t('login.newUser')} <a href="/login/register">{t('login.createAccount')}</a>
            </div>
          </form>
        )}

        {/* Demo Accounts */}
        <div className={styles.demoHint}>
          <p>💡 {t('login.quickAccess')}</p>
          <div className={styles.demoButtons}>
            <button onClick={() => { 
              setSelectedRole('student');
              setTimeout(() => router.push('/student/dashboard'), 300);
            }}>
              {t('login.demoStudent')}
            </button>
            <button onClick={() => { 
              setSelectedRole('teacher');
              setTimeout(() => router.push('/teacher'), 300);
            }}>
              {t('login.demoTeacher')}
            </button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundCircle1}></div>
      <div className={styles.backgroundCircle2}></div>
    </div>
  );
}

