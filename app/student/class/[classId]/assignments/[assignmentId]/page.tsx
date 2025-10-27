'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@layout/MainLayout';
import { Card, Button, Badge, Progress } from '@ui';
import { mockAssignments, mockClasses } from '@data/mockData';
import styles from './assignmentDetail.module.css';

const AssignmentDetailPage = () => {
  const params = useParams();
  const assignmentId = params.assignmentId as string;
  const classId = params.classId as string;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Find the assignment and class
  const assignment = mockAssignments.find(a => a.id === assignmentId);
  const classData = mockClasses.find(c => c.id === classId);
  
  if (!assignment) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Assignment not found</h1>
        </div>
      </MainLayout>
    );
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    alert('Assignment submitted successfully! (This is a mock action)');
    setSelectedFiles([]);
  };

  const handleWithdraw = () => {
    if (confirm('Are you sure you want to withdraw your submission?')) {
      alert('Submission withdrawn successfully! (This is a mock action)');
    }
  };

  // Calculate days until due
  const getDaysUntilDue = () => {
    const today = new Date('2025-10-20');
    const due = new Date(assignment.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDue();
  const isUrgent = daysLeft <= 2 && assignment.status === 'unsent';

  // Render based on status
  const renderContent = () => {
    switch (assignment.status) {
      case 'unsent':
        return <UnsentView assignment={assignment} selectedFiles={selectedFiles} onFileSelect={handleFileSelect} onRemoveFile={handleRemoveFile} onSubmit={handleSubmit} isUrgent={isUrgent} daysLeft={daysLeft} />;
      case 'sent':
        return <SentView assignment={assignment} onWithdraw={handleWithdraw} />;
      case 'graded':
        return <GradedView assignment={assignment} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {/* Enhanced Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerTop}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>{assignment.title}</h1>
              <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.metadataIcon}>
                    <path d="M2 5h12M2 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{classData?.name || 'Class'}</span>
                </div>
                <span className={styles.metadataDivider}>•</span>
                <div className={styles.metadataItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.metadataIcon}>
                    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 5h4M6 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{assignment.subject}</span>
                </div>
                <span className={styles.metadataDivider}>•</span>
                <div className={styles.metadataItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.metadataIcon}>
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 4v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Due: {assignment.dueDate}</span>
                  {assignment.status === 'unsent' && daysLeft >= 0 && (
                    <span className={isUrgent ? styles.urgentLabel : styles.normalLabel}>
                      ({daysLeft === 0 ? 'Today!' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days left`})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statusBadge}>
            {assignment.status === 'unsent' && (
              <Badge variant="warning" size="large">Not Submitted</Badge>
            )}
            {assignment.status === 'sent' && (
              <Badge variant="info" size="large">Awaiting Grade</Badge>
            )}
            {assignment.status === 'graded' && (
              <Badge variant="success" size="large">Graded</Badge>
            )}
          </div>
        </div>
        
        {/* Status Bar */}
        {isUrgent && assignment.status === 'unsent' && (
          <div className={styles.urgentBanner}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>⚠️ This assignment is due soon! Please submit before the deadline.</span>
          </div>
        )}
      </div>

      {renderContent()}
    </MainLayout>
  );
};

// Component for unsent assignments (C11a)
const UnsentView = ({ assignment, selectedFiles, onFileSelect, onRemoveFile, onSubmit, isUrgent, daysLeft }: any) => {
  return (
    <div className={styles.contentGrid}>
      <div className={styles.mainContent}>
        {/* Instructions Card */}
        <Card className={styles.instructionsCard}>
          <div className={styles.cardHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.cardIcon}>
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className={styles.cardTitle}>Assignment Instructions</h2>
          </div>
          <div className={styles.instructions}>
            <p className={styles.instructionText}>Complete the following exercises from Chapter 1:</p>
            <ul className={styles.instructionList}>
              <li>Review function definitions and properties</li>
              <li>Solve problems 1-15 from the textbook</li>
              <li>Show all work and explain your reasoning</li>
            </ul>
          </div>
        </Card>

        {/* File Upload Card */}
        <Card className={styles.uploadCard}>
          <div className={styles.cardHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.cardIcon}>
              <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 3v4a2 2 0 002 2h4" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className={styles.cardTitle}>Submit Your Work</h2>
          </div>
          
          {/* File Upload Area */}
          <div className={styles.uploadZone}>
            <input
              type="file"
              id="file-upload"
              className={styles.fileInput}
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={onFileSelect}
            />
            <label htmlFor="file-upload" className={styles.uploadLabel}>
              <div className={styles.uploadIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className={styles.uploadTitle}>
                Click to upload or drag and drop
              </p>
              <p className={styles.uploadSubtitle}>
                PDF, JPG, PNG, DOC (max 10MB per file)
              </p>
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className={styles.filesSection}>
              <h3 className={styles.filesTitle}>Selected Files ({selectedFiles.length})</h3>
              <div className={styles.filesList}>
                {selectedFiles.map((file: File, index: number) => (
                  <div key={index} className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileIconWrapper}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M6 2v4M6 14v4" stroke="var(--primary-blue)" strokeWidth="1.5" strokeLinecap="round"/>
                          <rect x="4" y="2" width="12" height="16" rx="1" stroke="var(--primary-blue)" strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <div className={styles.fileDetails}>
                        <div className={styles.fileName}>{file.name}</div>
                        <div className={styles.fileSize}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveFile(index)}
                      className={styles.removeButton}
                      title="Remove file"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.submitSection}>
            <Button 
              variant="primary" 
              fullWidth 
              size="large"
              onClick={onSubmit}
              disabled={selectedFiles.length === 0}
            >
              {selectedFiles.length > 0 ? `Submit ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}` : 'Submit Assignment'}
            </Button>
            <p className={styles.submitNote}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 4v3M7 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Once submitted, you cannot edit your submission
            </p>
          </div>
        </Card>
      </div>

      {/* Sidebar Info */}
      <div className={styles.sidebarContent}>
        <Card className={styles.deadlineCard}>
          <div className={styles.deadlineHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke={isUrgent ? 'var(--error-red)' : 'var(--primary-blue)'} strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke={isUrgent ? 'var(--error-red)' : 'var(--primary-blue)'} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3 className={styles.deadlineTitle}>Deadline</h3>
          </div>
          <div className={styles.deadlineContent}>
            <p className={styles.deadlineDate}>{assignment.dueDate}</p>
            <p className={styles.deadlineTime}>23:59 PM</p>
            {daysLeft >= 0 && (
              <div className={isUrgent ? styles.timeLeftUrgent : styles.timeLeftNormal}>
                {daysLeft === 0 ? '⏰ Due Today!' : daysLeft === 1 ? '📅 Due Tomorrow' : `📆 ${daysLeft} days remaining`}
              </div>
            )}
          </div>
        </Card>

        <Card className={styles.tipsCard}>
          <div className={styles.tipsHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15v-3m0-3h.01M5.07 19.27A10 10 0 1119.27 5.07 10 10 0 015.07 19.27z" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className={styles.tipsTitle}>Submission Tips</h3>
          </div>
          <ul className={styles.tipsList}>
            <li>✓ Check all requirements before submitting</li>
            <li>✓ Include your name and class information</li>
            <li>✓ Ensure files are readable and well-organized</li>
            <li>✓ Double-check file formats are accepted</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

// Component for sent assignments (C11b)
const SentView = ({ assignment, onWithdraw }: any) => {
  return (
    <>
      <Card className="mb-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[var(--primary-blue-light)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10 16l4 4 8-8" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">Assignment Submitted!</h2>
          <p className="text-[var(--gray-700)] mb-1">
            Submitted on: {assignment.submitTime}
          </p>
          <p className="text-sm text-[var(--gray-500)]">
            Your teacher will review and grade your work soon.
          </p>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">Submitted Files</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 2v4M6 14v4" stroke="#DC2626" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--gray-900)]">assignment_solution.pdf</div>
                <div className="text-xs text-[var(--gray-500)]">2.4 MB</div>
              </div>
            </div>
            <Button variant="ghost" size="small">
              Preview
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-lg">
          <div>
            <p className="text-sm font-medium text-[var(--gray-900)] mb-1">
              Need to make changes?
            </p>
            <p className="text-xs text-[var(--gray-500)]">
              You can withdraw your submission before the due date
            </p>
          </div>
          <Button variant="secondary" onClick={onWithdraw}>
            Withdraw
          </Button>
        </div>
      </Card>
    </>
  );
};

// Component for graded assignments (C11c)
const GradedView = ({ assignment }: any) => {
  return (
    <>
      {/* Score Card */}
      <Card className="mb-6">
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-3xl font-bold mb-4">
            {assignment.aiScore}
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">Excellent Work!</h2>
          <p className="text-[var(--gray-700)]">
            You scored {assignment.aiScore} out of 100
          </p>
          <div className="mt-4">
            <Progress percent={assignment.aiScore} showText={false} size="large" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* AI Feedback */}
        <Card>
          <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">AI Analysis</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--gray-700)]">Accuracy</span>
                <span className="text-sm font-semibold text-[var(--success-green)]">92%</span>
              </div>
              <Progress percent={92} showText={false} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--gray-700)]">Completeness</span>
                <span className="text-sm font-semibold text-[var(--primary-blue)]">95%</span>
              </div>
              <Progress percent={95} showText={false} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--gray-700)]">Clarity</span>
                <span className="text-sm font-semibold text-[var(--success-green)]">88%</span>
              </div>
              <Progress percent={88} showText={false} />
            </div>
          </div>
        </Card>

        {/* Teacher Feedback */}
        <Card>
          <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">Teacher Feedback</h2>
          <div className="p-4 bg-[var(--gray-50)] rounded-lg">
            <p className="text-[var(--gray-700)] leading-relaxed">
              {assignment.teacherFeedback}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white text-sm font-bold">
              JC
            </div>
            <div>
              <div className="text-sm font-medium text-[var(--gray-900)]">Jone Copper</div>
              <div className="text-xs text-[var(--gray-500)]">Math Teacher</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Submitted Work */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">Your Submission</h2>
        <div className="border border-[var(--gray-300)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 2v4M6 14v4" stroke="#DC2626" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--gray-900)]">assignment_solution.pdf</div>
                <div className="text-xs text-[var(--gray-500)]">Submitted: {assignment.submitTime}</div>
              </div>
            </div>
            <Button variant="ghost" size="small">
              View
            </Button>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          variant="primary"
          size="large"
          onClick={() => window.location.href = '/student/insight-tools/ai-tutor'}
        >
          📚 View AI Explanation
        </Button>
        <Button 
          variant="secondary"
          size="large"
          onClick={() => window.location.href = '/student/insight-tools/mistake-analysis'}
        >
          🔄 Practice Similar Problems
        </Button>
      </div>
    </>
  );
};

export default AssignmentDetailPage;

