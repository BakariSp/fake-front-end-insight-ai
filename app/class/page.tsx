'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MainLayout from '../components/layout/MainLayout';
import { Card, Button, Badge, Select } from '../components/ui';
import { mockClasses } from '../data/mockData';
import { getTranslatedClass } from '../data/mockDataTranslations';
import styles from './classes.module.css';

const ClassesPage = () => {
  const [semester, setSemester] = useState('current');
  const { t, language } = useLanguage();

  const semesters = [
    { value: 'current', label: 'Current Semester (Fall 2025)' },
    { value: 'previous', label: 'Previous Semester (Spring 2025)' },
    { value: 'fall2024', label: 'Fall 2024' },
  ];

  // Filter classes by semester (mock filtering)
  const filteredClasses = semester === 'current' ? mockClasses : [];

  // Get background gradient based on class subject
  const getClassBackground = (classId: string) => {
    const backgrounds: Record<string, string> = {
      'class1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient for Math
      'class2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink gradient for English
      'class3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue gradient for Physics
      'class4': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green gradient for Chinese
      'class5': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Orange gradient for Chemistry
    };
    return backgrounds[classId] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>{t('classes.myClasses')}</h1>
          <p className={styles.pageSubtitle}>Select a class to view details and assignments</p>
        </div>
        <div className={styles.headerRight}>
          <Select
            options={semesters}
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            prefixIcon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="3" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 6h12M6 1v2M12 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>
      </div>

      {/* Classes Grid */}
      {filteredClasses.length > 0 ? (
        <div className={styles.classesGrid}>
          {filteredClasses.map((classItem) => {
            const translatedClass = getTranslatedClass(classItem.id, language);
            return (
              <Link 
                key={classItem.id} 
                href={`/class/${classItem.id}/overview`}
                className={styles.classCard}
              >
                <div className={styles.card}>
                  {/* Background Header with Gradient */}
                  <div 
                    className={styles.cardHeader}
                    style={{ background: getClassBackground(classItem.id) }}
                  >
                    {/* Decorative Pattern */}
                    <div className={styles.patternOverlay}>
                      <svg className={styles.pattern} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="30" fill="rgba(255,255,255,0.1)" />
                        <circle cx="160" cy="160" r="40" fill="rgba(255,255,255,0.05)" />
                        <circle cx="180" cy="50" r="20" fill="rgba(255,255,255,0.08)" />
                      </svg>
                    </div>
                    
                    {/* Class Name - Main Focus */}
                    <div className={styles.headerContent}>
                      <h3 className={styles.className}>{translatedClass.name}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    {/* Teacher Info */}
                    <div className={styles.teacherInfo}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span>{classItem.teacher}</span>
                    </div>

                    {/* Progress */}
                    <div className={styles.progressInfo}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M8 8L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M8 8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span>{translatedClass.progress}</span>
                    </div>

                    {/* Next Class */}
                    {classItem.nextClass && (
                      <div className={styles.nextClassInfo}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M2 5h10M5 1v2M9 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>Next: {classItem.nextClass}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="16" y="20" width="32" height="28" rx="2" stroke="var(--gray-300)" strokeWidth="2"/>
                <path d="M24 28h16M24 36h12" stroke="var(--gray-300)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No classes found</h3>
            <p className={styles.emptyDescription}>
              There are no classes in the selected semester. Try selecting a different semester.
            </p>
          </div>
        </Card>
      )}
    </MainLayout>
  );
};

export default ClassesPage;

