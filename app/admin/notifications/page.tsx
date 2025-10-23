'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TabNav from '../../components/ui/TabNav';
import styles from './notifications.module.css';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = React.useState('history');

  // Notification History Data
  const notificationHistory = [
    {
      id: 1,
      time: '2025/10/18 14:30',
      title: '本周五家长会通知',
      target: '所有家长（9-12年级）',
      priority: 'important',
      sender: '张校长',
      sent: 450,
      failed: 2,
      readRate: '78%',
      read: 351,
    },
    {
      id: 2,
      time: '2025/10/17 09:15',
      title: '假期安排通知',
      target: '全校师生家长',
      priority: 'normal',
      sender: '张校长',
      sent: 3200,
      failed: 5,
      readRate: '85%',
      read: 2720,
    },
    {
      id: 3,
      time: '2025/10/16 16:20',
      title: '紧急停课通知',
      target: '全校',
      priority: 'urgent',
      sender: '张校长',
      sent: 3215,
      failed: 0,
      readRate: '95%',
      read: 3054,
    },
  ];

  // Templates Data
  const templates = [
    {
      id: 1,
      name: '紧急警报模板',
      nameEn: 'Emergency Alert',
      usage: '突发事件、安全通知',
      icon: '🚨',
      color: '#FF4D4F',
    },
    {
      id: 2,
      name: '停课通知模板',
      nameEn: 'Class Suspension',
      usage: '恶劣天气、特殊情况',
      icon: '❄️',
      color: '#13C2C2',
    },
    {
      id: 3,
      name: '家长会通知模板',
      nameEn: 'Parent Meeting',
      usage: '定期家长会',
      icon: '👨‍👩‍👧',
      color: '#9254DE',
    },
    {
      id: 4,
      name: '活动公告模板',
      nameEn: 'Event Announcement',
      usage: '学校活动、比赛',
      icon: '🎉',
      color: '#FAAD14',
    },
    {
      id: 5,
      name: '假期通知模板',
      nameEn: 'Holiday Notice',
      usage: '节假日安排',
      icon: '🏖️',
      color: '#52C41A',
    },
    {
      id: 6,
      name: '成绩单发布模板',
      nameEn: 'Report Card',
      usage: '学期成绩通知',
      icon: '📊',
      color: '#4F7FFF',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#FF4D4F';
      case 'important':
        return '#FAAD14';
      default:
        return '#4F7FFF';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '🔴 紧急';
      case 'important':
        return '🟡 重要';
      default:
        return '🔵 普通';
    }
  };

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>群发通知 / Mass Notifications</h1>
          <p className={styles.subtitle}>发送通知给教师、学生、家长</p>
        </div>
        <Link href="/admin/notifications/create">
          <Button variant="primary" size="large">
            <span>✉️</span> 创建新通知
          </Button>
        </Link>
      </div>

      <TabNav
        tabs={[
          { id: 'history', label: '通知历史', icon: '📋' },
          { id: 'templates', label: '通知模板', icon: '📝' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'history' && (
        <section className={styles.section}>
          <div className={styles.filters}>
            <select className={styles.filterSelect}>
              <option>所有时间</option>
              <option>今天</option>
              <option>最近7天</option>
              <option>最近30天</option>
            </select>
            <select className={styles.filterSelect}>
              <option>所有优先级</option>
              <option>紧急</option>
              <option>重要</option>
              <option>普通</option>
            </select>
            <select className={styles.filterSelect}>
              <option>所有对象</option>
              <option>教师</option>
              <option>学生</option>
              <option>家长</option>
            </select>
          </div>

          <Card>
            <div className={styles.notificationList}>
              {notificationHistory.map((notification) => (
                <div key={notification.id} className={styles.notificationItem}>
                  <div
                    className={styles.notificationPriority}
                    style={{
                      background: `${getPriorityColor(notification.priority)}20`,
                      color: getPriorityColor(notification.priority),
                    }}
                  >
                    {getPriorityLabel(notification.priority)}
                  </div>

                  <div className={styles.notificationContent}>
                    <div className={styles.notificationMain}>
                      <h3 className={styles.notificationTitle}>
                        {notification.title}
                      </h3>
                      <div className={styles.notificationMeta}>
                        <span className={styles.metaItem}>
                          <span>🕐</span> {notification.time}
                        </span>
                        <span className={styles.metaItem}>
                          <span>👤</span> {notification.sender}
                        </span>
                        <span className={styles.metaItem}>
                          <span>👥</span> {notification.target}
                        </span>
                      </div>
                    </div>

                    <div className={styles.notificationStats}>
                      <div className={styles.stat}>
                        <div className={styles.statLabel}>已送达</div>
                        <div className={styles.statValue}>
                          {notification.sent}
                          {notification.failed > 0 && (
                            <span className={styles.statFailed}>
                              失败 {notification.failed}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={styles.stat}>
                        <div className={styles.statLabel}>阅读率</div>
                        <div className={styles.statValue}>
                          {notification.readRate}
                          <span className={styles.statDetail}>
                            {notification.read}/{notification.sent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.notificationActions}>
                    <Button variant="ghost" size="small">
                      查看详情
                    </Button>
                    <Button variant="ghost" size="small">
                      再次发送
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {activeTab === 'templates' && (
        <section className={styles.section}>
          <div className={styles.templatesGrid}>
            {templates.map((template) => (
              <Card key={template.id} className={styles.templateCard} hover>
                <div
                  className={styles.templateIcon}
                  style={{ background: `${template.color}20`, color: template.color }}
                >
                  {template.icon}
                </div>
                <div className={styles.templateContent}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <p className={styles.templateNameEn}>{template.nameEn}</p>
                  <p className={styles.templateUsage}>适用：{template.usage}</p>
                </div>
                <div className={styles.templateActions}>
                  <Button variant="primary" size="small" fullWidth>
                    使用模板
                  </Button>
                  <div className={styles.templateSecondaryActions}>
                    <button className={styles.secondaryAction}>编辑</button>
                    <button className={styles.secondaryAction}>预览</button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Add New Template Card */}
            <Card className={styles.templateCard} hover>
              <div className={styles.addTemplateCard}>
                <div className={styles.addTemplateIcon}>➕</div>
                <h3 className={styles.addTemplateTitle}>创建新模板</h3>
                <p className={styles.addTemplateSubtitle}>保存常用通知为模板</p>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

