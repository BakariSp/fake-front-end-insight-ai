'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import styles from './admin.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock admin accounts for demonstration
  const mockAdminAccounts = [
    { email: 'admin@school.edu', password: 'admin123', name: '张校长', role: 'Super Admin' },
    { email: 'schooladmin@school.edu', password: 'admin123', name: '李主任', role: 'School Admin' },
    { email: 'coordinator@school.edu', password: 'admin123', name: '王老师', role: 'Grade Coordinator' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - just redirect
    router.push('/admin/dashboard');
  };

  const handleQuickLogin = (account: typeof mockAdminAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 300);
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
            <span className={styles.logoIcon}>🔐</span>
            <div>
              <h1>{t('login.adminPortal')}</h1>
              <p>{t('login.administrativeAccess')}</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.notice}>
            <span className={styles.noticeIcon}>ℹ️</span>
            <p>{t('login.adminNotice')}</p>
          </div>

          <Input
            label={t('login.adminEmail')}
            type="email"
            placeholder="admin@school.edu"
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

          <Button type="submit" fullWidth size="large">
            {t('login.adminLogin')}
          </Button>
        </form>

        {/* Security Notice */}
        <div className={styles.securityNotice}>
          <p>🔒 {t('login.secureConnection')}</p>
        </div>

        {/* Mock Accounts for Demo */}
        <div className={styles.mockAccounts}>
          <div className={styles.mockTitle}>
            🎭 {t('login.demoAccounts')}
          </div>
          <div className={styles.mockList}>
            {mockAdminAccounts.map((account, index) => (
              <button
                key={index}
                className={styles.mockAccount}
                onClick={() => handleQuickLogin(account)}
                type="button"
              >
                <div className={styles.mockAvatar}>👔</div>
                <div className={styles.mockInfo}>
                  <div className={styles.mockName}>
                    {account.name}
                    <span className={styles.mockBadge}>{account.role}</span>
                  </div>
                  <div className={styles.mockEmail}>{account.email}</div>
                </div>
                <div className={styles.mockLogin}>{t('login.quickLogin')} →</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Background */}
      <div className={styles.backgroundPattern}></div>
    </div>
  );
}

