'use client';

import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import styles from './classes.module.css';

export default function ClassesPage() {
  const { t } = useLanguage();

  const gradeOverview = [
    {
      grade: t('admin.classes.grades.k2'),
      classes: 12,
      students: 360,
      teachers: 12,
      attendance: '95.2%',
      trend: '↑ 0.5%',
      trendColor: '#52C41A',
    },
    {
      grade: t('admin.classes.grades.3to5'),
      classes: 12,
      students: 348,
      teachers: 14,
      attendance: '94.8%',
      trend: '↓ 0.3%',
      trendColor: '#FF4D4F',
    },
    {
      grade: t('admin.classes.grades.6to8'),
      classes: 12,
      students: 432,
      teachers: 18,
      attendance: '93.5%',
      trend: '↓ 0.8%',
      trendColor: '#FF4D4F',
    },
    {
      grade: t('admin.classes.grades.9to12'),
      classes: 9,
      students: 285,
      teachers: 16,
      attendance: '92.1%',
      trend: '↓ 1.2%',
      trendColor: '#FF4D4F',
    },
  ];

  return (
    <div className={styles.classesPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('admin.classes.title')}</h1>
          <p className={styles.subtitle}>{t('admin.classes.subtitle')}</p>
        </div>
      </div>

      {/* Grade Overview Cards */}
      <div className={styles.gradeGrid}>
        {gradeOverview.map((grade, index) => (
          <Card key={index} className={styles.gradeCard} hover>
            <div className={styles.gradeHeader}>
              <div className={styles.gradeIcon}>🎓</div>
              <h3 className={styles.gradeName}>{grade.grade}</h3>
            </div>
            <div className={styles.gradeStats}>
              <div className={styles.gradeStat}>
                <div className={styles.gradeStatLabel}>{t('admin.classes.stats.classes')}</div>
                <div className={styles.gradeStatValue}>{grade.classes}</div>
              </div>
              <div className={styles.gradeStat}>
                <div className={styles.gradeStatLabel}>{t('admin.classes.stats.students')}</div>
                <div className={styles.gradeStatValue}>{grade.students}</div>
              </div>
              <div className={styles.gradeStat}>
                <div className={styles.gradeStatLabel}>{t('admin.classes.stats.teachers')}</div>
                <div className={styles.gradeStatValue}>{grade.teachers}</div>
              </div>
            </div>
            <div className={styles.attendanceSection}>
              <div className={styles.attendanceLabel}>{t('admin.classes.stats.attendance')}</div>
              <div className={styles.attendanceValue}>
                {grade.attendance}
                <span style={{ color: grade.trendColor }} className={styles.trend}>
                  {grade.trend}
                </span>
              </div>
            </div>
            <Button variant="ghost" fullWidth size="small">
              {t('admin.common.viewDetails')}
            </Button>
          </Card>
        ))}
      </div>

      {/* Class Details Table */}
      <Card className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{t('admin.classes.classDetails')}</h2>
        </div>
        <div className={styles.classTable}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.classes.classInfo.className')}</th>
                <th>{t('admin.classes.classInfo.classTeacher')}</th>
                <th>{t('admin.classes.stats.students')}</th>
                <th>{t('admin.classes.stats.attendance')}</th>
                <th>{t('admin.classes.stats.parentEngagement')}</th>
                <th>{t('admin.common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '6年级 A班', teacher: '王老师', students: 32, attendance: '94.5%', engagement: '85%' },
                { name: '6年级 B班', teacher: '李老师', students: 30, attendance: '95.2%', engagement: '88%' },
                { name: '6年级 C班', teacher: '陈老师', students: 31, attendance: '93.8%', engagement: '82%' },
              ].map((cls, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.classNameCell}>
                      <span className={styles.classIcon}>🏫</span>
                      <span>{cls.name}</span>
                    </div>
                  </td>
                  <td>{cls.teacher}</td>
                  <td>{cls.students}</td>
                  <td>{cls.attendance}</td>
                  <td>{cls.engagement}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Button variant="ghost" size="small">{t('common.view')}</Button>
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

