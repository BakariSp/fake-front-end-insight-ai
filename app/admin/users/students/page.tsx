'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Tabs from '../../../components/ui/Tabs';
import styles from '../users.module.css';

export default function StudentsPage() {
  const router = useRouter();

  const students = [
    {
      id: 1,
      studentId: '2025001',
      name: '张小明',
      grade: '6年级',
      class: 'A班',
      parent: '张先生',
      parentPhone: '138-xxxx-1234',
      status: '在校',
      avatar: '👨‍🎓',
    },
    {
      id: 2,
      studentId: '2025002',
      name: '李小红',
      grade: '6年级',
      class: 'A班',
      parent: '李女士',
      parentPhone: '139-xxxx-2345',
      status: '在校',
      avatar: '👩‍🎓',
    },
    {
      id: 3,
      studentId: '2025003',
      name: '王小强',
      grade: '7年级',
      class: 'B班',
      parent: '王先生',
      parentPhone: '137-xxxx-3456',
      status: '在校',
      avatar: '👨‍🎓',
    },
  ];

  const stats = [
    { label: '学生总数', value: '1,245', color: '#4F7FFF' },
    { label: '在校', value: '1,238', color: '#52C41A' },
    { label: '休学', value: '5', color: '#FAAD14' },
    { label: '转学', value: '2', color: '#8C8C8C' },
  ];

  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>学生管理 / Student Management</h1>
          <p className={styles.subtitle}>管理学生基本信息和班级分配</p>
        </div>
        <Button variant="primary">
          <span>➕</span> 注册新学生
        </Button>
      </div>

      <Tabs
        tabs={[
          { id: 'teachers', label: '教师管理', icon: '👨‍🏫', href: '/admin/users/teachers' },
          { id: 'students', label: '学生管理', icon: '👨‍🎓', href: '/admin/users/students' },
          { id: 'parents', label: '家长管理', icon: '👪', href: '/admin/users/parents' },
        ]}
        activeTab="students"
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
          placeholder="搜索学生姓名或学号..."
          className={styles.searchInput}
        />
        <select className={styles.filterSelect}>
          <option>所有年级</option>
          <option>K-2年级</option>
          <option>3-5年级</option>
          <option>6-8年级</option>
          <option>9-12年级</option>
        </select>
        <select className={styles.filterSelect}>
          <option>所有班级</option>
          <option>A班</option>
          <option>B班</option>
          <option>C班</option>
        </select>
        <select className={styles.filterSelect}>
          <option>所有状态</option>
          <option>在校</option>
          <option>休学</option>
          <option>转学</option>
        </select>
        <Button variant="secondary">
          <span>📤</span> 导出列表
        </Button>
        <Button variant="secondary">
          <span>📥</span> 批量导入
        </Button>
      </div>

      {/* Students Table */}
      <Card>
        <div className={styles.userTable}>
          <table>
            <thead>
              <tr>
                <th>学号</th>
                <th>姓名</th>
                <th>年级/班级</th>
                <th>家长联系</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className={styles.idCell}>{student.studentId}</td>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatar}>{student.avatar}</div>
                      <span className={styles.userName}>{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.gradeCell}>
                      <span>{student.grade}</span>
                      <span className={styles.classTag}>{student.class}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.parentCell}>
                      <span className={styles.parentName}>{student.parent}</span>
                      <span className={styles.phoneCell}>{student.parentPhone}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={styles.statusTag}
                      style={{
                        background:
                          student.status === '在校'
                            ? '#52C41A20'
                            : student.status === '休学'
                            ? '#FAAD1420'
                            : '#8C8C8C20',
                        color:
                          student.status === '在校'
                            ? '#52C41A'
                            : student.status === '休学'
                            ? '#FAAD14'
                            : '#8C8C8C',
                      }}
                    >
                      {student.status}
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

