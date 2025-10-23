'use client';

import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TabNav from '../../components/ui/TabNav';
import styles from './settings.module.css';

export default function SettingsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('school');

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'school':
        return renderSchoolInfo();
      case 'academic':
        return renderAcademicYear();
      case 'security':
        return renderSecurity();
      case 'integration':
        return renderIntegration();
      default:
        return renderSchoolInfo();
    }
  };

  const renderSchoolInfo = () => (
    <Card>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <span className={styles.cardIcon}>🏫</span>
          {t('admin.settings.tabs.schoolInfo')}
        </h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formGrid}>
          <Input
            label={t('admin.settings.schoolInfo.name')}
            defaultValue="XX中学"
            placeholder="Enter school name"
            fullWidth
            required
          />
          <Input
            label={t('admin.settings.schoolInfo.phone')}
            defaultValue="010-12345678"
            placeholder="+1 (555) 000-0000"
            type="tel"
            fullWidth
          />
          <Input
            label={t('admin.settings.schoolInfo.address')}
            defaultValue="XX市XX区XX路123号"
            placeholder="Street address"
            fullWidth
          />
          <Input
            label={t('admin.settings.schoolInfo.email')}
            defaultValue="info@school.edu"
            placeholder="school@example.com"
            type="email"
            fullWidth
            required
          />
          <Input
            label={t('admin.settings.schoolInfo.website')}
            defaultValue="www.school.edu"
            placeholder="https://www.example.com"
            fullWidth
          />
        </div>

        <div className={styles.logoSection}>
          <label className={styles.label}>{t('admin.settings.schoolInfo.logo')}</label>
          <div className={styles.logoUpload}>
            <div className={styles.logoPreview}>🎓</div>
            <div className={styles.logoInfo}>
              <Button variant="secondary" size="small">{t('common.edit')}</Button>
              <p className={styles.logoHint}>PNG, JPG up to 2MB</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderAcademicYear = () => (
    <Card>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <span className={styles.cardIcon}>📅</span>
          {t('admin.settings.tabs.academicYear')} 2025-2026
        </h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formGrid}>
          <Input
            label={t('admin.settings.academicYear.startDate')}
            type="date"
            defaultValue="2025-09-01"
            fullWidth
            required
          />
          <Input
            label={t('admin.settings.academicYear.endDate')}
            type="date"
            defaultValue="2026-06-30"
            fullWidth
            required
          />
        </div>

        <div className={styles.semesterSection}>
          <h4 className={styles.sectionTitle}>{t('admin.settings.academicYear.semesters')}</h4>
          <div className={styles.semesterList}>
            <div className={styles.semesterItem}>
              <span className={styles.semesterIcon}>📚</span>
              <div className={styles.semesterInfo}>
                <div className={styles.semesterName}>第一学期</div>
                <div className={styles.semesterDate}>2025/09/01 - 2026/01/31</div>
              </div>
              <Button variant="ghost" size="small">{t('common.edit')}</Button>
            </div>
            <div className={styles.semesterItem}>
              <span className={styles.semesterIcon}>📚</span>
              <div className={styles.semesterInfo}>
                <div className={styles.semesterName}>第二学期</div>
                <div className={styles.semesterDate}>2026/02/01 - 2026/06/30</div>
              </div>
              <Button variant="ghost" size="small">{t('common.edit')}</Button>
            </div>
          </div>
        </div>

        <div className={styles.holidaySection}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>{t('admin.settings.academicYear.holidays')}</h4>
            <Button variant="secondary" size="small">+ {t('common.add')}</Button>
          </div>
          <div className={styles.holidayList}>
            <div className={styles.holidayItem}>
              <span>🏖️</span>
              <span>寒假</span>
              <span className={styles.holidayDate}>2026/01/15 - 2026/02/15</span>
              <Button variant="ghost" size="small">✏️</Button>
            </div>
            <div className={styles.holidayItem}>
              <span>☀️</span>
              <span>暑假</span>
              <span className={styles.holidayDate}>2026/07/01 - 2026/08/31</span>
              <Button variant="ghost" size="small">✏️</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderSecurity = () => (
    <Card>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <span className={styles.cardIcon}>🔒</span>
          {t('admin.settings.tabs.security')}
        </h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.settingsList}>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <span className={styles.settingIcon}>🔑</span>
                {t('admin.settings.security.passwordPolicy')}
              </div>
              <div className={styles.settingValue}>最少8位，包含字母数字</div>
            </div>
            <Button variant="ghost" size="small">{t('common.edit')}</Button>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <span className={styles.settingIcon}>🛡️</span>
                {t('admin.settings.security.twoFactor')}
              </div>
              <div className={styles.settingValue}>管理员强制开启</div>
            </div>
            <Button variant="ghost" size="small">{t('common.edit')}</Button>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <span className={styles.settingIcon}>⏱️</span>
                {t('admin.settings.security.sessionTimeout')}
              </div>
              <div className={styles.settingValue}>30分钟无操作自动登出</div>
            </div>
            <Button variant="ghost" size="small">{t('common.edit')}</Button>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <span className={styles.settingIcon}>🌐</span>
                {t('admin.settings.security.ipWhitelist')}
              </div>
              <div className={styles.settingValue}>已启用（3个IP）</div>
            </div>
            <Button variant="ghost" size="small">{t('common.edit')}</Button>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <span className={styles.settingIcon}>🚫</span>
                {t('admin.settings.security.loginLockout')}
              </div>
              <div className={styles.settingValue}>5次失败锁定30分钟</div>
            </div>
            <Button variant="ghost" size="small">{t('common.edit')}</Button>
          </div>
        </div>

        <div className={styles.backupSection}>
          <h4 className={styles.sectionTitle}>{t('admin.settings.security.backup')}</h4>
          <div className={styles.backupInfo}>
            <div className={styles.backupStats}>
              <div className={styles.backupStat}>
                <span className={styles.backupStatIcon}>⚡</span>
                <div>
                  <div className={styles.backupStatLabel}>{t('admin.settings.security.autoBackup')}</div>
                  <div className={styles.backupStatValue}>每日凌晨3点</div>
                </div>
              </div>
              <div className={styles.backupStat}>
                <span className={styles.backupStatIcon}>📦</span>
                <div>
                  <div className={styles.backupStatLabel}>备份保留</div>
                  <div className={styles.backupStatValue}>30天</div>
                </div>
              </div>
              <div className={styles.backupStat}>
                <span className={styles.backupStatIcon}>✓</span>
                <div>
                  <div className={styles.backupStatLabel}>最近备份</div>
                  <div className={styles.backupStatValue}>2025/10/20 03:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.backupActions}>
            <Button variant="primary">{t('admin.settings.security.backupNow')}</Button>
            <Button variant="secondary">{t('admin.settings.security.restore')}</Button>
            <Button variant="ghost">{t('admin.settings.security.viewHistory') || '查看历史'}</Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderIntegration = () => (
    <Card>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <span className={styles.cardIcon}>🔗</span>
          {t('admin.settings.tabs.integration')}
        </h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.integrationList}>
          <div className={styles.integrationItem}>
            <div className={styles.integrationIcon} style={{ background: '#4F7FFF20' }}>
              🔵
            </div>
            <div className={styles.integrationInfo}>
              <div className={styles.integrationName}>{t('admin.settings.integration.googleWorkspace')}</div>
              <div className={styles.integrationStatus}>
                <span className={styles.statusDot} style={{ background: 'var(--success-green)' }}></span>
                {t('admin.settings.integration.connected')}
              </div>
            </div>
            <div className={styles.integrationActions}>
              <Button variant="ghost" size="small">{t('admin.settings.integration.test')}</Button>
              <Button variant="secondary" size="small">{t('admin.settings.integration.disconnect')}</Button>
            </div>
          </div>

          <div className={styles.integrationItem}>
            <div className={styles.integrationIcon} style={{ background: '#13C2C220' }}>
              🟦
            </div>
            <div className={styles.integrationInfo}>
              <div className={styles.integrationName}>{t('admin.settings.integration.microsoft365')}</div>
              <div className={styles.integrationStatus} style={{ color: 'var(--gray-500)' }}>
                <span className={styles.statusDot} style={{ background: 'var(--gray-400)' }}></span>
                {t('admin.settings.integration.notConnected')}
              </div>
            </div>
            <div className={styles.integrationActions}>
              <Button variant="primary" size="small">{t('admin.settings.integration.connect')}</Button>
            </div>
          </div>

          <div className={styles.integrationItem}>
            <div className={styles.integrationIcon} style={{ background: '#52C41A20' }}>
              💬
            </div>
            <div className={styles.integrationInfo}>
              <div className={styles.integrationName}>{t('admin.settings.integration.smsGateway')}</div>
              <div className={styles.integrationStatus}>
                <span className={styles.statusDot} style={{ background: 'var(--success-green)' }}></span>
                {t('admin.settings.integration.connected')}
              </div>
            </div>
            <div className={styles.integrationActions}>
              <Button variant="ghost" size="small">{t('admin.settings.integration.test')}</Button>
              <Button variant="ghost" size="small">{t('admin.settings.integration.configure')}</Button>
            </div>
          </div>

          <div className={styles.integrationItem}>
            <div className={styles.integrationIcon} style={{ background: '#9254DE20' }}>
              📧
            </div>
            <div className={styles.integrationInfo}>
              <div className={styles.integrationName}>{t('admin.settings.integration.emailService')}</div>
              <div className={styles.integrationStatus}>
                <span className={styles.statusDot} style={{ background: 'var(--success-green)' }}></span>
                {t('admin.settings.integration.connected')}
              </div>
            </div>
            <div className={styles.integrationActions}>
              <Button variant="ghost" size="small">{t('admin.settings.integration.test')}</Button>
              <Button variant="ghost" size="small">{t('admin.settings.integration.configure')}</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('admin.settings.title')}</h1>
          <p className={styles.subtitle}>{t('admin.settings.subtitle')}</p>
        </div>
        <Button variant="primary">
          <span>💾</span> {t('common.save')}
        </Button>
      </div>

      <TabNav
        tabs={[
          { id: 'school', label: t('admin.settings.tabs.schoolInfo'), icon: '🏫' },
          { id: 'academic', label: t('admin.settings.tabs.academicYear'), icon: '📅' },
          { id: 'security', label: t('admin.settings.tabs.security'), icon: '🔒' },
          { id: 'integration', label: t('admin.settings.tabs.integration'), icon: '🔗' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className={styles.tabContent} key={activeTab}>
        {renderTabContent()}
      </div>
    </div>
  );
}
