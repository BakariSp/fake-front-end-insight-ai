'use client';

import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import styles from './RightSidebar.module.css';

const RightSidebar: React.FC = () => {
  return (
    <aside className={styles.rightSidebar}>
      {/* AI Smart Assistant */}
      <div className={styles.section}>
        <div className={styles.header}>
          <h3 className={styles.title}>AI Smart Assistant</h3>
          <div className={styles.aiAvatar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" fill="white" fillOpacity="0.2"/>
              <circle cx="9" cy="10" r="1.5" fill="white"/>
              <circle cx="15" cy="10" r="1.5" fill="white"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <Card padding="medium" className={styles.completionCard}>
          <p className={styles.completionText}>
            All submissions for <span className={styles.completionHighlight}>Assignment 101</span> have been completed.
          </p>
          <div className={styles.gradingInfo}>
            <span className={styles.gradingLabel}>Intelligent grading:</span>
            <span className={styles.gradingValue}>100%</span>
          </div>
        </Card>
        
        <Card padding="medium" className={styles.accuracyCard}>
          <div className={styles.accuracyHeader}>
            <div className={styles.accuracyIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.accuracyContent}>
              <h4 className={styles.accuracyTitle}>Accuracy rate</h4>
              <div className={styles.accuracyValue}>80%</div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: '80%' }}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.insightsList}>
            <div className={styles.insightItem}>
              <div className={`${styles.insightDot} ${styles.error}`} />
              <p className={styles.insightText}>
                Most students made mistakes in Question (function graph), with an accuracy rate of <span className="highlight">35%</span>
              </p>
            </div>
            <div className={styles.insightItem}>
              <div className={`${styles.insightDot} ${styles.warning}`} />
              <p className={styles.insightText}>
                Question 7 is relatively difficult, and <span className="highlight">60%</span> of students failed to complete the answer
              </p>
            </div>
          </div>
          
          <div className={styles.viewDetailsButton}>
            <Button variant="ghost" size="small" fullWidth>
              View details
            </Button>
          </div>
        </Card>
      </div>
      
      {/* AI Chat Input */}
      <div className={styles.chatSection}>
        <div className={styles.chatInputWrapper}>
          <input 
            type="text"
            placeholder="Ask AI Assistant..."
            className={styles.chatInput}
          />
          <button className={styles.sendButton}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7 9M14 2L9 14L7 9M14 2L2 7L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
