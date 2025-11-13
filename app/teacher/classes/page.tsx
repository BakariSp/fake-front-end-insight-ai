'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './classes.module.css';

const ClassesPage: React.FC = () => {
  const router = useRouter();

  const mockClasses = [
    {
      id: 'class-001',
      name: 'Grade 10-A',
      subject: 'Mathematics',
      students: 28,
      pendingAssignments: 2,
      color: '#4F7FFF',
    },
    {
      id: 'class-002',
      name: 'Grade 11-B',
      subject: 'Mathematics',
      students: 32,
      pendingAssignments: 1,
      color: '#52C41A',
    },
    {
      id: 'class-003',
      name: 'Grade 9-C',
      subject: 'Mathematics',
      students: 25,
      pendingAssignments: 0,
      color: '#FF9800',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Classes</h1>
        <p className={styles.subtitle}>
          Manage your classes, assignments, and student progress
        </p>
      </div>

      <div className={styles.classList}>
        {mockClasses.map((classItem) => (
          <div key={classItem.id} className={styles.classCard}>
            <div 
              className={styles.classHeader}
              style={{ background: `${classItem.color}15` }}
            >
              <h3 className={styles.className} style={{ color: classItem.color }}>
                {classItem.name}
              </h3>
              <span className={styles.classSubject}>{classItem.subject}</span>
            </div>
            <div className={styles.classBody}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Students</span>
                <span className={styles.statValue}>{classItem.students}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Pending Assignments</span>
                <span 
                  className={styles.statValue}
                  style={{ color: classItem.pendingAssignments > 0 ? '#FF4D4F' : '#52C41A' }}
                >
                  {classItem.pendingAssignments}
                </span>
              </div>
            </div>
            <div className={styles.classActions}>
              <button 
                className={styles.viewButton}
                onClick={() => router.push(`/teacher/class/${classItem.id}/overview`)}
              >
                View Class
              </button>
              <button 
                className={styles.assignmentButton}
                onClick={() => router.push(`/teacher/class/${classItem.id}/assignments`)}
              >
                Assignments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;

