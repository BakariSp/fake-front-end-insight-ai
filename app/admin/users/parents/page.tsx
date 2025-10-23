'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import TabNav from '../../../components/ui/TabNav';
import styles from '../users.module.css';

export default function ParentsPage() {
  const router = useRouter();

  const parents = [
    {
      id: 1,
      name: '张先生',
      email: 'zhang@example.com',
      phone: '138-1234-5678',
      children: ['张小明（6A）'],
      lastLogin: '2025/10/17',
      avatar: '👨',
    },
    {
      id: 2,
      name: '李女士',
      email: 'li@example.com',
      phone: '139-1234-5678',
      children: ['李小红（6A）', '李小刚（8B）'],
      lastLogin: '2025/10/18',
      avatar: '👩',
    },
    {
      id: 3,
      name: '王先生',
      email: 'wang@example.com',
      phone: '137-1234-5678',
      children: ['王小强（7B）'],
      lastLogin: '从未登录',
      avatar: '👨',
    },
  ];

  const stats = [
    { label: '家长总数', value: '1,890', color: '#9254DE' },
    { label: '已激活', value: '1,456', color: '#52C41A' },
    { label: '未激活', value: '434', color: '#FAAD14' },
    { label: '多子女', value: '320', color: '#4F7FFF' },
  ];

  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>家长管理 / Parent Management</h1>
          <p className={styles.subtitle}>管理家长账号和子女关联</p>
        </div>
        <Button variant="primary">
          <span>➕</span> 添加家长
        </Button>
      </div>

      <TabNav
        tabs={[
          { id: 'teachers', label: '教师管理', icon: '👨‍🏫', href: '/admin/users/teachers' },
          { id: 'students', label: '学生管理', icon: '👨‍🎓', href: '/admin/users/students' },
          { id: 'parents', label: '家长管理', icon: '👪', href: '/admin/users/parents' },
        ]}
        activeTab="parents"
        onChange={(tab) => router.push(`/admin/users/${tab}`)}
      />

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} className={styles.statCard}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue} style={{ color: stat.color }}>
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="搜索家长姓名、邮箱或电话..."
          className={styles.searchInput}
        />
        <select className={styles.filterSelect}>
          <option>所有年级（子女）</option>
          <option>K-2年级</option>
          <option>3-5年级</option>
          <option>6-8年级</option>
          <option>9-12年级</option>
        </select>
        <select className={styles.filterSelect}>
          <option>登录状态</option>
          <option>已登录</option>
          <option>从未登录</option>
        </select>
        <Button variant="secondary">
          <span>📧</span> 批量发送登录信息
        </Button>
        <Button variant="secondary">
          <span>📤</span> 导出列表
        </Button>
      </div>

      {/* Parents Table */}
      <Card>
        <div className={styles.userTable}>
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>子女</th>
                <th>最后登录</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent) => (
                <tr key={parent.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatar}>{parent.avatar}</div>
                      <span className={styles.userName}>{parent.name}</span>
                    </div>
                  </td>
                  <td>{parent.email}</td>
                  <td className={styles.phoneCell}>{parent.phone}</td>
                  <td>
                    <div className={styles.childrenCell}>
                      {parent.children.map((child, idx) => (
                        <span key={idx} className={styles.childTag}>
                          {child}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span
                      className={
                        parent.lastLogin === '从未登录'
                          ? styles.neverLogin
                          : styles.dateCell
                      }
                    >
                      {parent.lastLogin}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Button variant="ghost" size="small">
                        查看
                      </Button>
                      <Button variant="ghost" size="small">
                        编辑
                      </Button>
                      {parent.lastLogin === '从未登录' && (
                        <Button variant="ghost" size="small">
                          发送登录信息
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

