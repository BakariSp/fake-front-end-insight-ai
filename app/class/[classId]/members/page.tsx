'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import { Card, Button, SearchBar, Avatar, Badge } from '../../../components/ui';
import { mockClassMembers } from '../../../data/mockData';
import styles from './members.module.css';

const ClassMembersPage = () => {
  const params = useParams();
  const classId = params.classId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(classId);

  const members = mockClassMembers[selectedClass] || [];
  
  // Filter members based on search
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teachers = filteredMembers.filter(m => m.role === 'teacher');
  const students = filteredMembers.filter(m => m.role === 'student');

  return (
    <MainLayout>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.headerTitle}>Class Members</h1>
            <p className={styles.headerDescription}>Connect with your teachers and classmates</p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <Card className={styles.filterCard}>
        <div className={styles.filterContent}>
          <div className={styles.searchWrapper}>
            <SearchBar
              placeholder="Search members by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              fullWidth
            />
          </div>
          <div className={styles.classFilters}>
            {['801', '802', '803'].map((classId) => (
              <Button
                key={classId}
                variant={selectedClass === classId ? 'primary' : 'ghost'}
                size="medium"
                onClick={() => setSelectedClass(classId)}
              >
                Class {classId}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Summary */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.primary}`}>
            {filteredMembers.length}
          </div>
          <div className={styles.statLabel}>Total Members</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.blue}`}>
            {teachers.length}
          </div>
          <div className={styles.statLabel}>Instructors</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.green}`}>
            {students.length}
          </div>
          <div className={styles.statLabel}>Students</div>
        </div>
      </div>

      {/* Teachers Section */}
      {teachers.length > 0 && (
        <Card className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className={styles.sectionTitle}>
              Instructors ({teachers.length})
            </h2>
          </div>
          <div className={styles.teachersGrid}>
            {teachers.map((teacher) => (
              <div key={teacher.id} className={styles.teacherCard}>
                <Avatar name={teacher.name} size="large" />
                <div className={styles.teacherInfo}>
                  <div className={styles.teacherName}>
                    <h3 className={styles.teacherNameText}>{teacher.name}</h3>
                    <Badge variant="info">Teacher</Badge>
                  </div>
                  {teacher.email && (
                    <p className={styles.teacherEmail}>{teacher.email}</p>
                  )}
                </div>
                <div className={styles.teacherActions}>
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => window.location.href = `/communication?to=${teacher.id}`}
                  >
                    Message
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="small"
                    onClick={() => alert('View profile feature coming soon!')}
                  >
                    Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Students Section */}
      {students.length > 0 && (
        <Card className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className={styles.sectionTitle}>
              Classmates ({students.length})
            </h2>
          </div>
          <div className={styles.studentsGrid}>
            {students.map((student) => (
              <div key={student.id} className={styles.studentCard}>
                <Avatar name={student.name} size="large" className={styles.studentAvatar} />
                <h3 className={styles.studentName}>{student.name}</h3>
                <Badge className={styles.studentBadge}>Student</Badge>
                <Button 
                  variant="ghost" 
                  size="small" 
                  fullWidth
                  className={styles.studentAction}
                  onClick={() => window.location.href = `/communication?to=${student.id}`}
                >
                  Message
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <Card>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 48c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No members found</h3>
            <p className={styles.emptyDescription}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        </Card>
      )}
    </MainLayout>
  );
};

export default ClassMembersPage;

