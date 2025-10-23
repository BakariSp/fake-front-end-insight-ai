'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import styles from './create.module.css';

export default function CreateNotificationPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    title: '',
    priority: 'normal',
    content: '',
    attachments: [],
    channels: ['app'],
    sendTime: 'now',
    scheduledTime: '',
  });

  const [targetSelection, setTargetSelection] = React.useState({
    roles: [] as string[],
    grades: [] as string[],
    classes: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert('通知已发送！');
    router.push('/admin/notifications');
  };

  const handleRoleToggle = (role: string) => {
    setTargetSelection((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleGradeToggle = (grade: string) => {
    setTargetSelection((prev) => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter((g) => g !== grade)
        : [...prev.grades, grade],
    }));
  };

  return (
    <div className={styles.createPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>创建通知 / Create Notification</h1>
          <p className={styles.subtitle}>向目标用户发送通知</p>
        </div>
        <Button variant="ghost" onClick={() => router.back()}>
          ← 返回
        </Button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.mainContent}>
          {/* Basic Info */}
          <Card>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>基本信息 / Basic Information</h2>
            </div>
            <div className={styles.cardContent}>
              <Input
                label="通知标题 / Title *"
                placeholder="例如：本周五家长会通知"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
                required
              />

              <div className={styles.formGroup}>
                <label className={styles.label}>优先级 / Priority *</label>
                <div className={styles.priorityOptions}>
                  {[
                    { value: 'urgent', label: '🔴 紧急', color: '#FF4D4F' },
                    { value: 'important', label: '🟡 重要', color: '#FAAD14' },
                    { value: 'normal', label: '🔵 普通', color: '#4F7FFF' },
                    { value: 'info', label: '⚪ 信息', color: '#8C8C8C' },
                  ].map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      className={`${styles.priorityOption} ${formData.priority === priority.value ? styles.priorityOptionActive : ''}`}
                      style={{
                        borderColor:
                          formData.priority === priority.value ? priority.color : undefined,
                        background:
                          formData.priority === priority.value
                            ? `${priority.color}20`
                            : undefined,
                      }}
                      onClick={() => setFormData({ ...formData, priority: priority.value })}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>通知内容 / Content *</label>
                <textarea
                  className={styles.textarea}
                  placeholder="请输入通知内容..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
                <div className={styles.aiAssist}>
                  <button type="button" className={styles.aiButton}>
                    🤖 AI内容建议
                  </button>
                  <button type="button" className={styles.aiButton}>
                    🌐 自动翻译
                  </button>
                  <button type="button" className={styles.aiButton}>
                    ✅ 语法检查
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>附件 / Attachments</label>
                <div className={styles.uploadArea}>
                  <div className={styles.uploadIcon}>📎</div>
                  <div className={styles.uploadText}>
                    <span>点击上传或拖拽文件到此处</span>
                    <span className={styles.uploadHint}>
                      支持 PDF、图片、文档（最大 10MB）
                    </span>
                  </div>
                  <input type="file" className={styles.fileInput} multiple />
                </div>
              </div>
            </div>
          </Card>

          {/* Target Selection */}
          <Card>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>目标对象 / Target Selection *</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGroup}>
                <label className={styles.label}>按角色选择 / Select by Role</label>
                <div className={styles.checkboxGrid}>
                  {[
                    { value: 'teachers', label: '所有教师', icon: '👨‍🏫' },
                    { value: 'students', label: '所有学生', icon: '👨‍🎓' },
                    { value: 'parents', label: '所有家长', icon: '👪' },
                    { value: 'all', label: '全部用户', icon: '👥' },
                  ].map((role) => (
                    <label key={role.value} className={styles.checkboxOption}>
                      <input
                        type="checkbox"
                        checked={targetSelection.roles.includes(role.value)}
                        onChange={() => handleRoleToggle(role.value)}
                      />
                      <span className={styles.checkboxIcon}>{role.icon}</span>
                      <span>{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>按年级选择 / Select by Grade</label>
                <div className={styles.checkboxGrid}>
                  {[
                    { value: 'k-2', label: 'K-2年级' },
                    { value: '3-5', label: '3-5年级' },
                    { value: '6-8', label: '6-8年级' },
                    { value: '9-12', label: '9-12年级' },
                  ].map((grade) => (
                    <label key={grade.value} className={styles.checkboxOption}>
                      <input
                        type="checkbox"
                        checked={targetSelection.grades.includes(grade.value)}
                        onChange={() => handleGradeToggle(grade.value)}
                      />
                      <span className={styles.checkboxIcon}>🎓</span>
                      <span>{grade.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.selectedSummary}>
                <span className={styles.summaryIcon}>👥</span>
                <span className={styles.summaryText}>
                  预计接收人数：<strong>约 2,500 人</strong>
                </span>
              </div>
            </div>
          </Card>

          {/* Send Options */}
          <Card>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>发送选项 / Send Options</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGroup}>
                <label className={styles.label}>发送渠道 / Channels</label>
                <div className={styles.checkboxGrid}>
                  {[
                    { value: 'app', label: '应用内通知', icon: '📱' },
                    { value: 'email', label: '邮件', icon: '📧' },
                    { value: 'sms', label: '短信', icon: '💬' },
                    { value: 'push', label: '推送通知', icon: '🔔' },
                  ].map((channel) => (
                    <label key={channel.value} className={styles.checkboxOption}>
                      <input type="checkbox" defaultChecked={channel.value === 'app'} />
                      <span className={styles.checkboxIcon}>{channel.icon}</span>
                      <span>{channel.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>发送时间 / Send Time</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="sendTime"
                      value="now"
                      checked={formData.sendTime === 'now'}
                      onChange={(e) =>
                        setFormData({ ...formData, sendTime: e.target.value })
                      }
                    />
                    <span>立即发送</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="sendTime"
                      value="scheduled"
                      checked={formData.sendTime === 'scheduled'}
                      onChange={(e) =>
                        setFormData({ ...formData, sendTime: e.target.value })
                      }
                    />
                    <span>定时发送</span>
                  </label>
                </div>
                {formData.sendTime === 'scheduled' && (
                  <Input
                    type="datetime-local"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledTime: e.target.value })
                    }
                    fullWidth
                  />
                )}
                <div className={styles.aiSuggestion}>
                  <span>💡</span>
                  <span>AI 建议：晚上 7-9 点发送效果最佳（打开率提升 25%）</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className={styles.sidebar}>
          <Card>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>操作 / Actions</h3>
              
              <Button type="submit" variant="primary" fullWidth size="large">
                <span>✉️</span> 立即发送
              </Button>

              <Button type="button" variant="secondary" fullWidth>
                <span>💾</span> 保存草稿
              </Button>

              <Button type="button" variant="ghost" fullWidth>
                <span>👁️</span> 预览通知
              </Button>

              <div className={styles.divider}></div>

              <div className={styles.helpSection}>
                <div className={styles.helpTitle}>💡 发送提示</div>
                <ul className={styles.helpList}>
                  <li>标题简洁明了，控制在 30 字以内</li>
                  <li>紧急通知请选择多个发送渠道</li>
                  <li>晚上 7-9 点是最佳发送时间</li>
                  <li>可使用 AI 辅助优化通知内容</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>快速模板 / Templates</h3>
              <div className={styles.templateList}>
                {[
                  { name: '紧急警报', icon: '🚨' },
                  { name: '家长会', icon: '👨‍👩‍👧' },
                  { name: '假期通知', icon: '🏖️' },
                ].map((template, index) => (
                  <button key={index} type="button" className={styles.templateItem}>
                    <span>{template.icon}</span>
                    <span>{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}

