'use client';

import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TabNav from '../../components/ui/TabNav';
import styles from './reports.module.css';

export default function ReportsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('notifications');

  return (
    <div className={styles.reportsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('admin.reports.title')}</h1>
          <p className={styles.subtitle}>{t('admin.reports.subtitle')}</p>
        </div>
        <Button variant="primary">
          <span>📤</span> {t('admin.reports.statistics.exportReport')}
        </Button>
      </div>

      <TabNav
        tabs={[
          { id: 'notifications', label: t('admin.reports.notificationReports'), icon: '🔔' },
          { id: 'users', label: t('admin.reports.userActivity'), icon: '👥' },
          { id: 'statistics', label: t('admin.reports.statisticsOverview'), icon: '📊' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'notifications' && (
        <div className={styles.tabContent}>
          {/* Notification Stats */}
          <div className={styles.statsGrid}>
            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#4F7FFF20', color: '#4F7FFF' }}>
                📨
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.reports.notifications.sentCount')}</div>
                <div className={styles.statValue}>45</div>
                <div className={styles.statTrend} style={{ color: '#52C41A' }}>↑ 18%</div>
              </div>
            </Card>

            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#52C41A20', color: '#52C41A' }}>
                ✉️
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.reports.notifications.deliveryCount')}</div>
                <div className={styles.statValue}>12,340</div>
                <div className={styles.statTrend} style={{ color: '#52C41A' }}>↑ 17%</div>
              </div>
            </Card>

            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#9254DE20', color: '#9254DE' }}>
                👀
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.reports.notifications.openRate')}</div>
                <div className={styles.statValue}>76%</div>
                <div className={styles.statTrend} style={{ color: '#52C41A' }}>↑ 4%</div>
              </div>
            </Card>

            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#13C2C220', color: '#13C2C2' }}>
                💬
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.reports.notifications.responseRate')}</div>
                <div className={styles.statValue}>32%</div>
                <div className={styles.statTrend} style={{ color: '#52C41A' }}>↑ 4%</div>
              </div>
            </Card>
          </div>

          {/* Chart Placeholder */}
          <Card className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('admin.reports.notifications.trends')}</h3>
            </div>
            <div className={styles.chartPlaceholder}>
              <div className={styles.chartIcon}>📊</div>
              <p className={styles.chartText}>{t('admin.reports.notifications.effectiveness')}</p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <div className={styles.tabContent}>
          {/* User Activity Stats */}
          <div className={styles.statsGrid}>
            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#4F7FFF20', color: '#4F7FFF' }}>
                👨‍🏫
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.users.teachers.stats.total')}</div>
                <div className={styles.statValue}>82</div>
                <div className={styles.statSubtext}>{t('admin.reports.userActivity.activeRate')}: 97.6%</div>
              </div>
            </Card>

            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#52C41A20', color: '#52C41A' }}>
                👨‍🎓
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.users.students.stats.total')}</div>
                <div className={styles.statValue}>1,245</div>
                <div className={styles.statSubtext}>{t('admin.reports.userActivity.activeRate')}: 88.5%</div>
              </div>
            </Card>

            <Card className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#9254DE20', color: '#9254DE' }}>
                👪
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('admin.users.parents.stats.total')}</div>
                <div className={styles.statValue}>1,890</div>
                <div className={styles.statSubtext}>{t('admin.reports.userActivity.activeRate')}: 77.0%</div>
              </div>
            </Card>
          </div>

          {/* Activity Chart */}
          <Card className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t('admin.reports.userActivity.dailyActive')}</h3>
            </div>
            <div className={styles.chartPlaceholder}>
              <div className={styles.chartIcon}>📈</div>
              <p className={styles.chartText}>{t('admin.reports.userActivity.moduleUsage')}</p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className={styles.tabContent}>
          <div className={styles.overviewSection}>
            <Card className={styles.overviewCard}>
              <div className={styles.overviewHeader}>
                <h3>{t('admin.reports.statistics.userStats')}</h3>
              </div>
              <div className={styles.overviewGrid}>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.users.students.stats.total')}</div>
                  <div className={styles.overviewValue}>1,245</div>
                </div>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.users.teachers.stats.total')}</div>
                  <div className={styles.overviewValue}>82</div>
                </div>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.users.parents.stats.total')}</div>
                  <div className={styles.overviewValue}>1,890</div>
                </div>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.dashboard.stats.activeClasses')}</div>
                  <div className={styles.overviewValue}>45</div>
                </div>
              </div>
            </Card>

            <Card className={styles.overviewCard}>
              <div className={styles.overviewHeader}>
                <h3>{t('admin.reports.statistics.monthlyData')}</h3>
              </div>
              <div className={styles.overviewGrid}>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.classes.stats.attendance')}</div>
                  <div className={styles.overviewValue}>93.9%</div>
                </div>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.classes.stats.parentEngagement')}</div>
                  <div className={styles.overviewValue}>78%</div>
                </div>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>{t('admin.reports.userActivity.activeRate')}</div>
                  <div className={styles.overviewValue}>84.3%</div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className={styles.insightsCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>🤖 {t('admin.reports.statistics.aiInsights')}</h3>
            </div>
            <div className={styles.insightsList}>
              <div className={styles.insightItem}>
                <span className={styles.insightIcon}>🔴</span>
                <span>{t('admin.dashboard.alerts.attendanceDecline')}</span>
              </div>
              <div className={styles.insightItem}>
                <span className={styles.insightIcon}>🟡</span>
                <span>{t('admin.dashboard.alerts.parentEngagement')}</span>
              </div>
              <div className={styles.insightItem}>
                <span className={styles.insightIcon}>🟢</span>
                <span>{t('admin.dashboard.alerts.systemNormal')}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

