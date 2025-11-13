'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import styles from './register.module.css';

type UserRole = 'student' | 'teacher';
type RegistrationStep = 'role-selection' | 'registration' | 'email-verification';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [step, setStep] = useState<RegistrationStep>('role-selection');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  // Error states
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Role Selection Handlers
  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    setStep('registration');
  };

  // SSO Registration
  const handleSSORegister = (provider: 'google' | 'microsoft') => {
    console.log(`Registering with ${provider} as ${selectedRole}`);
    // Mock SSO - directly create account and redirect
    if (selectedRole === 'student') {
      router.push('/student/dashboard');
    } else {
      router.push('/teacher');
    }
  };

  // Email Registration Validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = t('register.errorNameRequired');
    }
    
    if (!email.trim()) {
      newErrors.email = t('register.errorEmailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('register.errorEmailInvalid');
    }
    
    if (!password) {
      newErrors.password = t('register.errorPasswordRequired');
    } else if (password.length < 8) {
      newErrors.password = t('register.errorPasswordLength');
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('register.errorPasswordMismatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Email Registration Submission
  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock: Send verification email
      console.log('Sending verification email to:', email);
      setStep('email-verification');
    }
  };

  // Verify Email Code
  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setErrors({ verificationCode: t('register.errorCodeRequired') });
      return;
    }
    
    // Mock verification - accept any 6-digit code
    if (verificationCode.length === 6) {
      console.log('Email verified successfully');
      // Redirect based on role
      if (selectedRole === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/teacher');
      }
    } else {
      setErrors({ verificationCode: t('register.errorCodeInvalid') });
    }
  };

  // Resend Verification Code
  const handleResendCode = () => {
    console.log('Resending verification code to:', email);
    setErrors({});
    // Mock: Show success message
    alert(t('register.codeSent'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        {/* Header */}
        <div className={styles.header}>
          <button 
            className={styles.backButton} 
            onClick={() => {
              if (step === 'email-verification') {
                setStep('registration');
              } else if (step === 'registration') {
                setStep('role-selection');
              } else {
                router.push('/login/portal');
              }
            }}
          >
            ← {t('common.back')}
          </button>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <div>
              <h1>InsightAI</h1>
              <p>{t('register.createAccount')}</p>
            </div>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 'role-selection' && (
          <div className={styles.roleSelectionContent}>
            <div className={styles.stepTitle}>
              <h2>{t('register.chooseYourRole')}</h2>
              <p>{t('register.selectRoleDescription')}</p>
            </div>

            <div className={styles.roleCards}>
              <button 
                className={styles.roleCard}
                onClick={() => handleRoleSelection('student')}
              >
                <div className={styles.roleCardIcon}>👨‍🎓</div>
                <h3>{t('register.imStudent')}</h3>
                <p>{t('register.studentDescription')}</p>
                <div className={styles.roleCardArrow}>→</div>
              </button>

              <button 
                className={styles.roleCard}
                onClick={() => handleRoleSelection('teacher')}
              >
                <div className={styles.roleCardIcon}>👨‍🏫</div>
                <h3>{t('register.imTeacher')}</h3>
                <p>{t('register.teacherDescription')}</p>
                <div className={styles.roleCardArrow}>→</div>
              </button>
            </div>

            <div className={styles.loginLink}>
              {t('register.alreadyHaveAccount')} <a href="/login/portal">{t('register.signIn')}</a>
            </div>
          </div>
        )}

        {/* Step 2: Registration Options */}
        {step === 'registration' && (
          <>
            {/* Selected Role Badge */}
            <div className={styles.selectedRole}>
              <span className={styles.roleIcon}>
                {selectedRole === 'student' ? '👨‍🎓' : '👨‍🏫'}
              </span>
              <span className={styles.roleText}>
                {t(`register.registeringAs${selectedRole === 'student' ? 'Student' : 'Teacher'}`)}
              </span>
              <button 
                className={styles.changeRole}
                onClick={() => setStep('role-selection')}
              >
                {t('register.change')}
              </button>
            </div>

            {!showEmailForm ? (
              /* SSO Registration Options */
              <div className={styles.registerContent}>
                <div className={styles.contentTitle}>
                  <h2>{t('register.getStarted')}</h2>
                  <p>{t('register.chooseRegistrationMethod')}</p>
                </div>

                {/* SSO Buttons */}
                <div className={styles.ssoButtons}>
                  <button 
                    className={styles.ssoButton}
                    onClick={() => handleSSORegister('google')}
                  >
                    <svg className={styles.ssoIcon} viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {t('register.continueWithGoogle')}
                  </button>

                  <button 
                    className={styles.ssoButton}
                    onClick={() => handleSSORegister('microsoft')}
                  >
                    <svg className={styles.ssoIcon} viewBox="0 0 23 23">
                      <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                      <path fill="#f35325" d="M1 1h10v10H1z"/>
                      <path fill="#81bc06" d="M12 1h10v10H12z"/>
                      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                      <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    {t('register.continueWithMicrosoft')}
                  </button>
                </div>

                <div className={styles.divider}>
                  <span>{t('register.or')}</span>
                </div>

                {/* Email Registration Toggle */}
                <button 
                  className={styles.emailToggle}
                  onClick={() => setShowEmailForm(true)}
                >
                  {t('register.registerWithEmail')}
                </button>

                <div className={styles.infoBox}>
                  <p>ℹ️ {t('register.noOrgCodeNeeded')}</p>
                </div>
              </div>
            ) : (
              /* Email Registration Form */
              <form onSubmit={handleEmailRegister} className={styles.registerContent}>
                <div className={styles.contentTitle}>
                  <h2>{t('register.createYourAccount')}</h2>
                  <p>{t('register.fillInDetails')}</p>
                </div>

                <div className={styles.formFields}>
                  <Input
                    label={t('register.fullName')}
                    type="text"
                    placeholder={t('register.enterFullName')}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors({...errors, fullName: ''});
                    }}
                    error={errors.fullName}
                    fullWidth
                    required
                  />

                  <Input
                    label={t('register.email')}
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({...errors, email: ''});
                    }}
                    error={errors.email}
                    fullWidth
                    required
                  />

                  <Input
                    label={t('register.password')}
                    type="password"
                    placeholder={t('register.createPassword')}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({...errors, password: ''});
                    }}
                    error={errors.password}
                    helperText={t('register.passwordRequirement')}
                    fullWidth
                    required
                  />

                  <Input
                    label={t('register.confirmPassword')}
                    type="password"
                    placeholder={t('register.confirmPasswordPlaceholder')}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors({...errors, confirmPassword: ''});
                    }}
                    error={errors.confirmPassword}
                    fullWidth
                    required
                  />
                </div>

                <div className={styles.terms}>
                  <label>
                    <input type="checkbox" required />
                    <span>
                      {t('register.agreeToTerms')} <a href="#">{t('register.termsOfService')}</a> {t('register.and')} <a href="#">{t('register.privacyPolicy')}</a>
                    </span>
                  </label>
                </div>

                <Button type="submit" fullWidth size="large">
                  {t('register.createAccount')}
                </Button>

                <button 
                  type="button"
                  className={styles.backToSSO}
                  onClick={() => setShowEmailForm(false)}
                >
                  ← {t('register.backToOptions')}
                </button>
              </form>
            )}

            <div className={styles.loginLink}>
              {t('register.alreadyHaveAccount')} <a href="/login/portal">{t('register.signIn')}</a>
            </div>
          </>
        )}

        {/* Step 3: Email Verification */}
        {step === 'email-verification' && (
          <div className={styles.verificationContent}>
            <div className={styles.verificationIcon}>📧</div>
            
            <div className={styles.contentTitle}>
              <h2>{t('register.verifyEmail')}</h2>
              <p>{t('register.verificationCodeSent')} <strong>{email}</strong></p>
            </div>

            <form onSubmit={handleVerifyEmail} className={styles.verificationForm}>
              <Input
                label={t('register.verificationCode')}
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(value);
                  setErrors({...errors, verificationCode: ''});
                }}
                error={errors.verificationCode}
                maxLength={6}
                fullWidth
                required
              />

              <Button type="submit" fullWidth size="large">
                {t('register.verifyAndContinue')}
              </Button>
            </form>

            <div className={styles.resendSection}>
              <p>{t('register.didntReceiveCode')}</p>
              <button 
                type="button"
                className={styles.resendButton}
                onClick={handleResendCode}
              >
                {t('register.resendCode')}
              </button>
            </div>

            <div className={styles.demoHint}>
              <p>💡 {t('register.demoHint')}: <strong>123456</strong></p>
            </div>
          </div>
        )}
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundCircle1}></div>
      <div className={styles.backgroundCircle2}></div>
    </div>
  );
}

