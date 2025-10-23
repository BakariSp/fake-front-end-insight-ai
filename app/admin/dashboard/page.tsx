'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import styles from './dashboard.module.css';

interface StatCardProps {
  icon: string;
  titleKey: string;
  value: string;
  subtitle: string;
  trend?: string;
  color: string;
}

function StatCard({ icon, titleKey, value, subtitle, trend, color }: StatCardProps) {
  const { t } = useLanguage();
  return (
    <Card className={styles.statCard} style={{ borderLeft: `4px solid ${color}` }}>
      <div className={styles.statIcon} style={{ background: `${color}20` }}>
        {icon}
      </div>
      <div className={styles.statContent}>
        <div className={styles.statTitle}>
          {t(titleKey)}
        </div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statSubtitle}>
          {subtitle}
          {trend && <span className={styles.statTrend}>{trend}</span>}
        </div>
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const { t } = useLanguage();
  
  // Quick Stats Data
  const stats = [
    {
      icon: '👨‍🎓',
      titleKey: 'admin.dashboard.stats.totalStudents',
      value: '1,245',
      subtitle: t('admin.dashboard.stats.totalStudents') + ' (K-12)',
      color: '#4F7FFF',
    },
    {
      icon: '👨‍🏫',
      titleKey: 'admin.dashboard.stats.totalTeachers',
      value: '82',
      subtitle: t('admin.common.active'),
      color: '#52C41A',
    },
    {
      icon: '👪',
      titleKey: 'admin.dashboard.stats.totalParents',
      value: '1,890',
      subtitle: t('admin.dashboard.stats.totalParents'),
      color: '#9254DE',
    },
    {
      icon: '🏫',
      titleKey: 'admin.dashboard.stats.activeClasses',
      value: '45',
      subtitle: t('admin.dashboard.stats.activeClasses'),
      color: '#13C2C2',
    },
    {
      icon: '📋',
      titleKey: 'admin.dashboard.stats.pendingTasks',
      value: '5',
      subtitle: t('admin.dashboard.stats.pendingTasks'),
      trend: t('common.all'),
      color: '#FAAD14',
    },
    {
      icon: '💬',
      titleKey: 'admin.dashboard.stats.unreadMessages',
      value: '12',
      subtitle: t('admin.dashboard.stats.unreadMessages'),
      trend: t('common.all'),
      color: '#FF4D4F',
    },
  ];

  // Recent Activities Data
  const recentActivities = [
    {
      type: 'notification',
      icon: '🔔',
      title: '发送了群发通知',
      content: '本周五家长会通知',
      time: '2小时前',
      color: '#4F7FFF',
    },
    {
      type: 'user',
      icon: '👥',
      title: '添加了新用户',
      content: '王老师 (数学教师)',
      time: '5小时前',
      color: '#52C41A',
    },
    {
      type: 'notification',
      icon: '🔔',
      title: '发送了群发通知',
      content: '假期安排通知',
      time: '昨天',
      color: '#4F7FFF',
    },
  ];

  // Grade Overview Data
  const gradeOverview = [
    {
      grade: 'K-2年级',
      classes: 12,
      students: 360,
      attendance: '95.2%',
      trend: '↑ 0.5%',
      trendColor: '#52C41A',
    },
    {
      grade: '3-5年级',
      classes: 12,
      students: 348,
      attendance: '94.8%',
      trend: '↓ 0.3%',
      trendColor: '#FF4D4F',
    },
    {
      grade: '6-8年级',
      classes: 12,
      students: 432,
      attendance: '93.5%',
      trend: '↓ 0.8%',
      trendColor: '#FF4D4F',
    },
    {
      grade: '9-12年级',
      classes: 9,
      students: 285,
      attendance: '92.1%',
      trend: '↓ 1.2%',
      trendColor: '#FF4D4F',
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('admin.dashboard.title')}</h1>
          <p className={styles.subtitle}>{t('admin.dashboard.welcome')}, 张校长 👋</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary">
            <span>📊</span> {t('admin.dashboard.quickAction.viewReports')}
          </Button>
          <Link href="/admin/notifications/create">
            <Button variant="primary">
              <span>🔔</span> {t('admin.dashboard.quickAction.sendNotification')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('admin.dashboard.quickStats')}</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('admin.dashboard.quickActions')}</h2>
        <div className={styles.quickActionsGrid}>
          <Link href="/admin/notifications/create">
            <Card className={styles.quickAction} hover>
              <div className={styles.quickActionIcon} style={{ background: '#4F7FFF20' }}>
                🔔
              </div>
              <div className={styles.quickActionContent}>
                <div className={styles.quickActionTitle}>{t('admin.dashboard.quickAction.sendNotification')}</div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/permissions">
            <Card className={styles.quickAction} hover>
              <div className={styles.quickActionIcon} style={{ background: '#9254DE20' }}>
                🔐
              </div>
              <div className={styles.quickActionContent}>
                <div className={styles.quickActionTitle}>{t('admin.dashboard.quickAction.managePermissions')}</div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/reports">
            <Card className={styles.quickAction} hover>
              <div className={styles.quickActionIcon} style={{ background: '#52C41A20' }}>
                📊
              </div>
              <div className={styles.quickActionContent}>
                <div className={styles.quickActionTitle}>{t('admin.dashboard.quickAction.viewReports')}</div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className={styles.quickAction} hover>
              <div className={styles.quickActionIcon} style={{ background: '#13C2C220' }}>
                ➕
              </div>
              <div className={styles.quickActionContent}>
                <div className={styles.quickActionTitle}>{t('admin.dashboard.quickAction.addUser')}</div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      <div className={styles.twoColumnLayout}>
        {/* Recent Activities */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('admin.dashboard.recentActivities')}</h2>
          <Card>
            <div className={styles.activities}>
              {recentActivities.map((activity, index) => (
                <div key={index} className={styles.activity}>
                  <div
                    className={styles.activityIcon}
                    style={{ background: `${activity.color}20`, color: activity.color }}
                  >
                    {activity.icon}
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>{activity.title}</div>
                    <div className={styles.activityDescription}>{activity.content}</div>
                  </div>
                  <div className={styles.activityTime}>{activity.time}</div>
                </div>
              ))}
              <Link href="/admin/activities" className={styles.viewMore}>
                查看全部活动 →
              </Link>
            </div>
          </Card>
        </section>

        {/* System Alerts */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('admin.dashboard.systemAlerts')}</h2>
          <Card>
            <div className={styles.alerts}>
              <div className={styles.alert} style={{ borderLeftColor: '#FF4D4F' }}>
                <div className={styles.alertIcon}>🔴</div>
                <div className={styles.alertContent}>
                  <div className={styles.alertTitle}>9-12年级出勤率下降</div>
                  <div className={styles.alertDescription}>
                    最近一周出勤率持续下降，建议关注
                  </div>
                </div>
              </div>
              <div className={styles.alert} style={{ borderLeftColor: '#FAAD14' }}>
                <div className={styles.alertIcon}>🟡</div>
                <div className={styles.alertContent}>
                  <div className={styles.alertTitle}>家长参与度需提升</div>
                  <div className={styles.alertDescription}>
                    6-8年级家长参与度较低
                  </div>
                </div>
              </div>
              <div className={styles.alert} style={{ borderLeftColor: '#52C41A' }}>
                <div className={styles.alertIcon}>🟢</div>
                <div className={styles.alertContent}>
                  <div className={styles.alertTitle}>系统运行正常</div>
                  <div className={styles.alertDescription}>
                    所有服务运行稳定
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Grade Overview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('admin.dashboard.gradeOverview')}</h2>
        <Card>
          <div className={styles.gradeTable}>
            <table>
              <thead>
                <tr>
                  <th>年级 / Grade</th>
                  <th>班级数 / Classes</th>
                  <th>学生数 / Students</th>
                  <th>平均出勤率 / Attendance</th>
                  <th>操作 / Actions</th>
                </tr>
              </thead>
              <tbody>
                {gradeOverview.map((grade, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.gradeCell}>
                        <span className={styles.gradeIcon}>🎓</span>
                        <span className={styles.gradeName}>{grade.grade}</span>
                      </div>
                    </td>
                    <td>{grade.classes} 个班级</td>
                    <td>{grade.students} 名学生</td>
                    <td>
                      <div className={styles.attendanceCell}>
                        <span className={styles.attendanceValue}>{grade.attendance}</span>
                        <span
                          className={styles.attendanceTrend}
                          style={{ color: grade.trendColor }}
                        >
                          {grade.trend}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Link href={`/admin/classes?grade=${index}`}>
                        <Button variant="ghost" size="small">
                          查看详情 →
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

