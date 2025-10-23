'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import styles from './login.module.css';

type UserRole = 'student' | 'teacher' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock accounts for demonstration
  const mockAccounts = {
    student: [
      { email: 'student@school.edu', password: 'student123', name: '张小明' },
      { email: 'student2@school.edu', password: 'student123', name: '李小红' },
    ],
    teacher: [
      { email: 'teacher@school.edu', password: 'teacher123', name: '王老师', subject: 'Mathematics' },
      { email: 'teacher2@school.edu', password: 'teacher123', name: '刘老师', subject: 'English' },
      { email: 'teacher3@school.edu', password: 'teacher123', name: '陈老师', subject: 'Science' },
    ],
    admin: [
      { email: 'admin@school.edu', password: 'admin123', name: '张校长', role: 'Super Admin' },
      { email: 'schooladmin@school.edu', password: 'admin123', name: '李主任', role: 'School Admin' },
      { email: 'coordinator@school.edu', password: 'admin123', name: '王老师', role: 'Grade Coordinator' },
    ],
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - just redirect based on role
    if (selectedRole === 'student') {
      router.push('/student/dashboard');
    } else if (selectedRole === 'teacher') {
      router.push('/teacher');
    } else {
      router.push('/admin/dashboard');
    }
  };

  const handleQuickLogin = (role: UserRole, accountIndex: number) => {
    const account = mockAccounts[role][accountIndex];
    setEmail(account.email);
    if (role === 'student') {
      setPassword('student123');
    } else if (role === 'teacher') {
      setPassword('teacher123');
    } else {
      setPassword('admin123');
    }
    
    // Auto login after a short delay
    setTimeout(() => {
      if (role === 'student') {
        router.push('/student/dashboard');
      } else if (role === 'teacher') {
        router.push('/teacher');
      } else {
        router.push('/admin/dashboard');
      }
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {/* Logo and Title */}
        <div className={styles.header}>
          <div className={styles.logo}>🎓</div>
          <h1 className={styles.title}>InsightAI Education</h1>
          <p className={styles.subtitle}>{t('login.platform')}</p>
        </div>

        {/* Role Selection */}
        <div className={styles.roleSelector}>
          <button
            className={`${styles.roleButton} ${selectedRole === 'student' ? styles.roleButtonActive : ''}`}
            onClick={() => setSelectedRole('student')}
          >
            <span className={styles.roleIcon}>👨‍🎓</span>
            <span className={styles.roleText}>{t('login.studentLogin')}</span>
          </button>
          <button
            className={`${styles.roleButton} ${selectedRole === 'teacher' ? styles.roleButtonActive : ''}`}
            onClick={() => setSelectedRole('teacher')}
          >
            <span className={styles.roleIcon}>👨‍🏫</span>
            <span className={styles.roleText}>{t('login.teacherLogin')}</span>
          </button>
          <button
            className={`${styles.roleButton} ${selectedRole === 'admin' ? styles.roleButtonActive : ''}`}
            onClick={() => setSelectedRole('admin')}
          >
            <span className={styles.roleIcon}>👔</span>
            <span className={styles.roleText}>{t('login.adminLogin')}</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <Input
            label={t('login.email')}
            type="email"
            placeholder={
              selectedRole === 'student' ? 'student@school.edu' :
              selectedRole === 'teacher' ? 'teacher@school.edu' :
              'admin@school.edu'
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            icon={<span>📧</span>}
          />
          
          <Input
            label={t('login.password')}
            type="password"
            placeholder={t('login.enterPassword')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            icon={<span>🔒</span>}
          />

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>{t('login.rememberMe')}</span>
            </label>
            <a href="#" className={styles.forgotPassword}>{t('login.forgotPassword')}</a>
          </div>

          <Button type="submit" fullWidth size="large">
            {selectedRole === 'student' ? t('login.studentLogin') :
             selectedRole === 'teacher' ? t('login.teacherLogin') :
             t('login.adminLogin')}
          </Button>
        </form>

        {/* OAuth Options */}
        <div className={styles.oauthSection}>
          <div className={styles.divider}>
            <span>{t('login.orLoginWith')}</span>
          </div>
          <div className={styles.oauthButtons}>
            <button className={styles.oauthButton}>
              <span>🔵</span> Google Account
            </button>
            <button className={styles.oauthButton}>
              <span>🟦</span> Microsoft 365
            </button>
          </div>
        </div>

        {/* Mock Accounts for Demo */}
        <div className={styles.mockAccounts}>
          <div className={styles.mockTitle}>
            🎭 {t('login.demoAccounts')}
          </div>
          {selectedRole === 'student' ? (
            <div className={styles.mockList}>
              {mockAccounts.student.map((account, index) => (
                <button
                  key={index}
                  className={styles.mockAccount}
                  onClick={() => handleQuickLogin('student', index)}
                >
                  <div className={styles.mockAvatar}>👨‍🎓</div>
                  <div className={styles.mockInfo}>
                    <div className={styles.mockName}>{account.name}</div>
                    <div className={styles.mockEmail}>{account.email}</div>
                  </div>
                  <div className={styles.mockLogin}>{t('login.quickLogin')} →</div>
                </button>
              ))}
            </div>
          ) : selectedRole === 'teacher' ? (
            <div className={styles.mockList}>
              {mockAccounts.teacher.map((account, index) => (
                <button
                  key={index}
                  className={styles.mockAccount}
                  onClick={() => handleQuickLogin('teacher', index)}
                >
                  <div className={styles.mockAvatar}>👨‍🏫</div>
                  <div className={styles.mockInfo}>
                    <div className={styles.mockName}>
                      {account.name}
                      <span className={styles.mockBadge}>{account.subject}</span>
                    </div>
                    <div className={styles.mockEmail}>{account.email}</div>
                  </div>
                  <div className={styles.mockLogin}>{t('login.quickLogin')} →</div>
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.mockList}>
              {mockAccounts.admin.map((account, index) => (
                <button
                  key={index}
                  className={styles.mockAccount}
                  onClick={() => handleQuickLogin('admin', index)}
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
          )}
        </div>
      </div>

      {/* Background Decoration */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.decorationCircle} style={{ top: '10%', left: '15%' }}></div>
        <div className={styles.decorationCircle} style={{ top: '70%', right: '20%' }}></div>
        <div className={styles.decorationCircle} style={{ bottom: '15%', left: '25%' }}></div>
      </div>
    </div>
  );
}

