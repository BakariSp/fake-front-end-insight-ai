'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Tabs from '../../../components/ui/Tabs';
import { useRouter } from 'next/navigation';
import styles from '../users.module.css';

export default function TeachersPage() {
  const router = useRouter();

  const teachers = [
    {
      id: 1,
      name: '王老师',
      email: 'wang@school.edu',
      phone: '138-1234-5678',
      department: '数学',
      subjects: ['数学', '代数'],
      classes: ['6A', '6B', '7A'],
      status: '在职',
      avatar: '👨‍🏫',
    },
    {
      id: 2,
      name: '李老师',
      email: 'li@school.edu',
      phone: '138-2345-6789',
      department: '英语',
      subjects: ['英语'],
      classes: ['9A', '9B'],
      status: '在职',
      avatar: '👩‍🏫',
    },
    {
      id: 3,
      name: '陈老师',
      email: 'chen@school.edu',
      phone: '138-3456-7890',
      department: '科学',
      subjects: ['物理', '化学'],
      classes: ['8A', '8B', '8C'],
      status: '在职',
      avatar: '👨‍🏫',
    },
  ];

  const stats = [
    { label: '教师总数', value: '82', color: '#4F7FFF' },
    { label: '在职', value: '80', color: '#52C41A' },
    { label: '休假', value: '2', color: '#FAAD14' },
    { label: '离职', value: '0', color: '#8C8C8C' },
  ];

  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>教师管理 / Teacher Management</h1>
          <p className={styles.subtitle}>管理教师基本信息和班级分配</p>
        </div>
        <Button variant="primary">
          <span>➕</span> 添加新教师
        </Button>
      </div>

      <Tabs
        tabs={[
          { id: 'teachers', label: '教师管理', icon: '👨‍🏫', href: '/admin/users/teachers' },
          { id: 'students', label: '学生管理', icon: '👨‍🎓', href: '/admin/users/students' },
          { id: 'parents', label: '家长管理', icon: '👪', href: '/admin/users/parents' },
        ]}
        activeTab="teachers"
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
          placeholder="搜索教师姓名或邮箱..."
          className={styles.searchInput}
        />
        <select className={styles.filterSelect}>
          <option>所有部门</option>
          <option>数学</option>
          <option>英语</option>
          <option>科学</option>
          <option>艺术</option>
        </select>
        <select className={styles.filterSelect}>
          <option>所有状态</option>
          <option>在职</option>
          <option>休假</option>
          <option>离职</option>
        </select>
        <Button variant="secondary">
          <span>📤</span> 导出列表
        </Button>
        <Button variant="secondary">
          <span>📥</span> 批量导入
        </Button>
      </div>

      {/* Teachers Table */}
      <Card>
        <div className={styles.userTable}>
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>部门/学科</th>
                <th>教授班级</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatar}>{teacher.avatar}</div>
                      <span className={styles.userName}>{teacher.name}</span>
                    </div>
                  </td>
                  <td>{teacher.email}</td>
                  <td className={styles.phoneCell}>{teacher.phone}</td>
                  <td>
                    <div className={styles.departmentCell}>
                      <span className={styles.department}>{teacher.department}</span>
                      <div className={styles.subjects}>
                        {teacher.subjects.map((subject, idx) => (
                          <span key={idx} className={styles.subjectTag}>
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.classes}>
                      {teacher.classes.map((cls, idx) => (
                        <span key={idx} className={styles.classTag}>
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span
                      className={styles.statusTag}
                      style={{
                        background:
                          teacher.status === '在职'
                            ? '#52C41A20'
                            : teacher.status === '休假'
                            ? '#FAAD1420'
                            : '#8C8C8C20',
                        color:
                          teacher.status === '在职'
                            ? '#52C41A'
                            : teacher.status === '休假'
                            ? '#FAAD14'
                            : '#8C8C8C',
                      }}
                    >
                      {teacher.status}
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
                      <Button variant="ghost" size="small">
                        通知
                      </Button>
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

